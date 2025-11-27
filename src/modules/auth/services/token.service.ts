import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/modules/core/utility";
import { IUser } from "@/modules/user";
import { nanoid } from "nanoid";
import refreshsessionRepository from "../repository/refreshsession.repository";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "@/modules/core/errors";

class TokenService {
  public signToken<T>(subject: string, expiresIn: number, payload: T) {
    return jwt.sign({ sub: subject, ...payload }, env.JWT_SECRET, {
      audience: env.JWT_TOKEN_AUDIENCE,
      issuer: env.JWT_TOKEN_ISSUER,
      expiresIn: expiresIn,
    });
  }
  public generateAccessToken(user: Partial<IUser>): string {
    return this.signToken(user.uid!, env.JWT_ACCESS_TOKEN_TTL, {
      email: user.email,
    });
  }
  public async generateRefreshToken(
    user: Partial<IUser>,
    meta?: { ip?: string; userAgent?: string }
  ) {
    const jti = nanoid();
    const refreshToken = this.signToken(user.uid!, env.JWT_REFRESH_TOKEN_TTL, {
      jti,
    });
    await refreshsessionRepository.create({
      jti: jti,
      user: (user as any)._id,
      expiresAt: new Date(Date.now() + env.JWT_REFRESH_TOKEN_TTL * 1000),
      revoked: false,
      userAgent: meta?.userAgent,
      ip: meta?.ip,
    });
    return { jti, refreshToken };
  }

  public async generateToken(
    user: Partial<IUser>,
    meta?: { ip?: string; userAgent?: string }
  ) {
    const accessToken = this.generateAccessToken(user);
    const { refreshToken } = await this.generateRefreshToken(user, meta);
    return { accessToken, refreshToken };
  }

  public verifyAccessToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET, {
      audience: env.JWT_TOKEN_AUDIENCE,
      issuer: env.JWT_TOKEN_ISSUER,
    }) as JwtPayload & { sub: string; email?: string };
  }

  public async verifyRefreshToken(token: string) {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      audience: env.JWT_TOKEN_AUDIENCE,
      issuer: env.JWT_TOKEN_ISSUER,
    }) as JwtPayload & { sub: string; jti?: string };

    if (!payload.jti) {
      throw new ForbiddenError("Invalid refresh token (missing jti)");
    }

    const session = await refreshsessionRepository.findOne({
      jti: payload.jti,
    });

    if (!session) {
      throw new NotFoundError("Refresh token session not found");
    }

    if (session?.revoked) {
      throw new ForbiddenError("Refresh Token has been revoked");
    }

    if (session.expiresAt && session.expiresAt < new Date()) {
      throw new BadRequestError("Refresh Token has been expired");
    }

    return { payload, session };
  }

  public async revokeRefreshToken(jti: string) {
    await refreshsessionRepository.updateOne(
      { jti },
      { revoked: true, expiresAt: new Date() }
    );
  }

  public async revokeAllSessions(userId: string) {
    await refreshsessionRepository.updateMany(
      { user: userId, revoked: false },
      { revoked: true, expiresAt: new Date() }
    );
  }
  public async isTokenBlackListed(jti: string): Promise<boolean> {
    const session = await refreshsessionRepository.findOne({ jti });
    if (!session) return true;
    if (session.revoked) return true;
    if (session.expiresAt && session.expiresAt < new Date()) return true;
    return false;
  }
}
export default new TokenService();
