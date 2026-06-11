import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_URL: z.string().min(1),
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),
});

const skip = !!process.env.SKIP_ENV_VALIDATION;

export const env = skip
  ? (process.env as unknown as z.infer<typeof envSchema>)
  : envSchema.parse(process.env);
