import NameValidation from "./NameValidation";

export default class LevelupValidation {
  constructor(props) {
    const { givenName, familyName } = props;
    this.givenNameValidation = new NameValidation({
      name: givenName,
      isGivenName: true,
    });
    this.familyNameValidation = new NameValidation({
      name: familyName,
      isFamilyName: true,
    });
  }
}
