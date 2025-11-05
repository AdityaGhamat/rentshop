import { HttpError } from "./http-error";

export class NotFoundError extends HttpError {
  constructor(resource = "Resource", details?: any) {
    super(404, `${resource} not found`, { code: "NOT_FOUND", details });
    this.name = "NotFoundError";
  }
}
