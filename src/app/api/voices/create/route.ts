import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parseBuffer } from "music-metadata";

import { env } from "@/lib/env";
import { polar } from "@/lib/polar";
import { prisma } from "@/lib/db";
import { uploadAudio } from "@/lib/r2";

import { VOICE_CATEGORIES } from "@/features/voices/data/voice-categories";
import type { VoiceCategory } from "@/generated/prisma/enums";

const createVoiceSchema = z.object({
  name: z.string().min(1, "Voice name is required"),
  category: z.enum(VOICE_CATEGORIES as [VoiceCategory, ...VoiceCategory[]]),
  language: z.string().min(1, "Language is required"),
  description: z.string().nullish(),
});

const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const MIN_AUDIO_DURATION_SECONDS = 10;

export async function POST(request: NextRequest) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for active subscription before voice creation
  try {
    const customerState = await polar.customers.getStateExternal({
      externalId: orgId,
    });
    const hasActiveSubscription =
      (customerState.activeSubscriptions ?? []).length > 0;
    if (!hasActiveSubscription) {
      return NextResponse.json(
        {
          error: "SUBSCRIPTION_REQUIRED",
        },
        { status: 403 },
      );
    }
  } catch {
    // Customer doesn't exist in Polar yet -> no subscription
    return NextResponse.json(
      {
        error: "SUBSCRIPTION_REQUIRED",
      },
      { status: 403 },
    );
  }

  const url = new URL(request.url);

  const validation = createVoiceSchema.safeParse({
    name: url.searchParams.get("name"),
    category: url.searchParams.get("category"),
    language: url.searchParams.get("language"),
    description: url.searchParams.get("description"),
  });

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: validation.error.issues,
      },
      { status: 400 },
    );
  }

  const { name, category, language, description } = validation.data;

  const fileBuffer = await request.arrayBuffer();

  if (!fileBuffer.byteLength) {
    return NextResponse.json(
      {
        error: "Please upload an audio file",
      },
      { status: 400 },
    );
  }

  if (fileBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json(
      {
        error: "Audio file exceeds the 20MB size limit",
      },
      {
        status: 413,
      },
    );
  }

  const contentType = request.headers.get("content-type");

  if (!contentType) {
    return NextResponse.json(
      {
        error: "Missing Content-Type header",
      },
      {
        status: 400,
      },
    );
  }

  const normalizedContentType =
    contentType.split(";")[0]?.trim() || "audio/wav";

  // Validate audio format and duration
  let duration: number;
  try {
    const metadata = await parseBuffer(
      new Uint8Array(fileBuffer),
      {
        mimeType: normalizedContentType,
      },
      { duration: true },
    );
    duration = metadata.format.duration ?? 0;
  } catch {
    return NextResponse.json(
      {
        error: "File is not a valid audio file",
      },
      { status: 422 },
    );
  }

  if (duration < MIN_AUDIO_DURATION_SECONDS) {
    return NextResponse.json(
      {
        error: `Audio too short (${duration.toFixed(1)}s). Minimum duration is ${MIN_AUDIO_DURATION_SECONDS} seconds.`,
      },
      {
        status: 422,
      },
    );
  }

  let createdVoiceId: string | null = null;

  try {
    const voice = await prisma.voice.create({
      data: {
        name,
        variant: "CUSTOM",
        orgId,
        description,
        category,
        language,
      },
      select: {
        id: true,
      },
    });

    createdVoiceId = voice.id;
    const r2ObjectKey = `voices/orgs/${orgId}/${voice.id}`;

    await uploadAudio({
      buffer: Buffer.from(fileBuffer),
      key: r2ObjectKey,
      contentType: normalizedContentType,
    });
  } catch {
    if (createdVoiceId) {
      await prisma.voice
        .delete({
          where: {
            id: createdVoiceId,
          },
        })
        .catch(() => {});
    }

    return NextResponse.json(
      { error: "Failed to create voice. Please retry." },
      { status: 500 },
    );
  }

  polar.events
    .ingest({
      events: [
        {
          name: env.POLAR_METER_VOICE_CREATION,
          externalCustomerId: orgId,
          metadata: {},
          timestamp: new Date(),
        },
      ],
    })
    .catch(() => {
      // Silently fail, don't break the user experience for metering errors
    });

  return NextResponse.json(
    { name, message: "Voice created successfully" },
    { status: 201 },
  );
}
