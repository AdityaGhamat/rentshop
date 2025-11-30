import {
  RegisterWithEmailtype,
  registerWithPhoneType,
} from "@/modules/auth/dto/auth.dto";
import userRepository from "@/modules/user/repository/user.repository";
import otpService from "../../otp.service";
import { ConflictError } from "@/modules/core/errors";
class RegisterWithPhoneProvider {
  constructor() {}
  async registerWithPhone(registerWithPhoneDto: registerWithPhoneType) {
    const { phone } = registerWithPhoneDto;
    //fetching user from phone
    const user = await userRepository.findOne({ phone: phone });

    if (user) {
      throw new ConflictError("User with this phone number already exists");
    }

    //seding otp for verification purposes
    await otpService.sendOtp(phone, "REGISTER");

    return { phone, otpsent: true };
  }
}
export default new RegisterWithPhoneProvider();
