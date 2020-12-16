import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import classNames from "classnames";

import { InputAdornment, Link } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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

import { defaultBgStyle } from "../../assets/jss/material-kit-react/views/background";
import styles from "../../assets/jss/material-kit-react/views/LoginSignupStyle";
import Loading from "../../components/Loading/LinearLoading";
import FindPassword from "../Modals/FindPassword";
import { loginUser } from "../../app/store/auth";
import { setAlertMsg } from "../../app/store/alert";

import SocialLogin from "./SocialLogin";
import {
  EMAIL_NULL_ERROR,
  PASSWORD_NULL_ERROR,
} from "../../app/helper/auth/authAlertMessages";

const useStyles = makeStyles(styles);

export const Login = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { setAlertMsg, isAuth, loginUser, loading } = props;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const inputRef = {
    email: useRef(),
    password: useRef(),
  };

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [findPasswordOpen, setFindPasswordOpen] = useState(false);

  const { email, password } = inputs;

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
    if (!email) {
      inputRef.email.current.focus();
      ok = false;
      setAlertMsg(EMAIL_NULL_ERROR, "error", "email");
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (!password) {
      inputRef.password.current.focus();
      ok = false;
      setAlertMsg(PASSWORD_NULL_ERROR, "error", "password");
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (ok) {
      inputRef.email.current.blur();
      inputRef.password.current.blur();
      loginUser({ email, password });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSubmitHandler(e);
  };

  if (loading) return <Loading />;
  if (isAuth) return <Redirect to="/" />;

  return (
    <>
      <FindPassword
        open={findPasswordOpen}
        onClose={() => setFindPasswordOpen(false)}
      />
      <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
        <div className={classes.container}>
          <GridContainer
            justify={window.innerWidth > 959 ? "space-between" : "center"}
          >
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <SocialLogin color="primary" classes={classes} />
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <EmailInput
                      value={email}
                      error={emailErr}
                      inputRef={inputRef.email}
                      onChange={onInputHandler}
                      onKeyPress={handleKeyPress}
                    />
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
                    <div
                      className={classNames({
                        justifyContent: "right",
                      })}
                    >
                      <Link
                        onClick={(event) => {
                          event.preventDefault();
                          return setFindPasswordOpen(true);
                        }}
                        component="button"
                        className={classes.link}
                        color="textPrimary"
                        classes={{
                          root: classNames({
                            textAlign: "right",
                          }),
                        }}
                      >
                        Did you forget password?
                      </Link>
                    </div>
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={onSubmitHandler}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </>
  );
};

Login.propTypes = {
  props: PropTypes.object,
  setAlertMsg: PropTypes.func,
  alerts: PropTypes.array,
  isAuth: PropTypes.bool,
  loginUser: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuth: state.auth.auth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlertMsg, loginUser })(Login);
