//이메일 인증 대기페이지
import React from 'react';
import { connect } from 'react-redux';

import clsx from 'clsx';

import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LevelupStyle';

const useStyles = makeStyles(styles);


export const EmailAuthWaiting = () => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthWaiting)
