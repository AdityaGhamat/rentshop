import { HttpError } from "./http-error";

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests", details?: any) {
    super(429, message, { code: "TOO_MANY_REQUESTS", details });
    this.name = "TooManyRequestsError";
  }
}