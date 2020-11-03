import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
// core components
import styles from "../../assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function DateTimePicker(props){
    const {
        formControlProps,
        id,
        success,
        error,
        labelText,

        inputProps,
        labelProps,
    } = props;
    const classes = useStyles();

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });

    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.formControlWithText
        );
    } else {
        formControlClasses = classes.formControlWithText;
    }

    return (
        <>
        {labelText !== undefined ? (
            <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            {...labelProps}
            >
            {labelText}
            </InputLabel>
        ) : null}
        <FormControl {...formControlProps} className={formControlClasses}>
            <Datetime
            {...inputProps}
            />
        </FormControl>
        </>
    );
}

DateTimePicker.propTypes = {
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
}

//https://www.npmjs.com/package/react-datetime