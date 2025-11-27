import { env } from "@/modules/core/utility";
import { IUser } from "@/modules/user";
import { signToken } from "./signToken.provider";

export function generateAccessToken(user: Partial<IUser>): string {
  return signToken(user.uid, env.JWT_ACCESS_TOKEN_TTL, {
    sub: user.uid,
    email: user.email,
  });
}
