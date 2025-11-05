import { HttpError } from "./http-error";
export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway", details?: any) {
    super(502, message, { code: "BAD_GATEWAY", details });
    this.name = "BadGatewayError";
  }
}