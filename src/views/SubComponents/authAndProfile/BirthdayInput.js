import React from "react";
import PropTypes from "prop-types";
import { DateTimePicker } from "../../../components/components";

const BirthdayInput = (props) => {
  const { success, error, value, inputRef, onChange, onClick, isModal } = props;

  return (
    <DateTimePicker
      formControlProps={{
        fullWidth: true,
      }}
      id={isModal ? "modal-birthday" : "birthday"}
      success={success}
      error={error}
      labelText="Your birthday(생년월일)"
      inputProps={{
        dateFormat: true,
        timeFormat: false,
        placeholder: "Pick your birthday!",
        name: "birthday",
        value,
        ref: inputRef,
        onClick,
        onChange,
      }}
    />
  );
};

BirthdayInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.any,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isModal: PropTypes.bool,
};

export default BirthdayInput;
