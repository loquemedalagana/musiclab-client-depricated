import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { setAlertMsg } from "../../../../app/store/alert";
import { updateUserProfile } from "../../../../app/store/userValidationAndUpdate";

import { VpnKey as VpnKeyIcon, MusicNote, People } from "@material-ui/icons";

import { InputAdornment, FormHelperText } from "@material-ui/core";

import {
  GridContainer,
  GridItem,
  CustomInput,
  Button,
  CircularLoading,
} from "../../../../components/components";

import defaultImg from "../../../../assets/images/dolphin_profile.png";
import { camelToSpace } from "../../../../app/utils/functions";
import {
  DESCRIPTION_OVER_ERROR,
  PROFILE_PHOTO_SERVER_ERROR,
} from "../../../../app/helper/auth/authAlertMessages";
import { DESCRIPTION_HELP } from "../../../../app/helper/auth/helperTexts";

const passReg = /(Password)/i;

const getIcon = (key, iconClass) => {
  if (passReg.test(key)) return <VpnKeyIcon className={iconClass} />;
  else if (key === "displayName") return <People className={iconClass} />;
  else if (key === "description") return <MusicNote className={iconClass} />;
};

const DisplayNameInput = (inputs, onInputHandler, iconClass) => {
  const data = Object.keys(inputs).map((key) => {
    if (passReg.test(key) || key !== "displayName") return null;
    return (
      <CustomInput
        labelText={`your new nickname...`}
        key={key}
        id={key}
        error={null}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          rows: "4",
          type: "text",
          name: key,
          value: inputs[key],
          onChange: onInputHandler,
          endAdornment: (
            <InputAdornment position="end">
              {getIcon(key, iconClass)}
            </InputAdornment>
          ),
        }}
      />
    );
  });

  return (
    <GridItem xs={12} sm={12} md={6}>
      {data}
    </GridItem>
  );
};

const DescriptionInput = (inputs, onInputHandler, iconClass) => {
  const data = Object.keys(inputs).map((key) => {
    if (passReg.test(key) || key !== "description") return null;

    return (
      <GridItem xs={12} sm={12} md={12} key={key}>
        <CustomInput
          labelText={DESCRIPTION_HELP}
          id={key}
          error={null}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            rows: "5",
            type: "text",
            multiline: true,
            name: key,
            value: inputs[key],
            onChange: onInputHandler,
            endAdornment: (
              <InputAdornment position="end">
                {getIcon(key, iconClass)}
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText
          style={{ textAlign: "right" }}
          error={inputs[key].length >= 200}
        >
          {inputs[key].length >= 200
            ? DESCRIPTION_OVER_ERROR
            : inputs[key].length}
        </FormHelperText>
      </GridItem>
    );
  });

  return data;
};

const PasswordInputs = (inputs, onInputHandler, iconClass) => {
  const data = Object.keys(inputs).map((key) => {
    if (!passReg.test(key)) return null;
    return (
      <CustomInput
        labelText={`${camelToSpace(key)}...`}
        key={key}
        id={key}
        error={null}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "password",
          name: key,
          value: inputs[key],
          onChange: onInputHandler,
          endAdornment: (
            <InputAdornment position="end">
              {getIcon(key, iconClass)}
            </InputAdornment>
          ),
        }}
      />
    );
  });

  return (
    <GridItem xs={12} sm={12} md={12}>
      {data}
    </GridItem>
  );
};

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
    userInfo.image ? userInfo.image : defaultImg
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

  const onImgInputHandler = async (file) => {
    const imgData = new FormData();
    imgData.append("image", file);

    //console.log(imgData, file);
    const userId = userInfo._id;

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

    if (displayName) {
    }

    if (description && description.length > 200) {
      ok = false;
    }

    if (!password) {
    }

    if (newPassword) {
    }

    if (ok) {
      updateUserProfile(inputs);
    }
  };

  if (isChanged || loading) return <CircularLoading />;

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
        {DisplayNameInput(inputs, onInputHandler, classes.inputIconsColor)}
      </GridContainer>

      <GridContainer>
        {DescriptionInput(inputs, onInputHandler, classes.inputIconsColor)}
      </GridContainer>

      <GridContainer>
        {PasswordInputs(inputs, onInputHandler, classes.inputIconsColor)}
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
  loading: state.auth.loading,
  userInfo: state.auth.userData,
  isChanged: state.userValidationAndUpdate.changed,
});

export default connect(mapStateToProps, { setAlertMsg, updateUserProfile })(
  PersonalInfoEdit
);
