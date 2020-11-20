import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    GridContainer,

} from '../components';

const LoadingStyles = makeStyles( theme => ({ 
    root: {
        height: '100vh',
        display: 'block',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const CircularLoading = () => { 
    const classes = LoadingStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <GridContainer 
            className = {classes.root}
            alignItems = 'center'
            alignContent = 'center'
            justify = 'center'
        >
            <CircularProgress value={progress}/>
        </GridContainer>
    )
}

export default CircularLoading