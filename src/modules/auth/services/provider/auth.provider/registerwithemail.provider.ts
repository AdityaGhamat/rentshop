import { ConflictError } from "@/modules/core/errors";
import userRepository from "@/modules/user/repository/user.repository";
import {
  RegisterWithEmailDto,
  type RegisterWithEmailtype,
} from "@/modules/auth/dto/auto.dto";
class RegisterWithEmailProvider {
  constructor() {}
  async registerWithEmail(registerWithEmailDto: RegisterWithEmailtype) {
    const { name, email, password } = registerWithEmailDto;
    //check if email is already exists,for tp use your own generic method later add user module's service
    const emailCheck = await userRepository.findOne({ email: email });
    if (emailCheck) {
      throw new ConflictError("User already exists");
    }
    const newUser = await userRepository.create({ name, email, password });

    // send otp for registering

    return newUser;
  }
}
export default new RegisterWithEmailProvider();
