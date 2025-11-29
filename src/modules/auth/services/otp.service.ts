import { OtpPurpose } from "./types";
import { env } from "@/modules/core/utility";
import argon2 from "argon2";
import otpcodeRepository from "../repository/otpcode.repository";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "@/modules/core/errors";
class OtpService {
  private MAX_ATTEMPTS = 5;
  private OTP_TTL_MS = env.OTP_TTL_MS;
  private generateOtp(length: number): string {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    const otp = String(Math.floor(Math.random() * (max - min + 1) + min));
    return otp;
  }
  public async sendOtp(
    phone: string,
    purpose: OtpPurpose,
    userId?: any
  ): Promise<void> {
    const code = this.generateOtp(env.OTP_LENGTH);
    const hash = await argon2.hash(code);

    await otpcodeRepository.create({
      // save otp in schema
      phone,
      purpose,
      user: userId,
      codeHash: hash,
      expiresAt: new Date(Date.now() + this.OTP_TTL_MS),
    });

    console.log("otp has been sent"); // create another sender using service provider whichever you are using
  }

  public async verifyOtp(phone: string, code: string, purpose: OtpPurpose) {
    const otpDoc = await otpcodeRepository.findOne(
      { phone, purpose },
      { sort: { createdAt: -1 } }
    );
    if (!otpDoc) {
      throw new NotFoundError("Otp not found,please request new otp");
    }
    if (otpDoc.consumed) {
      throw new ForbiddenError("Otp is already used");
    }
    if (otpDoc.expiresAt < new Date()) {
      throw new BadRequestError("Otp already expired,please request new otp");
    }
    if (otpDoc.attempts >= this.MAX_ATTEMPTS) {
      throw new ForbiddenError("Too many attempts,please request new otp");
    }

    const verified = await argon2.verify(otpDoc.codeHash, code);

    if (!verified) {
      otpDoc.attempts += 1;
      await otpDoc.save();
      throw new BadRequestError("Otp is incorrect!");
    }

    otpDoc.consumed = true;
    await otpDoc.save();

    return otpDoc;
  }
}
export default new OtpService();
