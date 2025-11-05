import { HttpError } from "./http-error";

export class NetworkAuthenticationError extends HttpError {
  constructor(message = "Network Authentication Required", details?: any) {
    super(511, message, { code: "NETWORK_AUTHENTICATION_REQUIRED", details });
    this.name = "NetworkAuthenticationError";
  }
}