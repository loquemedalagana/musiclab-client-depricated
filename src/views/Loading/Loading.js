import React from 'react';
import clsx from 'clsx';

import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

const useStyles = makeStyles(styles);

const Loading = () => {
    const classes = useStyles();
    
    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            
        </div>
    )
}

export default Loading;
