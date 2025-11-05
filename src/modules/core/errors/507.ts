import { HttpError } from "./http-error";

export class InsufficientStorageError extends HttpError {
  constructor(message = "Insufficient Storage", details?: any) {
    super(507, message, { code: "INSUFFICIENT_STORAGE", details });
    this.name = "InsufficientStorageError";
  }
}