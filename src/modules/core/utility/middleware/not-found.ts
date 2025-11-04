import type { Request, Response } from "express";

export function notFoundHandler() {
  return (_req: Request, res: Response) =>
    res
      .status(404)
      .json({ data: null, error: { message: "Route Not Found" }, meta: {} });
}
