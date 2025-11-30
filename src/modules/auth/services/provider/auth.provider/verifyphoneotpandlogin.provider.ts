import { VerifyPhoneOtpAndCompleteLoginType } from "@/modules/auth/dto";
import otpService from "../../otp.service";
import userRepository from "@/modules/user/repository/user.repository";
import { BadRequestError } from "@/modules/core/errors";
import tokenService from "../../token.service";
class VerifyPhoneOtpAndCompleteLoginProvider {
  public async verifyPhoneAndLogin(
    VerifyPhoneAndLoginDto: VerifyPhoneOtpAndCompleteLoginType
  ) {
    const { otp, phone, ip, userAgent } = VerifyPhoneAndLoginDto;
    const user = await userRepository.findOne({ phone });
    if (!user) {
      throw new BadRequestError("User is not registered");
    }
    await otpService.verifyOtp(phone, otp, "VERIFY_PHONE");
    if (!user.isPhoneVerified) {
      user.isPhoneVerified = true;
      await user.save();
    }

    const tokens = await tokenService.generateToken(user, { ip, userAgent });

    return tokens;
  }
}
export default new VerifyPhoneOtpAndCompleteLoginProvider();
