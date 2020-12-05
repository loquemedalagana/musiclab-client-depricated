//for social users
//put email for auth
import React, { useState } from "react";
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
import { resetPassword } from "../../app/store/userValidation";
import { setAlertMsg } from "../../app/store/alert";

import {
  checkSpace,
  //checkSpecialChar
} from "../../utils/checkStringPatterns";

const useStyles = makeStyles(styles);

const inputhelper = `비밀번호는 반드시 8자 이상으로 입력해주세요.`;

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

    if (!password || !confirmPassword) {
      ok = false;
      setAlertMsg("비밀번호를 입력해주세요", "error", "password");
      setPasswordErr(true);
    } else if (password && password !== confirmPassword && confirmPassword) {
      ok = false;
      setAlertMsg(
        "비밀번호와 비밀번호 확인은 같아야합니다.",
        "error",
        "password"
      );
      setPasswordErr(true);
    } else if (checkSpace(password) || checkSpace(confirmPassword)) {
      ok = false;
      setAlertMsg("비밀번호에 공백이 들어갈 수 없습니다.", "error", "password");
      setPasswordErr(true);
    } else if (password.length < 8) {
      ok = false;
      setAlertMsg(
        "비밀번호는 최소 8자 이상이어야 합니다.",
        "error",
        "password"
      );
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (ok) {
      //reset password
      resetPassword(inputs, query);
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
                <p className={classes.divider}>{inputhelper}</p>
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
                      onChange: onInputHandler,
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
                      onChange: onInputHandler,
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
