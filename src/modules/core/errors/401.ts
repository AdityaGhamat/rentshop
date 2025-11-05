import { HttpError } from "./http-error";

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", details?: any) {
    super(401, message, { code: "UNAUTHORIZED", details });
    this.name = "UnauthorizedError";
  }
}
