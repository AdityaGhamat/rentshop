import { v4 as uuidv4 } from "uuid";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      startTime?: number;
      ctx?: Record<string, any>;
    }
  }
}

export function requestContext() {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.id = (req.headers["x-request-id"] as string) || uuidv4();
    req.startTime = Date.now();
    req.ctx = {};
    _res.setHeader("X-Request-Id", req.id);
    next();
  };
}
