import http from "http";
import { logger } from "@core/utility/logger";
import { env } from "@core/utility/env";

export default function setupGlobalHandlers(server?: http.Server) {
  process.on("unhandledRejection", (reason) => {
    logger.fatal("Unhandled Rejection — exiting", { reason });
    setTimeout(() => process.exit(1), 100);
  });

  process.on("uncaughtException", (err) => {
    logger.fatal("Uncaught Exception — exiting", { err });
    setTimeout(() => process.exit(1), 100);
  });

  const shutdown = (signal: string) => async () => {
    logger.info("Received shutdown signal — closing gracefully", { signal });
    try {
      if (server) {
        await new Promise<void>((resolve, reject) => {
          server.close((err) => (err ? reject(err) : resolve()));
        });
      }
      logger.info("Shutdown complete");
      process.exit(0);
    } catch (err) {
      logger.fatal("Graceful shutdown failed", { err });
      process.exit(1);
    }
  };

  process.on("SIGTERM", shutdown("SIGTERM"));
  process.on("SIGINT", shutdown("SIGINT"));
}
