import React from "react";
import PropTypes from "prop-types";
import styles from "../../../assets/jss/material-kit-react/views/LoginSignupStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const DisplayNameInput = (props) => {
  const classes = useStyles();
  const {
    success,
    error,
    value,
    inputRef,
    onChange,
    onKeyPress,
    isModal,
  } = props;
};

DisplayNameInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  isModal: PropTypes.bool,
};

export default DisplayNameInput;
