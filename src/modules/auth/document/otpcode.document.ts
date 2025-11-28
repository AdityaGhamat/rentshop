import mongoose, { Schema } from "mongoose";
import { IOtpCode } from "./type";

const otpCodeSchema = new Schema<IOtpCode>(
  {
    phone: {
      type: String,
      required: true,
      index: true,
    },
    purpose: {
      type: String,
      enum: ["REGISTER", "VERIFY_PHONE", "RESET_PASSWORD"],
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    codeHash: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    consumed: {
      type: Boolean,
      defeault: false,
    },
  },
  {
    timestamps: true,
  }
);

export const OtpCode = mongoose.model<IOtpCode>("OtpCode", otpCodeSchema);
