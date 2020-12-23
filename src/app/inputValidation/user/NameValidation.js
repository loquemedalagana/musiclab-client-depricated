import inputResult from "../inputResult";

export default class NameValidation {
  constructor({ name, isGivenName, isFamilyName }) {
    this.haveSpace = /\s+/g.test(name);
    this.isEmptyInput = name.length === 0;
    this.haveNumber = /[0-9]/.test(name);
    this.haveSpecialChar = /[~!@#$%^&*()_+|<>?:{}]/.test(name);
    this.isFamilyName = !!isFamilyName;
    this.isGivenName = !!isGivenName;
  }

  getNameType() {
    if (!this.isFamilyName && !this.isGivenName) return "닉네임";
    else if (!this.isFamilyName && this.isGivenName) return "이름";
    else return "성";
  }

  getResult() {
    const nameType = this.getNameType();
    if (this.isEmptyInput)
      return inputResult(false, `${nameType}을 입력해주세요.`);
    if (this.haveSpace)
      return inputResult(false, `${nameType}에는 공백이 들어갈 수 없습니다.`);
    if (this.haveNumber)
      return inputResult(false, `${nameType}에는 숫자가 들어갈 수 없습니다.`);
    if (this.haveSpecialChar)
      return inputResult(
        false,
        `${nameType}에는 특수문자가 들어갈 수 없습니다.`
      );
    return inputResult(true);
  }
}
