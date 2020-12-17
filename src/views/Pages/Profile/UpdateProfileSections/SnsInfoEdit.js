import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserSocial } from "../../../../app/store/userValidationAndUpdate";
import { setAlertMsg } from "../../../../app/store/alert";

import {
  GridContainer,
  Button,
  CircularLoading,
  CustomInput,
  GridItem,
} from "../../../../components/components";

import { InputAdornment } from "@material-ui/core";

import {
  Home as Blog,
  Twitter,
  Facebook,
  Instagram,
  YouTube,
  Cloud as SoundCloud,
} from "@material-ui/icons";

import { SOCIAL_NULL_ERROR } from "../../../../app/helper/auth/authAlertMessages";
import { checkSnsLink } from "../../../../app/helper/auth/social";

const SocialInputs = (inputs, onInputHandler, iconClass) => {
  const getIcon = (key) => {
    switch (key) {
      case "youtube":
        return <YouTube className={iconClass} />;
      case "facebook":
        return <Facebook className={iconClass} />;
      case "twitter":
        return <Twitter className={iconClass} />;
      case "instagram":
        return <Instagram className={iconClass} />;
      case "soundcloud":
        return <SoundCloud className={iconClass} />;
      default:
        return <Blog className={iconClass} />;
    }
  };

  const data = Object.keys(inputs).map((key) => {
    if (key === "password") return null;
    return (
      <GridItem key={key}>
        <CustomInput
          labelText={`your ${key} account...`}
          id={key}
          error={null}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            name: key,
            value: inputs[key],
            onChange: onInputHandler,
            endAdornment: (
              <InputAdornment position="end">{getIcon(key)}</InputAdornment>
            ),
          }}
        />
      </GridItem>
    );
  });

  return data;
};

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
        ? updateUserSocial(inputs)
        : setAlertMsg(SOCIAL_NULL_ERROR, "error");
    }

    console.log(errorMessages);
    errorMessages.forEach((msg) => setAlertMsg(msg, "error"));
  };

  //console.log(inputs);

  if (userInfo && userInfo.social) {
    //console.log(JSON.stringify(userInfo.social));
  }

  if (isChanged || loading) return <CircularLoading />;

  return (
    <div className={classes.tabBody}>
      <GridContainer>
        {SocialInputs(inputs, onInputHandler, classes.inputIconsColor)}
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
