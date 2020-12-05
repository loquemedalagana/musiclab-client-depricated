import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";

import fabButtonStyle from "../../assets/jss/material-kit-react/components/fabIconButtonStyle";

const makeComponentStyles = makeStyles(() => ({
  ...fabButtonStyle,
}));

const FabIconButton = (props) => {
  const {
    children,
    color,
    fixed,
    disabled,
    className,
    extended,
    label,
    size,
    position,
  } = props;

  const classes = makeComponentStyles();
  const fabClasses = classNames({
    [classes.fixPosition]: fixed,
    [className]: className,
    [classes.left]: position === "left",
    [classes.right]: position === "right",
    [classes.medium]: position === "medium",
  });

  return (
    <Fab
      className={fabClasses}
      color={color}
      disabled={disabled}
      variant={extended ? "extended" : "round"}
      size={size}
      area-label={label}
    >
      {children}
    </Fab>
  );
};

FabIconButton.propTypes = {
  fixed: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  position: PropTypes.oneOf(["left", "right", "midium"]),
  extended: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default FabIconButton;
