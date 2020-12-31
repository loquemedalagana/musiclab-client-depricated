import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FormHelperText } from "@material-ui/core";
import NoParallaxLayout from "../../Layouts/NoParallaxLayout";
import {
  GridItem,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
} from "../../components/components";

import EmailInput from "../../views/SubComponents/authAndProfile/EmailInput";
import CollectingPersonalInformationAggrement from "../../views/modals/auth/CollectingPersonalInformationAggrement";
import ModalOpenHelperText from "../../views/SubComponents/authAndProfile/ModalOpenHelperText";

import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import EmailValidation from "../../app/inputValidation/user/emailValidation";
import {
  CHECK_AGREEMENT_HELPER,
  INPUT_VALID_EMAIL,
} from "../../app/helper/auth/helperTexts";
import { emailRegister } from "../../app/store/userControl";
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

  const [viewAgreement, setViewAgreement] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedAgree, setCheckAgree] = useState(CHECK_AGREEMENT_HELPER);

  const handleModalOpen = (event) => {
    event.preventDefault();
    return setViewAgreement(true);
  };

  const [inputs, setInputs] = useState({
    email: "",
  });
  const inputRef = {
    email: useRef(),
    checkBox: useRef(),
  };

  const [emailErr, setEmailErr] = useState(false);
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
          return setViewAgreement(true);
        default:
          return onSubmitHandler(e);
      }
    }
  };

  if (isRegisteredEmail || isNotLoggedin) return <Redirect to="/" />;
  if (isChanged) return <Redirect to="/waitinglevelup" />;

  return (
    <>
      <CollectingPersonalInformationAggrement
        open={viewAgreement}
        onClose={() => setViewAgreement(false)}
        setCheckedAgreement={setIsChecked}
        setChangeHelperText={setCheckAgree}
      />
      <NoParallaxLayout>
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
                <ModalOpenHelperText
                  onClick={handleModalOpen}
                  innerText={checkedAgree}
                  isChecked={isChecked}
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
    </>
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
  isNotLoggedin: !state.user.auth,
  isRegisteredEmail: state.user.userData && state.user.userData.email,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps, { setAlertMsg, emailRegister })(
  InputEmailForSocialUsers
);
