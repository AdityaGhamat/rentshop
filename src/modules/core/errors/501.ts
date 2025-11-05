import { HttpError } from "./http-error";

export class NotImplementedError extends HttpError {
  constructor(message = "Not Implemented", details?: any) {
    super(501, message, { code: "NOT_IMPLEMENTED", details });
    this.name = "NotImplementedError";
  }
}
