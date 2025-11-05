import { HttpError } from "./http-error";
export class PreconditionFailedError extends HttpError {
  constructor(message = "Precondition Failed", details?: any) {
    super(412, message, { code: "PRECONDITION_FAILED", details });
    this.name = "PreconditionFailedError";
  }
}