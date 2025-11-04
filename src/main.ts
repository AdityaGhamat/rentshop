import "./register-module-alias";
import server from "./app";
import { loadEnv } from "./load_env";
import { env } from "@core/utility";
import { logger } from "@core/utility";
import setupGlobalHandlers from "@core/utility/setup-global-handlers";

async function Start() {
  try {
    loadEnv();
    const appServer = await server.start(env.PORT);
    logger.info("✅ Server has been initiated", {
      env: env.NODE_ENV,
      logLevel: env.LOG_LEVEL,
      port: env.PORT,
    });
    setupGlobalHandlers(appServer);
  } catch (error) {
    logger.error("❎ Failed to initiate server", {
      env: env.NODE_ENV,
      logLevel: env.LOG_LEVEL,
      port: env.PORT,
      error: error,
    });
  }
}

Start();
