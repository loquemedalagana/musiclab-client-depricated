import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { InputAdornment, FormControlLabel, Checkbox } from "@material-ui/core";
import People from "@material-ui/icons/People";
import Check from "@material-ui/icons/Check";

import { signupUser } from "../../app/store/userValidationAndUpdate";

import {
  Footer,
  GridContainer,
  GridItem,
  Card,
  Button,
  CardBody,
  CustomInput,
  CardFooter,
} from "../../components/components";
import EmailInput from "./subComponents/EmailInput";
import PasswordInput from "./subComponents/PasswordInput";

import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/background";
import styles from "../../assets/jss/material-kit-react/views/LoginSignupStyle";

import EmailValidation from "../../app/inputValidation/user/emailValidation";
import DisplayNameValidation from "../../app/inputValidation/user/displayNameValidation";
import PasswordValidation from "../../app/inputValidation/user/passwordValidation";
import { PLEASE_READ_RULES } from "../../app/helper/auth/authAlertMessages";

import { CHECK_VALID_EMAIL } from "../../app/helper/auth/helperTexts";
import { setAlertMsg } from "../../app/store/alert";
import SocialLogin from "./SocialLogin";

const useStyles = makeStyles(styles);

export const Signup = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {
    setAlertMsg,
    isAuth,
    signupUser,
    isChanged,
    //        ...rest
  } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const [nicknameErr, setNicknameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const { email, displayName, password, confirmPassword } = inputs;
  const inputRef = {
    email: useRef(),
    displayName: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
    checkBox: useRef(),
  };

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let ok = true;
    const emailInputCheck = new EmailValidation({ email });
    const emailInputValidationResult = emailInputCheck.getResult();

    const displayNameInputCheck = new DisplayNameValidation({ displayName });
    const displayNameValidationResult = displayNameInputCheck.getResult();

    const passwordInputCheck = new PasswordValidation({
      password,
      confirmPassword,
    });
    const passwordInputValidationResult = passwordInputCheck.getResult();

    if (!emailInputValidationResult.ok) {
      ok = false;
      inputRef.email.current.focus();
      setAlertMsg(emailInputValidationResult.message, "error", "email");
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (!displayNameValidationResult.ok) {
      inputRef.displayName.current.focus();
      ok = false;
      setAlertMsg(displayNameValidationResult.message, "error", "nickname");
      setNicknameErr(true);
    } else {
      setNicknameErr(false);
    }

    if (!passwordInputValidationResult.ok) {
      inputRef.password.current.focus();
      ok = false;
      setAlertMsg(passwordInputValidationResult.message, "error", "password");
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (!isChecked) {
      inputRef.checkBox.current.focus();
      ok = false;
      setAlertMsg(PLEASE_READ_RULES, "error");
    }

    if (ok) {
      signupUser(inputs);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "displayName":
          return inputRef.email.current.focus();
        case "email":
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

  if (isAuth) return <Redirect to="/" />;
  if (isChanged) return <Redirect to="/" />;

  return (
    <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
      <div className={classes.container}>
        <GridContainer
          justify={window.innerWidth > 959 ? "space-between" : "center"}
        >
          <GridItem xs={12} sm={12} md={5} lg={4}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <SocialLogin color="primary" classes={classes} />
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  <CustomInput
                    labelText="Your nickname..."
                    id="displayname"
                    error={nicknameErr}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      name: "displayName",
                      value: displayName,
                      inputRef: inputRef.displayName,
                      onKeyPress: handleKeyPress,
                      onChange: onInputHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <EmailInput
                    error={emailErr}
                    value={email}
                    inputRef={inputRef.email}
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
                    error={passwordErr}
                    isConfirm={true}
                    value={confirmPassword}
                    inputRef={inputRef.confirmPassword}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                  />

                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          value={isChecked}
                          inputRef={inputRef.checkBox}
                          onClick={() =>
                            isChecked ? setIsChecked(false) : setIsChecked(true)
                          }
                          onKeyPress={handleKeyPress}
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
                      label={CHECK_VALID_EMAIL}
                    />
                  </div>
                </CardBody>

                <CardFooter className={classes.cardFooter}>
                  <Button
                    simple
                    color="primary"
                    size="lg"
                    onClick={onSubmitHandler}
                  >
                    Join us
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

Signup.propTypes = {
  setAlertMsg: PropTypes.func,
  signupUser: PropTypes.func,
  alerts: PropTypes.array,
  isAuth: PropTypes.bool,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuth: state.auth.auth,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps, { setAlertMsg, signupUser })(Signup);
