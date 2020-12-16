import inputResult from "../inputResult";
import {
  EMAIL_NULL_ERROR,
  EMAIL_INVALID_ERROR,
} from "../../helper/auth/authAlertMessages";

export default class EmailValidation {
  constructor({ email }) {
    this.isEmptyInput = { email }.length === 0;
    this.isValid = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      email
    );
  }

  getResult() {
    if (this.isEmptyInput) return inputResult(false, EMAIL_NULL_ERROR);
    if (!this.isValid) return inputResult(false, EMAIL_INVALID_ERROR);
    return inputResult(true);
  }
}
