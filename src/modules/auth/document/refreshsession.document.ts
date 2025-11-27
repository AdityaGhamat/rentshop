import { IRefreshSession } from "./type";
import mongoose, { Schema } from "mongoose";

const refreshSessionSchema = new Schema<IRefreshSession>({
  jti: { type: String, unique: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  expiresAt: Date,
  revoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userAgent: String,
  ip: String,
});

export const RefreshSession = mongoose.model<IRefreshSession>(
  "RefreshSession",
  refreshSessionSchema
);
