import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details?: any) {
    super(400, message, { code: "BAD_REQUEST", details });
    this.name = "BadRequestError";
  }
}
