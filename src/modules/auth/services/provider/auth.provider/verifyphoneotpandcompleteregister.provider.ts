import { type VerifyPhoneOtpAndCompleteRegisterType } from "@/modules/auth/dto/auto.dto";
import otpService from "../../otp.service";
import { BadRequestError } from "@/modules/core/errors";
import userRepository from "@/modules/user/repository/user.repository";
import tokenService from "../../token.service";

class VerifyPhoneOtpAndCompleteRegisterProvider {
  public async verifyPhoneOtpAndCompleteRegister(
    verifyPhoneOtpAndCompleteRegisterDto: VerifyPhoneOtpAndCompleteRegisterType
  ) {
    const { otp, phone, name, email, ip, userAgent } =
      verifyPhoneOtpAndCompleteRegisterDto;

    //verify otp
    const otpCheck = await otpService.verifyOtp(phone, otp, "REGISTER");

    if (!otpCheck) {
      throw new BadRequestError("Failed to verify otp");
    }
    const newuser = await userRepository.create({ phone, name, email });

    //generating tokens
    const tokens = await tokenService.generateToken(newuser, { ip, userAgent });

    return tokens;
  }
}

export default new VerifyPhoneOtpAndCompleteRegisterProvider();
