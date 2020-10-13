import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const LoadingStyles = makeStyles( theme => ({ 
    root: {
        height: '100vh',
        display: 'block',
        alignContent: 'center',
        justifyContent: 'center',
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
        <Grid container className = {classes.root}>
            <CircularProgress value={progress}/>
        </Grid>
    )
}

export default CircularLoading