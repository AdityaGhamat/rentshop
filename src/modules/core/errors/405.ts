import { HttpError } from "./http-error";

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed", details?: any) {
    super(405, message, { code: "METHOD_NOT_ALLOWED", details });
    this.name = "MethodNotAllowedError";
  }
}
