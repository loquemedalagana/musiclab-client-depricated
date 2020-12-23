import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "@material-ui/core";

import styles from "../../../assets/jss/material-kit-react/views/pages/noParallax/AuthGeneralStyle";

const useStyles = makeStyles(styles);
const ModalOpenHelperText = (props) => {
  const classes = useStyles();
  const { onClick, innerText } = props;

  return (
    <div
      className={classNames({
        justifyContent: "right",
        textAlign: "right",
      })}
    >
      <Link
        onClick={onClick}
        component="button"
        className={classes.link}
        color="textPrimary"
        classes={{
          button: classNames({
            textAlign: "right",
          }),
        }}
      >
        {innerText}
      </Link>
    </div>
  );
};

ModalOpenHelperText.propTypes = {
  innerText: PropTypes.string,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default ModalOpenHelperText;
