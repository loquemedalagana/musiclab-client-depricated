import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
//import {Redirect} from 'react-router-dom';
//import { List, ListItem } from '@material-ui/core';

import {
    GridContainer,
    GridItem,
    CircularLoading,
} from '../../../components/components';

import { 
    getPlayListURL, 
} from '../../../app/videoData/videoFetchEndpoints';

import styles from "../../../assets/jss/material-kit-react/views/videoListStyle";
const useStyles = makeStyles(styles);

const getData = data => data ? data.items.map(item => {        
    return ({
        title: item.snippet.title.replace(/&#39;/g, ','),
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        videoId: item.contentDetails ? item.contentDetails.videoId : item.id.videoId,
    })
}) : [];

const NotAvailable = ({className}) => (
    <GridItem xs={12} sm={12} md={11}>
        <h3 className={className}>준비중입니다...</h3>
    </GridItem>
)

export const VideoListSection = props => {
    const {
        videoListId,
        type,
    } = props;

    const classes = useStyles();
    const [resultData, setResultData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const ENDPOINT = type === 'channel' ? getPlayListURL(videoListId, 6) : null;

    console.log(videoListId);

    useEffect(() => {
        fetch(ENDPOINT, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const result = getData(data);            
            setLoading(false);
            setResultData(result);
        })
        .catch(err => {
            setLoading(false);
            setError(err);
        });
    }, [ENDPOINT, type, videoListId]);

    //get result data

    console.log(resultData)

    if(!resultData && ENDPOINT && loading) return (
        <div className={classes.section}>
            <div className={classes.container}>
                <CircularLoading />
            </div>
        </div>
    );

    if(!ENDPOINT || error)  return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer justify='center'>
                    <NotAvailable className={classes.detail}/>                    
                </GridContainer>
            </div>
        </div>
    );


    return (
        <GridContainer className={classes.listContainer}>
            <h5>list will be added</h5>
        </GridContainer>
    )
}

VideoListSection.propTypes = {
    props: PropTypes.object,

}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(VideoListSection)
