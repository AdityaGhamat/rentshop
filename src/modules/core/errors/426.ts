import { HttpError } from "./http-error";

export class UpgradeRequiredError extends HttpError {
  constructor(message = "Upgrade Required", details?: any) {
    super(426, message, { code: "UPGRADE_REQUIRED", details });
    this.name = "UpgradeRequiredError";
  }
}
