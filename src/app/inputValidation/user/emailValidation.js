import inputResult from "../inputResult";

export default class EmailValidation {
  constructor(input) {
    this.email = input;
    this.isValid = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      this.email
    );
  }

  getResult() {
    if (this.email.length === 0)
      return inputResult(false, "이메일을 입력해주세요.");
    if (!this.isValid)
      return inputResult(false, "유효하지 않은 메일주소입니다.");
    return inputResult(true);
  }
}
