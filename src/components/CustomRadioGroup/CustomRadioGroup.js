import React from "react";
import PropTypes from "prop-types";

import {
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord } from "@material-ui/icons";

import styles from "../../assets/jss/material-kit-react/components/customCheckboxRadioSwitch";

const useStyles = makeStyles(styles);

const RadioForm = (props) => {
  const classes = useStyles();
  const { selectItem } = props;
  const { key, value } = selectItem;

  return (
    <div
      className={
        classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
      }
    >
      <FormControlLabel
        control={
          <Radio
            value={key}
            aria-label={key}
            icon={<FiberManualRecord className={classes.radioUnchecked} />}
            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
            classes={{
              checked: classes.radio,
              root: classes.radioRoot,
            }}
          />
        }
        classes={{
          label: classes.label,
          root: classes.labelRoot,
        }}
        label={value}
      />
    </div>
  );
};

RadioForm.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  selectItem: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
};

const CustomRadioGroup = (props) => {
  const { title, onChange, value, selectItems, name, ...rest } = props;
  return (
    <FormControl component="fieldset" {...rest}>
      <FormLabel component="h3">{title}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange}>
        {selectItems.map((selectItem, idx) => (
          <RadioForm key={idx} selectItem={selectItem} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

CustomRadioGroup.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  selectItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default CustomRadioGroup;
