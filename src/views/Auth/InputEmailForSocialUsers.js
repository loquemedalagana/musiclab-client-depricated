import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { Email, Check } from "@material-ui/icons";

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
import { checkIsValidEmail } from "../../utils/variablesAndRegs";
import { checkValidEmail } from "../../utils/checkStringPatterns";
import { emailRegister } from "../../app/store/userValidation";
import { setAlertMsg } from "../../app/store/alert";
const useStyles = makeStyles(styles);

const inputhelper = `반드시 유효한 메일주소를 입력해주세요.`;

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
  const [emailSuccess, setEmailSuccess] = useState(false);

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
    if (!email) {
      ok = false;
      setAlertMsg("이메일을 입력해주세요", "error", "email");
      setEmailErr(true);
      setEmailSuccess(false);
    } else if (!checkValidEmail(email)) {
      ok = false;
      setAlertMsg("올바른 형식으로 입력해주세요.", "error", "email");
      setEmailErr(true);
      setEmailSuccess(false);
    }

    if (!isChecked) {
      ok = false;
      setAlertMsg("유의사항을 읽으신 후 체크해주세요", "error");
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

  if (isRegisteredEmail || isNotLoggedin) return <Redirect to="/" />;
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
                <p className={classes.divider}>{inputhelper}</p>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    error={emailErr}
                    success={emailSuccess}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "email",
                      name: "email",
                      value: email,
                      inputRef: inputRef.email,
                      onKeyPress: handleKeyPress,
                      onChange: onInputHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
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
                      label={checkIsValidEmail}
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
  isChanged: state.userValidation.changed,
});

export default connect(mapStateToProps, { setAlertMsg, emailRegister })(
  InputEmailForSocialUsers
);
