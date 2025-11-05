import { HttpError } from "./http-error";
export class NotAcceptableError extends HttpError {
  constructor(message = "Not Acceptable", details?: any) {
    super(406, message, { code: "NOT_ACCEPTABLE", details });
    this.name = "NotAcceptableError";
  }
}
