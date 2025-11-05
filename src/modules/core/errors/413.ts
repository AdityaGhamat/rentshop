import { HttpError } from "./http-error";
export class PayloadTooLargeError extends HttpError {
  constructor(message = "Payload Too Large", details?: any) {
    super(413, message, { code: "PAYLOAD_TOO_LARGE", details });
    this.name = "PayloadTooLargeError";
  }
}
