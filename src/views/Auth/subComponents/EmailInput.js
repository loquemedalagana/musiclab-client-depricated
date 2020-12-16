import React from "react";
import PropTypes from "prop-types";
import { InputAdornment } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "../../../components/components";
import styles from "../../../assets/jss/material-kit-react/views/LoginSignupStyle";

const useStyles = makeStyles(styles);

const EmailInput = (props) => {
  const classes = useStyles();
  const { success, error, value, inputRef, onChange, onKeyPress } = props;
  return (
    <CustomInput
      labelText="Email..."
      id="email"
      error={error}
      success={success}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        type: "email",
        name: "email",
        value,
        inputRef,
        onChange,
        onKeyPress,
        endAdornment: (
          <InputAdornment position="end">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
  );
};

EmailInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
};

export default EmailInput;
