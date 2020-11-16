import React from 'react'
import { connect } from 'react-redux';
import fetcher from '../../app/fetcher';
import useSWR from 'swr';

import classNames from "classnames";
import {withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
//import clsx from 'clsx';

import { makeStyles } from "@material-ui/core/styles";
//import { List, ListItem } from '@material-ui/core';

import {
    Footer,
//    Button,
    GridContainer,
    GridItem,
    Parallax,
//    LinearLoading,
//    CircularLoading,
} from '../../components/components';

import {
    JeonInhyukBandChannelEndPoint,
} from '../../app/videoFetchEndpoints';

//import NotFound from '../Error/NotFound';

import defaultImg from '../../assets/images/dolphin_profile.png';

import styles from "../../assets/jss/material-kit-react/views/videoListStyle";
import { smallParallaxStyle } from '../../assets/jss/material-kit-react/views/background';
//import { getDateKor } from '../../utils/functions';

const useStyles = makeStyles(styles);

export const VideoPostList = props => {
    const {
        match,
        location,
    } = props;

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    
    console.log(match, location);

    //fetch data with get request
    console.log(JeonInhyukBandChannelEndPoint);
    const {data, error} = useSWR(JeonInhyukBandChannelEndPoint, fetcher);
    console.log(data, error);

    return (
        <>
        <Parallax small filter style={smallParallaxStyle().root} />        
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                {/*youtube channel profile*/}
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.channelProfile}>
                        <div>
                            <img src={defaultImg} alt="..." className={imageClasses} />
                        </div>
                        <div className={classes.channelTitle}>
                            <h3>channel title will be added</h3>

                        </div>
                        
                        <h5>channel description will be added</h5>
                    </div>
                </GridItem>
                </GridContainer>

                <GridContainer className={classes.listContainer}>
                    <p>
                        video list will be added here
                    </p>
                </GridContainer>

            </div>            
        
        </div>
        <Footer />
        </>
    )
}

VideoPostList.propTypes = {
    props: PropTypes.object
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(VideoPostList)
