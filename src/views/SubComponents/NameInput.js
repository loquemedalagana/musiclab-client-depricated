import React from "react";
import PropTypes from "prop-types";
import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "../../components/components";
import { InputAdornment } from "@material-ui/core";
import People from "@material-ui/icons/People";

const useStyles = makeStyles(styles);

const getId = (props) => {
  const { nameType, isModal } = props;
  switch (nameType) {
    case "familyName":
      return isModal ? "modal-family-name" : "family-name";
    case "givenName":
      return isModal ? "modal-given-name" : "given-name";
    default:
      return isModal ? "modal-display-name" : "display-name";
  }
};

const getLabelText = (props) => {
  const { nameType } = props;
  switch (nameType) {
    case "familyName":
      return "Family name(성)";
    case "givenName":
      return "Given name(이름)";
    default:
      return "Your displayname...";
  }
};

const NameInput = (props) => {
  const classes = useStyles();
  const {
    nameType,
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
      labelText={getLabelText({ nameType })}
      id={getId({ isModal, nameType })}
      success={success}
      error={error}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        type: "text",
        name: nameType,
        value,
        inputRef,
        onKeyPress,
        onChange,
        endAdornment: (
          <InputAdornment position="end">
            <People className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
  );
};

NameInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  isModal: PropTypes.bool,
  nameType: PropTypes.oneOf(["displayName", "familyName", "givenName"]),
};

export default NameInput;
