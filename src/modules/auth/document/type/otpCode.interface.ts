import { Document } from "mongoose";

export type OtpPurpose = "REGISTER" | "VERIFY_PHONE" | "RESET_PASSWORD";
export interface IOtpCode extends Document {
  phone: string;
  purpose: OtpPurpose;
  user: any;
  codeHash: string;
  expiresAt: Date;
  attempts: number;
  consumed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
