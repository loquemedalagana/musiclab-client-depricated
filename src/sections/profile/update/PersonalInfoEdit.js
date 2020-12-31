import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { setAlertMsg } from "../../../app/store/alert";
import { updateUserProfile } from "../../../app/store/userControl";

import { Skeleton } from "@material-ui/lab";

import {
  GridContainer,
  GridItem,
  Button,
} from "../../../components/components";

import NameInput from "../../../SubComponents/authAndProfile/NameInput";
import DescriptionInput from "../../../SubComponents/authAndProfile/DescriptionInput";
import PasswordInput from "../../../SubComponents/authAndProfile/PasswordInput";

import NameValidation from "../../../app/inputValidation/user/NameValidation";
import PasswordValidation from "../../../app/inputValidation/user/passwordValidation";

import defaultImg from "../../../assets/images/dolphin_profile.png";
import { PROFILE_PHOTO_SERVER_ERROR } from "../../../app/helper/auth/authAlertMessages";

export const PersonalInfoEdit = (props) => {
  const {
    classes,
    setAlertMsg,
    updateUserProfile,
    userInfo,
    loading,
    isChanged,
  } = props;

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgRoundedCircleHover,
    classes.imgFluid,
    classes.imgCursor
  );

  const [profileImg, setProfileImg] = useState(
    userInfo ? (userInfo.image ? userInfo.image : defaultImg) : defaultImg
  );

  const [inputs, setInputs] = useState({
    displayName: userInfo ? userInfo.displayName : "",
    description: userInfo ? userInfo.description : "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //console.log(inputs);

  const {
    displayName,
    description,
    password,
    newPassword,
    confirmNewPassword,
  } = inputs;

  const inputRef = {
    displayName: useRef(),
    description: useRef(),
    password: useRef(),
    newPassword: useRef(),
    confirmNewPassword: useRef(),
  };

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]:
        name === "description" && value.length > 200
          ? value.substr(0, 200)
          : value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "displayName":
        case "description":
          return inputRef.password.current.focus();
        case "newPassword":
          return inputRef.confirmNewPassword.current.focus();
        default:
          return onSubmitHandler(e);
      }
    }
  };

  const onImgInputHandler = async (file) => {
    const imgData = new FormData();
    imgData.append("image", file);

    //console.log(imgData, file);
    const userId = userInfo.id;

    const ENDPOINT =
      process.env.REACT_APP_SERVERURL +
      `/api/user/update/profile/image/?userid=${userId}`;
    //console.log(ENDPOINT);

    try {
      const request = await fetch(ENDPOINT, {
        method: "PATCH",
        body: imgData,
      });

      if (request.ok) {
        const response = await request.json();
        //console.log(response);
        if (response.success) {
          setAlertMsg(response.message, "success");
          setProfileImg(response.newImg);
        } else {
          setAlertMsg(PROFILE_PHOTO_SERVER_ERROR, "error");
        }
      }
    } catch (err) {
      console.log(err);
      setAlertMsg(PROFILE_PHOTO_SERVER_ERROR, "error");
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let ok = true;
    const displayNameCheck = new NameValidation({ name: displayName });
    const newPasswordValidation = new PasswordValidation({
      password: newPassword,
      confirmPassword: confirmNewPassword,
    });

    if (description && description.length > 200) {
      ok = false;
    }

    if (!displayNameCheck.getResult().ok) {
      ok = false;
      setAlertMsg(displayNameCheck.getResult().message, "error");
    }

    if (newPassword && !newPasswordValidation.getResult().ok) {
      ok = false;
      setAlertMsg(newPasswordValidation.getResult().message, "error");
    }

    if (!password) {
      ok = false;
      setAlertMsg("기존 비밀번호를 입력해주세요.", "error");
    }

    if (ok) {
      updateUserProfile(inputs);
    }
  };

  if (isChanged || loading) return <Skeleton animation="wave" />;

  return (
    <div className={classes.tabBody}>
      <GridContainer
        justify="center"
        alignContent="flex-end"
        alignItems="flex-end"
        style={{
          paddingBottom: "20px",
        }}
      >
        <GridItem
          xs={12}
          sm={12}
          md={6}
          style={{
            textAlign: "center",
          }}
        >
          <label htmlFor="profile-picture">
            <img src={profileImg} className={imageClasses} alt={displayName} />
          </label>

          <input
            type="file"
            name="profileImg"
            id="profile-picture"
            accept="image/jpeg, image/png"
            onChange={(e) =>
              onImgInputHandler(e.target.files ? e.target.files[0] : profileImg)
            }
            style={{
              display: "none",
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <NameInput
            nameType="displayName"
            value={displayName}
            onChange={onInputHandler}
            inputRef={inputRef.displayName}
            onKeyPress={handleKeyPress}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <DescriptionInput
            value={description}
            onChange={onInputHandler}
            inputRef={inputRef.description}
            onKeyPress={handleKeyPress}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        {[
          { name: "password", value: password, isCurrentPassword: true },
          { name: "newPassword", value: newPassword, isNewPassword: true },
          {
            name: "confirmNewPassword",
            value: confirmNewPassword,
            isNewPassword: true,
            isConfirm: true,
          },
        ].map(
          (
            { name, value, isCurrentPassword, isNewPassword, isConfirm },
            key
          ) => (
            <GridItem xs={12} sm={12} md={12} key={key}>
              <PasswordInput
                value={value}
                isCurrentPassword={isCurrentPassword}
                isNewPassword={isNewPassword}
                isConfirm={isConfirm}
                inputRef={inputRef[name]}
                onChange={onInputHandler}
                onKeyPress={handleKeyPress}
              />
            </GridItem>
          )
        )}
      </GridContainer>

      <GridContainer className={classes.cardFooter} direction="row-reverse">
        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
          Submit
        </Button>
      </GridContainer>
    </div>
  );
};

PersonalInfoEdit.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setAlertMsg: PropTypes.func,
  updateUserProfile: PropTypes.func,
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  isChanged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  userInfo: state.user.userData,
  isChanged: state.userControl.changed,
});

export default connect(mapStateToProps, { setAlertMsg, updateUserProfile })(
  PersonalInfoEdit
);
