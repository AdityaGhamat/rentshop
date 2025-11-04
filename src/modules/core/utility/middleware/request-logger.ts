import type { Request, Response, NextFunction } from "express";
import { logger } from "@core/utility/logger";

export function requestLogger() {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info(`${method} ${originalUrl} ${res.statusCode}`, {
        reqId: req.id,
        method,
        path: originalUrl,
        status: res.statusCode,
        durationMs: duration,
        user: req.ctx?.user?.id,
      });
    });

    next();
  };
}
