import React from "react";
import { CustomSelectInput } from "../../../components/components";
import PropTypes from "prop-types";

const GenderInput = (props) => {
  const { success, error, value, inputRef, onChange, onClick } = props;
  return (
    <CustomSelectInput
      labelText="Gender(성별)"
      labelId="select-gender"
      id="gender-select"
      success={success}
      error={error}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        varient: "filled",
        name: "gender",
        value,
        inputRef,
        onClick,
        onChange,
      }}
      menuItemList={[
        { key: 1, value: "male", label: "Male(남성)" },
        { key: 2, value: "female", label: "Female(여성)" },
      ]}
    />
  );
};

GenderInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default GenderInput;
