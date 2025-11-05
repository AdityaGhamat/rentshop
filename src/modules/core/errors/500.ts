import { HttpError } from "./http-error";

export class DatabaseError extends HttpError {
  constructor(message = "Database Error", details?: any) {
    super(500, message, { code: "DATABASE_ERROR", details });
    this.name = "DatabaseError";
  }
}
