import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "@core/utility/logger";
import { HttpError } from "@core/errors";
import { env } from "@core/utility/env";

export function errorHandler() {
  return (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    const reqId = (req as any).id || undefined;

    if (err instanceof ZodError) {
      logger.warn("Validation failed", { reqId, zod: err });
      return res.status(400).json({
        data: null,
        error: { message: "Validation failed", details: err },
        meta: { requestId: reqId },
      });
    }

    if (err instanceof HttpError) {
      logger.warn(err.message, {
        reqId,
        status: err.status,
        code: err.code,
        details: err.details,
      });
      const payload =
        env.NODE_ENV === "production"
          ? { message: err.message, code: err.code }
          : {
              message: err.message,
              code: err.code,
              details: err.details,
              stack: err.stack,
            };

      return res
        .status(err.status)
        .json({ data: null, error: payload, meta: { requestId: reqId } });
    }

    const safeMessage =
      env.NODE_ENV === "production"
        ? "Internal server error"
        : (err as any)?.message ?? "Unknown error";
    logger.error("Unhandled error", { reqId, err });
    return res.status(500).json({
      data: null,
      error:
        env.NODE_ENV === "production"
          ? { message: safeMessage }
          : { message: safeMessage, stack: (err as any)?.stack },
      meta: { requestId: reqId },
    });
  };
}
