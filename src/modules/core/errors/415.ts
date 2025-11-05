import { HttpError } from "./http-error";

export class UnsupportedMediaTypeError extends HttpError {
  constructor(message = "Unsupported Media Type", details?: any) {
    super(415, message, { code: "UNSUPPORTED_MEDIA_TYPE", details });
    this.name = "UnsupportedMediaTypeError";
  }
}