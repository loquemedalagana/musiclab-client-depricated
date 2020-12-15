import inputResult from "../inputResult";

export default class UserDescriptionValidation {
  constructor({ description }) {
    this.userDescription = description;
  }

  getResult() {
    return inputResult(true);
  }
}
