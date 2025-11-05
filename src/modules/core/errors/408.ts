import { HttpError } from "./http-error";
export class RequestTimeoutError extends HttpError {
  constructor(message = "Request Timeout", details?: any) {
    super(408, message, { code: "REQUEST_TIMEOUT", details });
    this.name = "RequestTimeoutError";
  }
}
