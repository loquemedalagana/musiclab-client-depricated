import React from "react";
import PropTypes from "prop-types";
import { CustomInput } from "../../../components/components";
import { InputAdornment } from "@material-ui/core";
import InputSocialIcon from "../../../components/SocialIcon/InputSocialIcon";
import { SOCIAL_NAME_LIST } from "../../../app/models/user/social";

const SocialInput = (props) => {
  const {
    snsType,
    success,
    error,
    value,
    inputRef,
    onChange,
    onKeyPress,
  } = props;

  return (
    <CustomInput
      labelText={`your ${snsType} account...`}
      id={snsType}
      error={error}
      success={success}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        type: "text",
        name: snsType,
        value,
        onChange,
        onKeyPress,
        inputRef,
        endAdornment: (
          <InputAdornment position="end">
            <InputSocialIcon snsType={snsType} />
          </InputAdornment>
        ),
      }}
    />
  );
};

SocialInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  isModal: PropTypes.bool,
  snsType: PropTypes.oneOf(SOCIAL_NAME_LIST),
};

export default SocialInput;
