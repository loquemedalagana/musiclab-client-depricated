import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core";
import { Check } from "@material-ui/icons";

import {
  Footer,
  GridContainer,
  GridItem,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
} from "../../components/components";

import EmailInput from "../SubComponents/EmailInput";

import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/layouts/background";
import styles from "../../assets/jss/material-kit-react/views/LoginSignupStyle";
import EmailValidation from "../../app/inputValidation/user/emailValidation";
import {
  CHECK_VALID_EMAIL,
  INPUT_VALID_EMAIL,
} from "../../app/helper/auth/helperTexts";
import { emailRegister } from "../../app/store/userValidationAndUpdate";
import { setAlertMsg } from "../../app/store/alert";
import { PLEASE_READ_RULES } from "../../app/helper/auth/authAlertMessages";

const useStyles = makeStyles(styles);

export const InputEmailForSocialUsers = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {
    isChanged,
    emailRegister,
    setAlertMsg,
    alerts,
    isRegisteredEmail,
    isNotLoggedin,
  } = props;

  const [inputs, setInputs] = useState({
    email: "",
  });

  const inputRef = {
    email: useRef(),
    checkBox: useRef(),
  };

  const [emailErr, setEmailErr] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const { email } = inputs;

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

    if (!emailInputValidationResult.ok) {
      ok = false;
      inputRef.email.current.focus();
      setAlertMsg(emailInputValidationResult.message, "error", "email");
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (!isChecked) {
      ok = false;
      setAlertMsg(PLEASE_READ_RULES, "error");
    }

    if (ok) {
      emailRegister(inputs);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      switch (e.target.name) {
        case "email":
          return inputRef.checkBox.current.focus();
        default:
          return onSubmitHandler(e);
      }
    }
  };

  //if (isRegisteredEmail || isNotLoggedin) return <Redirect to="/" />;
  if (isChanged) return <Redirect to="/waitinglevelup" />;

  return (
    <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
      <div className={classes.container}>
        <GridContainer
          justify={window.innerWidth > 959 ? "space-between" : "center"}
        >
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Please input your email</h4>
                </CardHeader>
                <p className={classes.divider}>{INPUT_VALID_EMAIL}</p>
                <CardBody>
                  <EmailInput
                    value={email}
                    inputRef={inputRef.email}
                    onChange={onInputHandler}
                    onKeyPress={handleKeyPress}
                    error={emailErr}
                  />
                  {alerts.map(
                    ({ message, name, id }) =>
                      name === "email" && (
                        <FormHelperText
                          key={id}
                          style={{ textAlign: "right" }}
                          error
                        >
                          {message}
                        </FormHelperText>
                      )
                  )}
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
                          onKeyPress={handleKeyPress}
                          onClick={() =>
                            isChecked ? setIsChecked(false) : setIsChecked(true)
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

InputEmailForSocialUsers.propTypes = {
  setAlertMsg: PropTypes.func,
  emailRegister: PropTypes.func,
  isRegisteredEmail: PropTypes.bool,
  isNotLoggedin: PropTypes.bool,
  isChanged: PropTypes.bool,
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isNotLoggedin: !state.auth.auth,
  isRegisteredEmail: state.auth.userData && state.auth.userData.email,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps, { setAlertMsg, emailRegister })(
  InputEmailForSocialUsers
);
