import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import qs from "qs";

import NoParallaxLayout from "../../Layouts/NoParallaxLayout";

import {
  GridItem,
  Card,
  Button,
  CardBody,
  CardFooter,
} from "../../components/components";

import NameInput from "../../views/SubComponents/authAndProfile/NameInput";
import DescriptionInput from "../../views/SubComponents/authAndProfile/DescriptionInput";
import PasswordInput from "../../views/SubComponents/authAndProfile/PasswordInput";
import GenderInput from "../../views/SubComponents/authAndProfile/GenderInput";
import BirthdayInput from "../../views/SubComponents/authAndProfile/BirthdayInput";
import CollectingPersonalInformationAggrement from "../../views/modals/auth/CollectingPersonalInformationAggrement";
import ModalOpenHelperText from "../../views/SubComponents/authAndProfile/ModalOpenHelperText";

import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import {
  GENDER_NULL_ERROR,
  BIRTHDAY_NULL_ERROR,
  DESCRIPTION_NULL_ERROR,
  PLEASE_READ_RULES,
} from "../../app/helper/auth/authAlertMessages";
import { CHECK_AGREEMENT_HELPER } from "../../app/helper/auth/helperTexts";
import { setAlertMsg } from "../../app/store/alert";
import { requestLevelup } from "../../app/store/userControl";
import LevelupValidation from "../../app/inputValidation/user/levelupValidation";
import PasswordValidation from "../../app/inputValidation/user/passwordValidation";

const useStyles = makeStyles(styles);

export const Levelup = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {
    setAlertMsg,
    location,
    requestLevelup,
    //        ...rest
  } = props;

  const [viewAgreement, setViewAgreement] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedAgree, setCheckAgree] = useState(CHECK_AGREEMENT_HELPER);

  const handleModalOpen = (event) => {
    event.preventDefault();
    return setViewAgreement(true);
  };

  const handleModalNotOpen = (event) => {
    event.preventDefault();
    return setViewAgreement(false);
  };

  const [inputs, setInputs] = useState({
    givenName: "",
    familyName: "",
    description: "",

    password: "",
    confirmPassword: "",
  });

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const {
    givenName,
    familyName,
    description,
    password,
    confirmPassword,
  } = inputs;

  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date("1999-03-03"));

  const inputRef = {
    givenName: useRef(),
    familyName: useRef(),
    gender: useRef(),
    birthday: useRef(),
    description: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
    checkBox: useRef(),
  };

  const passwordInputCheck = new PasswordValidation({
    password,
    confirmPassword,
  });
  const levelupInputCheck = new LevelupValidation({ givenName, familyName });
  const passwordInputValidationResult = passwordInputCheck.getResult();

  const [birthdayChanged, setBirthdayChanged] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [birthdayErr, setBirthdayErr] = useState(false);
  const [genderErr, setGenderErr] = useState(false);
  const [genderSuccess, setGenderSuccess] = useState(false);

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]:
        name === "description" && value.length > 200
          ? value.substr(0, 200)
          : value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "familyName":
          handleModalNotOpen(e);
          return inputRef.givenName.current.focus();
        case "givenName":
          handleModalNotOpen(e);
          return inputRef.gender.current.focus();
        case "gender":
          handleModalNotOpen(e);
          return inputRef.birthday.current.focus();
        case "birthday":
          handleModalNotOpen(e);
          return inputRef.description.current.focus();
        case "description":
          handleModalNotOpen(e);
          return inputRef.password.current.focus();
        case "password":
          handleModalNotOpen(e);
          return inputRef.confirmPassword.current.focus();
        case "confirmPassword":
          return handleModalOpen(e);
        default:
          return onSubmitHandler(e);
      }
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setGenderErr(false);
    setGenderSuccess(true);
  };

  const handleDateChange = (date) => {
    setBirthdayChanged(true);
    setBirthdayErr(false);
    setBirthday(date._d);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let ok = true;
    if (!levelupInputCheck.familyNameValidation.getResult().ok) {
      ok = false;
      setAlertMsg(
        levelupInputCheck.familyNameValidation.getResult().message,
        "error"
      );
    }

    if (!levelupInputCheck.givenNameValidation.getResult().ok) {
      ok = false;
      setAlertMsg(
        levelupInputCheck.givenNameValidation.getResult().message,
        "error"
      );
    }

    if (!gender) {
      ok = false;
      setAlertMsg(GENDER_NULL_ERROR, "error", "gender");
    }

    if (!birthdayChanged) {
      ok = false;
      setBirthdayErr(true);
      setAlertMsg(BIRTHDAY_NULL_ERROR, "error", "birthday");
    }

    if (!description) {
      ok = false;
      setDescriptionErr(true);
      setAlertMsg(DESCRIPTION_NULL_ERROR, "error", "description");
    }

    if (!passwordInputValidationResult.ok) {
      ok = false;
      inputRef.password.current.focus();
      setAlertMsg(passwordInputValidationResult.message, "error", "password");
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (!isChecked) {
      ok = false;
      setAlertMsg(PLEASE_READ_RULES, "error");
    }

    if (ok) {
      const userPersonalInfo = {
        gender,
        birthday,
        ...inputs,
      };
      console.log(userPersonalInfo);
      //console.log(userPersonalInfo, query);
      requestLevelup(userPersonalInfo, query);
    }
  };

  return (
    <>
      <CollectingPersonalInformationAggrement
        open={viewAgreement}
        onClose={() => setViewAgreement(false)}
        setCheckedAgreement={setIsChecked}
        setChangeHelperText={setCheckAgree}
      />
      <NoParallaxLayout isBigCard={true}>
        <GridItem xs={12} sm={12} md={6} lg={5}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <p className={classes.divider}>
                실명과 생년월일은 운영진들한테만 공개됩니다.
              </p>
              <CardBody className={classes.bigCardBody}>
                <GridItem xs={12} sm={12} md={12}>
                  <NameInput
                    nameType="familyName"
                    value={familyName}
                    inputRef={inputRef.familyName}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                  />
                  <NameInput
                    nameType="givenName"
                    value={givenName}
                    inputRef={inputRef.givenName}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                  />
                  <GenderInput
                    success={genderSuccess}
                    error={genderErr}
                    value={gender}
                    inputRef={inputRef.gender}
                    onClick={handleKeyPress}
                    onChange={handleGenderChange}
                  />
                  <br /> <br />
                  <BirthdayInput
                    success={birthdayChanged}
                    error={birthdayErr}
                    value={birthday}
                    inputRef={inputRef.birthday}
                    onClick={handleKeyPress}
                    onChange={handleDateChange}
                  />
                  <br /> <br />
                  <DescriptionInput
                    error={descriptionErr}
                    value={description}
                    inputRef={inputRef.description}
                    onKeyPress={handleKeyPress}
                    onChange={onInputHandler}
                  />
                  <PasswordInput
                    error={passwordErr}
                    value={password}
                    inputRef={inputRef.password}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                  />
                  <PasswordInput
                    isConfirm={true}
                    error={passwordErr}
                    value={confirmPassword}
                    inputRef={inputRef.confirmPassword}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                  />
                  <br />
                  <br />
                  <ModalOpenHelperText
                    onClick={handleModalOpen}
                    innerText={checkedAgree}
                    isChecked={isChecked}
                  />
                </GridItem>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color="primary"
                  size="lg"
                  onClick={onSubmitHandler}
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </NoParallaxLayout>
    </>
  );
};

Levelup.propTypes = {
  setAlertMsg: PropTypes.func,
  requestLevelup: PropTypes.func,
  alerts: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps, { setAlertMsg, requestLevelup })(
  Levelup
);
