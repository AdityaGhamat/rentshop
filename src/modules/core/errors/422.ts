import { HttpError } from "./http-error";

export class UnprocessableEntityError extends HttpError {
  constructor(message = "Unprocessable Entity", details?: any) {
    super(422, message, { code: "UNPROCESSABLE_ENTITY", details });
    this.name = "UnprocessableEntityError";
  }
}