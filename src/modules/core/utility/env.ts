import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().optional(),
  LOG_LEVEL: z.string().default("debug"),
  JWT_SECRET: z.string().min(3).max(10),
  JWT_ACCESS_TOKEN_TTL: z.coerce.number().int(),
  JWT_REFRESH_TOKEN_TTL: z.coerce.number().int(),
  JWT_TOKEN_AUDIENCE: z.string().default("localhost:3000"),
  JWT_TOKEN_ISSUER: z.string().default("localhost:3000"),
});
export const env = envSchema.parse(process.env);
