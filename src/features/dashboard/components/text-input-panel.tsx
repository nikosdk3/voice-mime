"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { TEXT_MAX_LENGTH } from "@/features/text-to-speech/data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="via-[#941b0c] rounded-[22px] bg-linear-185 from-[#f6aa1c] from-15% via-39% to-[#dc2f02] to-85% p-0.5 shadow-[0_0_0_4px_white]">
      <div className="rounded-[20px] bg-[#f9f9f9] p-1">
        <div className="space-y-4 rounded-xl bg-white p-4 drop-shadow-xs">
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="min-h-35 resize-none rounded-sm border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />
        </div>
      </div>
    </div>
  );
}
