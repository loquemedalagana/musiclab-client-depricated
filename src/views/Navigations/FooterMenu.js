import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/material-kit-react/views/navigations/footerMenuStyle";

const useStyles = makeStyles(styles);

const FooterMenu = (props) => {
  const classes = useStyles();
  const { curUserData } = props;

  const footerMenuClasses = classNames({
    [classes.wrapper]: true,
    [classes.fixed]: true,
  });

  return curUserData.points >= 0 ? (
    <div className={footerMenuClasses}>hello world</div>
  ) : null;
};

FooterMenu.propTypes = {
  curUserData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(FooterMenu);
