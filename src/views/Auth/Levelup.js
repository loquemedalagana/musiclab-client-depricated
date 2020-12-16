import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import qs from "qs";

import {
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  People,
  VpnKey as VpnKeyIcon,
  MusicNote as MusicNoteIcon,
  Check,
} from "@material-ui/icons";

import {
  Footer,
  GridContainer,
  GridItem,
  Card,
  Button,
  CardBody,
  CustomInput,
  CardFooter,
  DateTimePicker,
  CustomSelectInput,
} from "../../components/components";
import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/background";
import styles from "../../assets/jss/material-kit-react/views/LevelupStyle";
import {
  GENDER_NULL_ERROR,
  BIRTHDAY_NULL_ERROR,
  DESCRIPTION_NULL_ERROR,
  DESCRIPTION_OVER_ERROR,
  PLEASE_READ_RULES,
} from "../../app/helper/auth/authAlertMessages";
import {
  CHECK_VALID_INFO,
  DESCRIPTION_HELP,
} from "../../app/helper/auth/helperTexts";
import { setAlertMsg } from "../../app/store/alert";
import { requestLevelup } from "../../app/store/userValidationAndUpdate";

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
    alerts,
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
  const [familyNameSuccess, setFamilyNameSuccess] = useState(false);
  const [givenNameErr, setGivenNameErr] = useState(false);
  const [givenNameSuccess, setGivenNameSuccess] = useState(false);

  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionSuccess, setDescriptionSuccess] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

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
      //console.log(userPersonalInfo, query);
      requestLevelup(userPersonalInfo, query);
    }
  };

  return (
    <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
      <div className={classes.container}>
        <GridContainer
          justify={window.innerWidth > 959 ? "space-between" : "center"}
        >
          <GridItem xs={12} sm={12} md={6} lg={5}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <p className={classes.divider}>
                  실명과 생년월일은 운영진들한테만 공개됩니다.
                </p>
                <CardBody className={alignment}>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Family name(성)"
                      id="last"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={familyNameSuccess}
                      error={familyNameErr}
                      inputProps={{
                        type: "text",
                        value: familyName,
                        name: "familyName",
                        inputRef: inputRef.familyName,
                        onKeyPress: handleKeyPress,
                        onChange: onInputHandler,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {alerts.map(
                      ({ message, name, id }) =>
                        name === "familyname" && (
                          <FormHelperText
                            key={id}
                            style={{ textAlign: "right" }}
                            error
                          >
                            {message}
                          </FormHelperText>
                        )
                    )}
                    <CustomInput
                      labelText="Given name(이름)"
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={givenNameSuccess}
                      error={givenNameErr}
                      inputProps={{
                        type: "text",
                        value: givenName,
                        name: "givenName",
                        inputRef: inputRef.givenName,
                        onKeyPress: handleKeyPress,
                        onChange: onInputHandler,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {alerts.map(
                      ({ message, name, id }) =>
                        name === "givenname" && (
                          <FormHelperText
                            key={id}
                            style={{ textAlign: "right" }}
                            error
                          >
                            {message}
                          </FormHelperText>
                        )
                    )}
                    <CustomSelectInput
                      labelText="Gender(성별)"
                      labelId="select-gender"
                      id="simple-select"
                      success={genderSuccess}
                      error={genderErr}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        varient: "filled",
                        name: "gender",
                        value: gender,
                        inputRef: inputRef.gender,
                        onClick: handleKeyPress,
                        onChange: handleGenderChange,
                      }}
                      menuItemList={[
                        { key: 1, value: "male", label: "Male(남성)" },
                        { key: 2, value: "female", label: "Female(여성)" },
                      ]}
                    />
                    {alerts.map(
                      ({ message, name, id }) =>
                        name === "gender" && (
                          <FormHelperText
                            key={id}
                            style={{ textAlign: "right" }}
                            error
                          >
                            {message}
                          </FormHelperText>
                        )
                    )}
                    <br /> <br />
                    <DateTimePicker
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={birthdayChanged}
                      error={birthdayErr}
                      labelText="Your birthday(생년월일)"
                      inputProps={{
                        dateFormat: true,
                        timeFormat: false,
                        placeholder: "Pick your birthday!",
                        name: "birthday",
                        value: birthday,
                        ref: inputRef.birthday,
                        onClick: handleKeyPress,
                        onChange: handleDateChange,
                      }}
                    />
                    {alerts.map(
                      ({ message, name, id }) =>
                        name === "birthday" && (
                          <FormHelperText
                            key={id}
                            style={{ textAlign: "right" }}
                            error
                          >
                            {message}
                          </FormHelperText>
                        )
                    )}
                    <br /> <br />
                    <CustomInput
                      formHelperText={DESCRIPTION_HELP}
                      id="description"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={descriptionSuccess}
                      error={descriptionErr}
                      inputProps={{
                        rows: "4",
                        type: "text",
                        multiline: true,
                        name: "description",
                        value: description,
                        inputRef: inputRef.description,
                        onKeyPress: handleKeyPress,
                        onChange: onInputHandler,
                        endAdornment: (
                          <InputAdornment position="end">
                            <MusicNoteIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText
                      style={{ textAlign: "right" }}
                      error={
                        description.length >= 200 || descriptionErr
                          ? true
                          : false
                      }
                    >
                      {description.length >= 200
                        ? DESCRIPTION_OVER_ERROR
                        : description.length}
                    </FormHelperText>
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      error={passwordErr}
                      success={passwordSuccess}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password",
                        value: password,
                        inputRef: inputRef.password,
                        onChange: onInputHandler,
                        onKeyPress: handleKeyPress,
                        endAdornment: (
                          <InputAdornment position="end">
                            <VpnKeyIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    {alerts.map(
                      ({ message, name, id }) =>
                        name === "password" && (
                          <FormHelperText
                            key={id}
                            style={{ textAlign: "right" }}
                            error
                          >
                            {message}
                          </FormHelperText>
                        )
                    )}
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmpass"
                      error={passwordErr}
                      success={passwordSuccess}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "confirmPassword",
                        value: confirmPassword,
                        inputRef: inputRef.confirmPassword,
                        onChange: onInputHandler,
                        onKeyPress: handleKeyPress,
                        endAdornment: (
                          <InputAdornment position="end">
                            <VpnKeyIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
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
                              isChecked
                                ? setIsChecked(false)
                                : setIsChecked(true)
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
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
        </GridContainer>
      </div>
      <Footer whiteFont />
    </div>
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
