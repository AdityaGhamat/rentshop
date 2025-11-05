import { HttpError } from "./http-error";

export class PaymentRequiredError extends HttpError {
  constructor(message = "Payment Required", details?: any) {
    super(402, message, { code: "PAYMENT_REQUIRED", details });
    this.name = "PaymentRequiredError";
  }
}
