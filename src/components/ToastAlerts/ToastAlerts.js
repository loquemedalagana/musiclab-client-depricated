import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Snackbar, Slide } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import styles from "../../assets/jss/material-kit-react/components/toastAlertStyle";
const useStyles = makeStyles(styles);

const Transition = (props) => <Slide {...props} direction="left" />;

const Toast = (props) => {
  const classes = useStyles();
  const { alertType, message } = props;

  return (
    <Snackbar
      open
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      TransitionComponent={Transition}
    >
      <Alert
        severity={alertType}
        variant="filled"
        classes={{
          root: classes.root + " " + classes[alertType],
          icon: classes.message,
          message: classes.message,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

Toast.propTypes = {
  message: PropTypes.node,
  alertType: PropTypes.string,
};

const ToastAlerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Toast key={alert.id} message={alert.message} alertType={alert.alertType} />
  ));

ToastAlerts.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(ToastAlerts);
