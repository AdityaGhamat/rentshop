import type { RequestHandler, Request, Response, NextFunction } from "express";

type AsyncHandlerFn<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T | void> | T | void;

export const asyncHandler = <T = any>(fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((result) => {
        if (res.headersSent) return;

        if (result != undefined) {
          return res.json(result);
        }
        return;
      })

      .catch(next);
  };
};
