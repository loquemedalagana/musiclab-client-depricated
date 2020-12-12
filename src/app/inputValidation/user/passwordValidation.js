import inputResult from "../inputResult";

export default class PasswordValidation {
  constructor(password, confirmPassword) {
    //가입일 때? 로그인 할 땐 다름..
    this.isSamePasswordInputs = password === confirmPassword;
  }

  getResult() {
    if (!this.isSamePasswordInputs)
      return inputResult(false, "비밀번호와 비밀번호 확인은 같아야 합니다.");

    return inputResult(true);
  }
}
