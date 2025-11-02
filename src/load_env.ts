import dotenv from "dotenv";
import fs from "fs";
import path from "path";

export function loadEnv() {
  const env = process.env.NODE_ENV || "development";
  console.log(env);
  if (env !== "production") {
    const envFile = path.resolve(process.cwd(), `.env.${env}`);
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile });
    }
    const baseEnv = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(baseEnv)) {
      dotenv.config({ path: baseEnv });
    }
  }
}
