import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import qs from "qs";
import NoParallaxLayout from "../../Layouts/NoParallaxLayout";

import {
  GridItem,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
} from "../../../components/components";

import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import { resetPassword } from "../../../app/store/userValidationAndUpdate";
import { setAlertMsg } from "../../../app/store/alert";
import { PASSWORD_HELPER } from "../../../app/helper/auth/authAlertMessages";

import PasswordValidation from "../../../app/inputValidation/user/passwordValidation";
import PasswordInput from "../../SubComponents/PasswordInput";

const useStyles = makeStyles(styles);

export const ResetPassword = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { resetPassword, setAlertMsg, location } = props;

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
    <NoParallaxLayout>
      <GridItem xs={12} sm={12} md={4}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h4>Please input your new password</h4>
            </CardHeader>
            <p className={classes.divider}>{PASSWORD_HELPER}</p>
            <CardBody>
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
