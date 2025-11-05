import { HttpError } from "./http-error";

export class LoopDetectedError extends HttpError {
  constructor(message = "Loop Detected", details?: any) {
    super(508, message, { code: "LOOP_DETECTED", details });
    this.name = "LoopDetectedError";
  }
}