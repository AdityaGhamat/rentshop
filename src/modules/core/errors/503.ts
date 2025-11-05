import { HttpError } from "./http-error";
export class ServiceUnavailableError extends HttpError {
  constructor(message = "Service Unavailable", details?: any) {
    super(503, message, { code: "SERVICE_UNAVAILABLE", details });
    this.name = "ServiceUnavailableError";
  }
}
