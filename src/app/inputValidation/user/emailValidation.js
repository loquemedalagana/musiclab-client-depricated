import inputResult from "../inputResult";

export default class EmailValidation {
  constructor(input) {
    this.isEmptyInput = input.length === 0;
    this.isValid = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      input
    );
  }

  getResult() {
    if (this.isEmptyInput) return inputResult(false, "이메일을 입력해주세요.");
    if (!this.isValid)
      return inputResult(false, "유효하지 않은 메일주소입니다.");
    return inputResult(true);
  }
}
