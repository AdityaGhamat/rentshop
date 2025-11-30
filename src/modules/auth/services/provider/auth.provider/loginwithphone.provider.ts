import { type LoginWithPhoneType } from "@/modules/auth";
import { BadRequestError } from "@/modules/core/errors";
import userRepository from "@/modules/user/repository/user.repository";
import otpService from "../../otp.service";

class LoginWithPhoneProvider {
  public async loginWithPhone(LoginWithPhoneDto: LoginWithPhoneType) {
    const { phone } = LoginWithPhoneDto;
    const user = await userRepository.findOne({ phone });
    if (!user) {
      throw new BadRequestError("User with input number not found");
    }
    //send the otp to the phone number
    await otpService.sendOtp(phone, "VERIFY_PHONE", user.uid);

    return { phone, otpsent: true };
  }
}
export default new LoginWithPhoneProvider();
