import React from "react";
import PropTypes from "prop-types";
import styles from "../../../assets/jss/material-kit-react/views/LoginSignupStyle";
import { CardBody, CustomInput } from "../../../components/components";
import { InputAdornment } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const getId = (props) => {
  const { isModal, isConfirm } = props;

  if (isModal) {
    return isConfirm ? "modal-confirm-password" : "modal-password";
  } else {
    return isConfirm ? "confirm-password" : "password";
  }
};

const PasswordInput = (props) => {
  const classes = useStyles();
  const {
    isConfirm,
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
      labelText="Password"
      id={getId({ isConfirm, isModal })}
      success={success}
      error={error}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        type: "password",
        name: "password",
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
};

export default PasswordInput;
