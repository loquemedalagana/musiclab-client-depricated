import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import styles from "../../assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formHelperText,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  let formControlClasses;
  if (formControlProps !== undefined) {
    if (formHelperText !== undefined) {
      formControlClasses = classNames(
        formControlProps.className,
        classes.formControlWithText
      );
    } else {
      formControlClasses = classNames(
        formControlProps.className,
        classes.formControl
      );
    }
  } else {
    formControlClasses =
      formHelperText !== undefined
        ? classes.formControlWithText
        : classes.formControl;
  }
  return (
    <>
      {formHelperText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {formHelperText}
        </InputLabel>
      ) : null}
      <FormControl {...formControlProps} className={formControlClasses}>
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Input
          className="scrollbar-rainy-ashville"
          classes={{
            input: `${inputClasses} scrollbar-lady-lips`,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses,
          }}
          id={id}
          {...inputProps}
        />
      </FormControl>
    </>
  );
}

CustomInput.propTypes = {
  formHelperText: PropTypes.string,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  onChange: PropTypes.func,
};
