import inputResult from "../inputResult";

export default class DisplayNameValidation {
  constructor({ displayName }) {
    this.haveSpace = /\s+/g.test(displayName);
    this.isEmptyInput = displayName.length === 0;
    this.haveNumber = /[0-9]/.test(displayName);
    this.haveSpecialChar = /[~!@#$%^&*()_+|<>?:{}]/.test(displayName);
  }

  getResult() {
    if (this.isEmptyInput) return inputResult(false, "닉네임을 입력해주세요.");
    if (this.haveSpace)
      return inputResult(false, "닉네임에는 공백이 들어갈 수 없습니다.");
    if (this.haveNumber)
      return inputResult(false, "닉네임에는 숫자가 들어갈 수 없습니다.");
    if (this.haveSpecialChar)
      return inputResult(false, "닉네임에는 특수문자가 들어갈 수 없습니다.");
    return inputResult(true);
  }
}
