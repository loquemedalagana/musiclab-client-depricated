import React from 'react';
import clsx from 'clsx';

import {loginSignupUpdateStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LevelupStyle';

const useStyles = makeStyles(styles);

function NotFound() {
    const classes = useStyles();
    return (
        <div className={clsx(classes.pageHeader, loginSignupUpdateStyle().root)}>
            
        </div>
    )
}

export default NotFound
