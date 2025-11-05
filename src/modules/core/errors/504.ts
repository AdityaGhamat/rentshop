import { HttpError } from "./http-error";

export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout", details?: any) {
    super(504, message, { code: "GATEWAY_TIMEOUT", details });
    this.name = "GatewayTimeoutError";
  }
}
