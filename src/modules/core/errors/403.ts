import { HttpError } from "./http-error";

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", details?: any) {
    super(403, message, { code: "FORBIDDEN", details });
    this.name = "ForbiddenError";
  }
}
