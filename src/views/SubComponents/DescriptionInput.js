import React from "react";
import PropTypes from "prop-types";
import styles from "../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "../../components/components";
import { DESCRIPTION_HELP } from "../../app/helper/auth/helperTexts";
import { FormHelperText, InputAdornment } from "@material-ui/core";
import { MusicNote as MusicNoteIcon } from "@material-ui/icons";
import { DESCRIPTION_OVER_ERROR } from "../../app/helper/auth/authAlertMessages";

const useStyles = makeStyles(styles);

const DescriptionInput = (props) => {
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

  return (
    <>
      <CustomInput
        formHelperText={DESCRIPTION_HELP}
        id={isModal ? "modal-description" : "description"}
        formControlProps={{
          fullWidth: true,
        }}
        success={success}
        error={error}
        inputProps={{
          rows: "4",
          type: "text",
          multiline: true,
          name: "description",
          value,
          inputRef: inputRef.description,
          onKeyPress,
          onChange,
          endAdornment: (
            <InputAdornment position="end">
              <MusicNoteIcon className={classes.inputIconsColor} />
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText
        style={{ textAlign: "right" }}
        error={value.length > 200 || error}
      >
        {value.length > 200 ? DESCRIPTION_OVER_ERROR : value.length}
      </FormHelperText>
    </>
  );
};

DescriptionInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  isModal: PropTypes.bool,
};

export default DescriptionInput;
