import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const skip = !!process.env.SKIP_ENV_VALIDATION;

export const env = skip
  ? (process.env as unknown as z.infer<typeof envSchema>)
  : envSchema.parse(process.env);
