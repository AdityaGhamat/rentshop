import { HttpError } from "./http-error";
export class ConflictError extends HttpError {
  constructor(message = "Conflict", details?: any) {
    super(409, message, { code: "CONFLICT", details });
    this.name = "ConflictError";
  }
}
