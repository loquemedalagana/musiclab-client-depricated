import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import qs from "qs";

import { FormControlLabel, Checkbox } from "@material-ui/core";
import { Check } from "@material-ui/icons";

import NoParallaxLayout from "../../Layouts/NoParallaxLayout";

import {
  GridItem,
  Card,
  Button,
  CardBody,
  CardFooter,
} from "../../../components/components";

import NameInput from "../../SubComponents/NameInput";
import DescriptionInput from "../../SubComponents/DescriptionInput";
import PasswordInput from "../../SubComponents/PasswordInput";
import GenderInput from "../../SubComponents/GenderInput";
import BirthdayInput from "../../SubComponents/BirthdayInput";

import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/LevelupStyle";
import {
  GENDER_NULL_ERROR,
  BIRTHDAY_NULL_ERROR,
  DESCRIPTION_NULL_ERROR,
  PLEASE_READ_RULES,
} from "../../../app/helper/auth/authAlertMessages";
import { CHECK_VALID_INFO } from "../../../app/helper/auth/helperTexts";
import { setAlertMsg } from "../../../app/store/alert";
import { requestLevelup } from "../../../app/store/userValidationAndUpdate";

const useStyles = makeStyles(styles);

const alignment = {
  justifyContent: "space-between",
};

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

  const [isChecked, setIsChecked] = useState(false);
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

  const [birthdayChanged, setBirthdayChanged] = useState(false);

  const [familyNameErr, setFamilyNameErr] = useState(false);
  const [givenNameErr, setGivenNameErr] = useState(false);

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
          return inputRef.givenName.current.focus();
        case "givenName":
          return inputRef.gender.current.focus();
        case "gender":
          return inputRef.birthday.current.focus();
        case "birthday":
          return inputRef.description.current.focus();
        case "description":
          return inputRef.password.current.focus();
        case "password":
          return inputRef.confirmPassword.current.focus();
        case "confirmPassword":
          return inputRef.checkBox.current.focus();
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
    if (!givenName) {
    }

    if (!familyName) {
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
      setAlertMsg(DESCRIPTION_NULL_ERROR, "error", "description");
    }

    if (!password || !confirmPassword) {
    }

    if (!isChecked) {
      ok = false;
      setAlertMsg(PLEASE_READ_RULES, "error");
    }

    if (ok) {
      const { familyName, givenName } = inputs;
      const userPersonalInfo = {
        gender,
        birthday,
        name: {
          familyName,
          givenName,
        },
        ...inputs,
      };
      console.log(userPersonalInfo);
      //console.log(userPersonalInfo, query);
      // requestLevelup(userPersonalInfo, query);
    }
  };

  return (
    <NoParallaxLayout isBigCard={true}>
      <GridItem xs={12} sm={12} md={6} lg={5}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form}>
            <p className={classes.divider}>
              실명과 생년월일은 운영진들한테만 공개됩니다.
            </p>
            <CardBody className={alignment}>
              <GridItem xs={12} sm={12} md={12}>
                <NameInput
                  nameType="familyName"
                  value={familyName}
                  inputRef={inputRef.familyName}
                  onChange={onInputHandler}
                  onKeyPress={handleKeyPress}
                  error={familyNameErr}
                />
                <NameInput
                  nameType="givenName"
                  value={givenName}
                  inputRef={inputRef.givenName}
                  onChange={onInputHandler}
                  onKeyPress={handleKeyPress}
                  error={givenNameErr}
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
                <div className={classes.checkboxAndRadio}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        value={isChecked}
                        inputRef={inputRef.checkBox}
                        onKeyPress={handleKeyPress}
                        onClick={() =>
                          isChecked ? setIsChecked(false) : setIsChecked(true)
                        }
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    className={classes.formControl}
                    classes={{ label: classes.label }}
                    label={CHECK_VALID_INFO}
                  />
                </div>
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
});

export default connect(mapStateToProps, { setAlertMsg, requestLevelup })(
  Levelup
);
