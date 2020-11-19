import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import classNames from "classnames";
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import VideoListSection from './Sections/VideoListSection';

import { makeStyles } from "@material-ui/core/styles";

import {
    Footer,
    GridContainer,
    GridItem,
    Parallax,
    LinearLoading,
} from '../../components/components';

import {
    channelDataHashMap,
} from '../../app/videoData/getVideoData';

import defaultImg from '../../assets/images/dolphin_profile.png';

import styles from "../../assets/jss/material-kit-react/views/videoListStyle";
import { smallParallaxStyle } from '../../assets/jss/material-kit-react/views/background';

const useStyles = makeStyles(styles);

//http://localhost:3000/officialvideolist/jihbandofficial

const getData = data => data ? data.items.map(item => {
    console.log(item.snippet.title);
    console.log(item.contentDetails);
    console.log(item.snippet.thumbnails);
    return ({
        title: item.snippet.title,
        description: item.snippet.description,
        contentDetail: item.contentDetails, 
        mediumImg: item.snippet.thumbnails.medium.url,
        highImg: item.snippet.thumbnails.high.url
    })
}) : [];

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
    const ENDPOINT = channelDataHashMap[channelName];
    const [resultChannelData, setResultChannelData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(ENDPOINT, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const result = getData(data);
            setResultChannelData(result);
        })
        .catch(err => setError(err));
    }, [ENDPOINT]);

    console.log(resultChannelData);

    if(!resultChannelData && channelDataHashMap[channelName]) return <LinearLoading />;
    if(error || !channelDataHashMap[channelName])  return <Redirect to = "/notfound" />;

    return (
        <>
        <Parallax small filter style={smallParallaxStyle().root} />        
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                {resultChannelData.map((channelInfo, idx) => 
                    <div key = {idx}>
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
                )}
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


export default connect(mapStateToProps)(React.memo(VideoListByChannel))
