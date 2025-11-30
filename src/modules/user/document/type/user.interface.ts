import { Document } from "mongoose";
import { IAddress } from "@user";
export interface IUser extends Document {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  googleId?: string;
  role: "user" | "admin";
  addresses: IAddress[];
  userAgent: string;
  defaultAddress?: any;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  loginAttempts: number;
  lockUntil?: Date;
  refreshToken?: string;
  refreshTokenExpires?: Date;
  lastLogin?: Date;
  deletedAt?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isLocked: boolean;
  comparePassword(plain: string): Promise<boolean>;
}
