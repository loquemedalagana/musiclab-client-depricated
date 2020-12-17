import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserSocial } from "../../../../app/store/userValidationAndUpdate";
import { setAlertMsg } from "../../../../app/store/alert";

import {
  GridContainer,
  Button,
  CircularLoading,
  GridItem,
} from "../../../../components/components";

import SocialInput from "../../../SubComponents/authAndProfile/SocialInput";

import { SOCIAL_NULL_ERROR } from "../../../../app/helper/auth/authAlertMessages";
import { checkSnsLink } from "../../../../app/inputValidation/user/snsLinkValidation";

export const SnsInfoEdit = (props) => {
  const {
    setAlertMsg,
    updateUserSocial,
    classes,
    userInfo,
    loading,
    isChanged,
  } = props;

  const [inputs, setInputs] = useState({
    blog: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    soundcloud: "",
  });

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        default:
          return onSubmitHandler(e);
      }
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const errorMessages = [];
    let isChanged = false;

    const ok = () => {
      for (const key in inputs) {
        if (inputs[key].length > 0) isChanged = true;
        if (
          inputs[key] &&
          !checkSnsLink(key, inputs[key]) &&
          key !== "password"
        ) {
          errorMessages.push(`올바르지 않은 ${key}주소 형식입니다.`);
          return false;
        }
      }
      return true;
    };

    if (ok()) {
      return isChanged
        ? //  ? updateUserSocial(inputs)
          console.log(inputs)
        : setAlertMsg(SOCIAL_NULL_ERROR, "error");
    }

    console.log(errorMessages);
    errorMessages.forEach((msg) => setAlertMsg(msg, "error"));
  };

  if (userInfo && userInfo.social) {
    //console.log(JSON.stringify(userInfo.social));
  }

  if (isChanged || loading) return <CircularLoading />;

  return (
    <div className={classes.tabBody}>
      <GridContainer>
        {Object.keys(inputs).map((snsType, key) => (
          <GridItem key={key}>
            <SocialInput
              snsType={snsType}
              value={inputs[snsType]}
              onChange={onInputHandler}
              onKeyPress={handleKeyPress}
            />
          </GridItem>
        ))}
      </GridContainer>

      <GridContainer
        className={classes.cardFooter}
        justify="space-between"
        direction="row-reverse"
      >
        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
          Submit
        </Button>
      </GridContainer>
    </div>
  );
};

SnsInfoEdit.propTypes = {
  setAlertMsg: PropTypes.func,
  updateUserSocial: PropTypes.func,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  userInfo: state.auth.userData,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps, { setAlertMsg, updateUserSocial })(
  SnsInfoEdit
);
