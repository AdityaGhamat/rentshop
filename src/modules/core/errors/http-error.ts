export class HttpError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(
    status = 500,
    message = "Internal Server Error",
    opts?: { code?: string; details?: any }
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = opts?.code;
    this.details = opts?.details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
