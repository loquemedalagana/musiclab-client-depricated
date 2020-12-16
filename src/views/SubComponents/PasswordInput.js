import React from "react";
import PropTypes from "prop-types";
import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import { CustomInput } from "../../components/components";
import { InputAdornment } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const getId = (props) => {
  const { isModal, isConfirm, isNewPassword } = props;
  if (isModal) {
    if (isNewPassword)
      return isConfirm ? "modal-confirm-new-password" : "modal-new-password";
    return isConfirm ? "modal-confirm-password" : "modal-password";
  } else {
    if (isNewPassword)
      return isConfirm ? "confirm-new-password" : "new-password";
    return isConfirm ? "confirm-password" : "password";
  }
};

const getLabelText = (props) => {
  const { isNewPassword, isConfirm, isCurrentPassword } = props;
  if (isCurrentPassword) return "Current Password";

  if (isNewPassword) {
    return isConfirm ? "Confirm New Password" : "New Password";
  } else {
    return isConfirm ? "Confirm Password" : "Password";
  }
};

const getName = (props) => {
  const { isNewPassword, isConfirm } = props;
  if (isNewPassword) {
    return isConfirm ? "confirmNewPassword" : "newPassword";
  } else {
    return isConfirm ? "confirmPassword" : "password";
  }
};

const PasswordInput = (props) => {
  const classes = useStyles();
  const {
    isConfirm,
    isCurrentPassword,
    isNewPassword,
    success,
    error,
    value,
    inputRef,
    onChange,
    onKeyPress,
    isModal,
  } = props;

  return (
    <CustomInput
      labelText={getLabelText({ isConfirm, isNewPassword, isCurrentPassword })}
      id={getId({ isConfirm, isModal, isNewPassword })}
      success={success}
      error={error}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        type: "password",
        name: getName({ isNewPassword, isConfirm }),
        value,
        inputRef,
        onChange,
        onKeyPress,
        endAdornment: (
          <InputAdornment position="end">
            <VpnKeyIcon className={classes.inputIconsColor} />
          </InputAdornment>
        ),
        autoComplete: "off",
      }}
    />
  );
};

PasswordInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  isModal: PropTypes.bool,
  isConfirm: PropTypes.bool,
  isNewPassword: PropTypes.bool,
  isCurrentPassword: PropTypes.bool,
};

export default PasswordInput;
