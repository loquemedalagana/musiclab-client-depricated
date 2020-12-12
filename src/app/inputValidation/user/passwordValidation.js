import inputResult from "../inputResult";
import { MIN_PASSWORD_LENGTH } from "../constants";

//배포 전에는 알파벳 반드시 포함으로 하기

export default class PasswordValidation {
  constructor(password, confirmPassword) {
    //가입일 때? 로그인 할 땐 다름..
    this.haveSpace = /\s+/g.test(password);
    this.isEmptyInput = password.length === 0 || confirmPassword.length === 0;
    this.isSamePasswordInputs = password === confirmPassword;
    this.isLessThanMinLength =
      password.length < MIN_PASSWORD_LENGTH ||
      confirmPassword.length < MIN_PASSWORD_LENGTH;
  }

  getResult() {
    if (this.isEmptyInput)
      return inputResult(false, "새로운 비밀번호를 입력해주세요.");
    if (this.haveSpace)
      return inputResult(false, "비밀번호에는 공백이 들어갈 수 없습니다.");
    if (this.isLessThanMinLength)
      return inputResult(
        false,
        `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`
      );
    if (!this.isSamePasswordInputs)
      return inputResult(false, "비밀번호와 비밀번호 확인은 같아야 합니다.");

    return inputResult(true);
  }
}
