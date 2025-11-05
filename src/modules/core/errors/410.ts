import { HttpError } from "./http-error";
export class GoneError extends HttpError {
  constructor(message = "Gone", details?: any) {
    super(410, message, { code: "GONE", details });
    this.name = "GoneError";
  }
}
