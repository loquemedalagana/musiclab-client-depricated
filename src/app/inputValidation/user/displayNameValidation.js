import inputResult from "../inputResult";

export default class DisplayNameValidation {
  constructor(input) {
    this.displayName = input;
  }

  getResult() {
    return inputResult(true);
  }
}
