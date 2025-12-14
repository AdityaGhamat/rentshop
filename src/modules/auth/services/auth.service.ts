import loginwithemailProvider from "./provider/auth.provider/loginwithemail.provider";
import loginwithphoneProvider from "./provider/auth.provider/loginwithphone.provider";
import registerwithemailProvider from "./provider/auth.provider/registerwithemail.provider";
import registerwithphoneProvider from "./provider/auth.provider/registerwithphone.provider";
import verifyphoneotpandcompleteregisterProvider from "./provider/auth.provider/verifyphoneotpandcompleteregister.provider";
import verifyphoneotpandloginProvider from "./provider/auth.provider/verifyphoneotpandlogin.provider";
import {
  LoginWithEmailType,
  LoginWithPhoneType,
  RegisterWithEmailtype,
  VerifyPhoneOtpAndCompleteLoginType,
  VerifyPhoneOtpAndCompleteRegisterType,
  registerWithPhoneType,
} from "../dto";

class AuthService {
  public async loginWithEmail(loginWithEmailDto: LoginWithEmailType) {
    return await loginwithemailProvider.loginWithEmail(loginWithEmailDto);
  }
  public async loginWithPhone(loginWithPhoneDto: LoginWithPhoneType) {
    return await loginwithphoneProvider.loginWithPhone(loginWithPhoneDto);
  }
  public async registerWithPhone(registerWithPhoneDto: registerWithPhoneType) {
    return await registerwithphoneProvider.registerWithPhone(
      registerWithPhoneDto
    );
  }
  public async registerWithEmail(registerWithEmailDto: RegisterWithEmailtype) {
    return await registerwithemailProvider.registerWithEmail(
      registerWithEmailDto
    );
  }
  public async verifyPhoneOtpandCompleteRegister(
    verifyPhoneOtpAndCompleteRegisterDto: VerifyPhoneOtpAndCompleteRegisterType
  ) {
    return await verifyphoneotpandcompleteregisterProvider.verifyPhoneOtpAndCompleteRegister(
      verifyPhoneOtpAndCompleteRegisterDto
    );
  }
  public async verifyPhoneOtpandLogin(
    verifyPhoneandCompleteLoginDto: VerifyPhoneOtpAndCompleteLoginType
  ) {
    return await verifyphoneotpandloginProvider.verifyPhoneAndLogin(
      verifyPhoneandCompleteLoginDto
    );
  }
}
export default new AuthService();
