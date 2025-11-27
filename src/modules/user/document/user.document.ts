import mongoose, { Schema } from "mongoose";
import { IUser } from "@user";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import { userRoles } from "@user";

const UserSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      default: () => nanoid(12),
      unique: true,
      index: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: false,
    },
    role: {
      enum: userRoles,
      required: false,
    },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],

    defaultAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: Date,

    refreshToken: String,

    refreshTokenExpires: Date,

    lastLogin: Date,

    deletedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isLocked: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  try {
    user.password = await argon2.hash(user.password!, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 32,
    });
    next();
  } catch (err) {
    next(err as any);
  }

  UserSchema.methods.comparePassword = async function (plain: string) {
    return await argon2.verify(this.password, plain);
  };
});

export const User = mongoose.model<IUser>("User", UserSchema);
