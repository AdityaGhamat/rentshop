import jwt from "jsonwebtoken";
import { env } from "@/modules/core/utility";

export function signToken<T>(userId: any, expiresIn: number, payload: T) {
  return jwt.sign({ sub: userId, ...payload }, env.JWT_SECRET, {
    audience: env.JWT_TOKEN_AUDIENCE,
    issuer: env.JWT_TOKEN_ISSUER,
    expiresIn: expiresIn,
  });
}
