import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import CustomLinearProgress from '../CustomLinearProgress/CustomLinearProgress';

import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/LoginSignupStyle';

const useStyles = makeStyles(styles);

// const linearStyle = makeStyles({
//     root: {
//         width: '100%',
//     },
// });

const Loading = () => {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
            if (oldProgress === 100) {
                return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
            });
        }, 500);
    
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
            <CustomLinearProgress
                variant="determinate"
                color="info"
                value={progress}
            />
        </div>
    )
}

export default Loading;
