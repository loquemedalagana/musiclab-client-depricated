import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import {
    Check,
    Warning,
    NotificationImportant,
    ErrorOutline,
} from "@material-ui/icons";

import styles from "../../assets/jss/material-kit-react/components/toastAlertStyle";
const useStyles = makeStyles(styles);

const getIcon = type => {
    switch(type){
        case 'success':
            return <Check />;
        case 'error':
        case 'danger':
            return <ErrorOutline />;
        case 'info':
            return <NotificationImportant />;
        case 'warning':
            return <Warning />;
        default:
            return null;
    }
}

const Toast = props => {
    const classes = useStyles();
    const  {
        alertType,
        message
    } = props;

    const alertIcon = getIcon(alertType);

    return (
        <div
            style={{
                flexDirection: 'row',
                zIndex: '20'
            }}
            className = {clsx(classes[alertType])} 
            variant='filled'
            >
            <h4>{message}</h4>
        </div>
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