import dotenv from "dotenv";
import fs from "fs";
import path from "path";

type LoadResult = {
  env: string;
  loadedFiles: string[];
  injectedCount: number;
};

export function loadEnv(): LoadResult {
  const env = process.env.NODE_ENV || "development";
  const projectRoot = process.cwd();

  const envFile = path.resolve(projectRoot, `.env.${env}`);
  const baseEnvFile = path.resolve(projectRoot, ".env");

  const loadedFiles: string[] = [];
  let injectedCount = 0;

  function tryLoad(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    const result = dotenv.config({ path: filePath });
    if (result.error) {
      console.warn(`[loadEnv] Error loading ${filePath}:`, result.error);
      return;
    }

    if (result.parsed) {
      const keys = Object.keys(result.parsed);
      injectedCount += keys.length;
      loadedFiles.push(filePath);
    }
  }

  tryLoad(envFile);

  tryLoad(baseEnvFile);

  if (loadedFiles.length > 0) {
    console.info(
      `[loadEnv] NODE_ENV=${env} — loaded ${
        loadedFiles.length
      } file(s): ${loadedFiles.join(
        ", "
      )} — injected ${injectedCount} variable(s)`
    );
  } else {
    console.warn(
      `[loadEnv] NODE_ENV=${env} — no .env files found. Relying on process.env (injected 0 variables)`
    );
  }

  return { env, loadedFiles, injectedCount };
}
