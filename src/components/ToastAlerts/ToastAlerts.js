import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import {
    Check,
    Warning,
    NotificationImportant,
    ErrorOutline,
} from "@material-ui/icons";

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

const ToastAlerts = ({alerts}) => (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div 
            style={{
                flexDirection: 'row',
                zIndex: '20'
            }}
            key={alert.id} 
            severity = {alert.alertType} 
            className = {null} 
            variant='filled'
        >
            <h4>{alert.message}</h4>
        </div>
    ))
)

const mapStateToProps = (state) => ({
    alerts: state.alert,
})


export default connect(mapStateToProps)(ToastAlerts)