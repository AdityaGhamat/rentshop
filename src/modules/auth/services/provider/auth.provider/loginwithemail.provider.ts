import { LoginWithEmailType } from "@/modules/auth/dto";
import { BadRequestError } from "@/modules/core/errors";
import userRepository from "@/modules/user/repository/user.repository";
import tokenService from "../../token.service";
class LoginWithEmailProvider {
  public async loginWithEmail(LoginWithEmailDto: LoginWithEmailType) {
    const { email, password } = LoginWithEmailDto;
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestError(
        "Email is not registered,please register the email"
      );
    }
    if (!user.password) {
      throw new BadRequestError(
        "Please login with social provider,Email is not registered with password"
      );
    }
    const passwordCompare = await user.comparePassword(password);
    if (!passwordCompare) {
      throw new BadRequestError("Password is incorrect");
    }
    const tokens = await tokenService.generateToken(user);

    return tokens;
  }
}

export default new LoginWithEmailProvider();
