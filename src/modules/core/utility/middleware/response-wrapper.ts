import type { Request, Response, NextFunction } from "express";

export function responseWrapper() {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = (body?: any) => {
      if (
        body &&
        typeof body === "object" &&
        ("data" in body || "error" in body)
      ) {
        return originalJson(body);
      }

      const envelope = {
        data: body ?? null,
        error: null,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      };
      return originalJson(envelope);
    };

    next();
  };
}
