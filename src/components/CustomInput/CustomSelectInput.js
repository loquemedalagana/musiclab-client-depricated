import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    FormControl, InputLabel, Select, MenuItem
} from "@material-ui/core";

import styles from "../../assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomSelectInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        white,
        inputRootCustomClasses,
        success,
        onChange,
        menuItemList,
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });
    const marginTop = classNames({
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = classNames({
        [classes.input]: true,
        [classes.whiteInput]: white
    });
    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
        formControlProps.className,
        classes.formControl
        );
    } else {
        formControlClasses = classes.formControl;
    }
    return (
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

        <Select
            classes={{
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses
            }}
            labelId={id}
            id={id}
            onChange={onChange}
            {...inputProps}
        >   
        {
            menuItemList.map(({key, value}) => (
                <MenuItem key = {key} value={key}>{
                    value
                }</MenuItem>
            ))
        }

        </Select>
        </FormControl>
    );
}

CustomSelectInput.propTypes = {
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
    menuItemList: PropTypes.array,
};