import React from 'react'
import { connect } from 'react-redux';
import fetcher from '../../app/fetcher';
import useSWR from 'swr';

import classNames from "classnames";
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import VideoListSection from './Sections/VideoListSection';

import { makeStyles } from "@material-ui/core/styles";


import {
    Footer,
//    Button,
    GridContainer,
    GridItem,
    Parallax,
    LinearLoading,
//    CircularLoading,
} from '../../components/components';

import {
    channelDataHashMap,
} from './videoDataMapping';

import defaultImg from '../../assets/images/dolphin_profile.png';

import styles from "../../assets/jss/material-kit-react/views/videoListStyle";
import { smallParallaxStyle } from '../../assets/jss/material-kit-react/views/background';

const useStyles = makeStyles(styles);

//http://localhost:3000/officialvideolist/jihbandofficial

export const VideoListByChannel = props => {
    const {
        match,
        location,
    } = props;
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const channelName = match.params.channel;

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    
    console.log(channelName, query);

    //fetch data with get request
    const {data, error} = useSWR(channelDataHashMap[channelName], fetcher);
    console.log(data, error);

    //get data in detail
    const resultChannelData = data ? data.items.map(item => {
        console.log(item.snippet.title);
        console.log(item.contentDetails);
        return ({
            title: item.snippet.title,
            description: item.snippet.description,
            contentDetail: item.contentDetails, 
            mediumImg: item.snippet.thumbnails.medium.url,
            highImg: item.snippet.thumbnails.high.url
        })
    }) : [];

    //console.log(resultChannelData);
    const [channelInfo] = resultChannelData;
    console.log(channelInfo)

    if(!data && !error && channelDataHashMap[channelName]) return <LinearLoading />;
    if(error || !channelDataHashMap[channelName])  return <Redirect to = "/notfound" />;

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
                            <img 
                                src={channelInfo.mediumImg ? channelInfo.mediumImg : defaultImg} 
                                alt="..." 
                                className={imageClasses} 
                            />
                        </div>
                        <div className={classes.channelTitle}>
                            <h3>{channelInfo.title}</h3>
                        </div>                        
                        <h5>{channelInfo.description}</h5>
                    </div>
                </GridItem>
                </GridContainer>

                <VideoListSection type='channel' info={channelInfo.contentDetail} />

            </div>            
        
        </div>
        <Footer />
        </>
    )
}

VideoListByChannel.propTypes = {
    props: PropTypes.object
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(VideoListByChannel)
