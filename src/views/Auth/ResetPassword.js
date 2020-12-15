import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import qs from "qs";

import { InputAdornment, FormHelperText } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import {
  Footer,
  GridContainer,
  GridItem,
  Card,
  CardHeader,
  Button,
  CardBody,
  CustomInput,
  CardFooter,
} from "../../components/components";
import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/background";
import styles from "../../assets/jss/material-kit-react/views/LoginSignupStyle";
import { resetPassword } from "../../app/store/userValidationAndUpdate";
import { setAlertMsg } from "../../app/store/alert";
import { PASSWORD_HELPER } from "../../app/helperTexts/auth/authAlertMessages";

import PasswordValidation from "../../app/inputValidation/user/passwordValidation";

const useStyles = makeStyles(styles);

export const ResetPassword = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { resetPassword, setAlertMsg, alerts, location } = props;

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  //console.log(query);

  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordErr, setPasswordErr] = useState(false);

  const { password, confirmPassword } = inputs;

  const inputRef = {
    password: useRef(),
    confirmPassword: useRef(),
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
    const passwordInputCheck = new PasswordValidation({
      password,
      confirmPassword,
    });
    const passwordInputValidationResult = passwordInputCheck.getResult();

    if (!passwordInputValidationResult.ok) {
      inputRef.password.current.focus();
      ok = false;
      setAlertMsg(passwordInputValidationResult.message, "error", "password");
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (ok) {
      //reset password
      return resetPassword(inputs, query);
    }
    inputRef.password.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "password":
          return inputRef.confirmPassword.current.focus();
        default:
          return onSubmitHandler(e);
      }
    }
  };

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
                  <h4>Please input your new password</h4>
                </CardHeader>
                <p className={classes.divider}>{PASSWORD_HELPER}</p>
                <CardBody>
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    error={passwordErr}
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
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={passwordErr}
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

ResetPassword.propTypes = {
  setAlertMsg: PropTypes.func,
  resetPassword: PropTypes.func,
  alerts: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlertMsg, resetPassword })(
  ResetPassword
);
