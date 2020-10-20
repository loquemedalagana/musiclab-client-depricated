import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import {
    Snackbar,
    //Slide
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import styles from "../../assets/jss/material-kit-react/components/toastAlertStyle";
const useStyles = makeStyles(styles);

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = props => {
    const classes = useStyles();
    const  {
        alertType,
        message
    } = props;


    return (
        <Snackbar 
            open
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'top'
            }}
        >
            <Alert 
                severity = {alertType}
                classes={{
                    root: classes.root + " " + classes[alertType],
                    icon: classes.message,
                    message: classes.message 
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

const ToastAlerts = ({alerts}) => (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Toast 
            key={alert.id}
            message = {alert.message}
            alertType={alert.alertType}
        />
    ))
)

const mapStateToProps = (state) => ({
    alerts: state.alert,
})


export default connect(mapStateToProps)(ToastAlerts)