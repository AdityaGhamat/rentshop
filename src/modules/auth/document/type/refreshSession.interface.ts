import { Document } from "mongoose";

export interface IRefreshSession extends Document {
  jti: string;
  user: any; //user id , mostly _id for creating relations
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
  userAgent?: String;
  ip?: string;
}
