import inputResult from "../inputResult";

export default class UserDescriptionValidation {
  constructor(input) {
    this.userDescription = input;
  }

  getResult() {
    return inputResult(true);
  }
}
