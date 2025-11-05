import { HttpError } from "./http-error";
export class LockedError extends HttpError {
  constructor(message = "Locked", details?: any) {
    super(423, message, { code: "LOCKED", details });
    this.name = "LockedError";
  }
}