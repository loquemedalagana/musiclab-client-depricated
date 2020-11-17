import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetcher from '../../../app/fetcher';
import useSWR from 'swr';
import { makeStyles } from "@material-ui/core/styles";

import {
    GridContainer,
    GridItem,
    CircularLoading,
} from '../../../components/components';

import styles from '../../../assets/jss/material-kit-react/components/carouselStyle';
import { getPlayListURL, JeonInhyukBandPlayListEndPoint } from '../../../app/videoFetchEndpoints';

const useStyles = makeStyles(styles);

const getPlayListId = type => {
    switch(type){
        case 'Jeon Inhyuk Band Official Channel':
            return JeonInhyukBandPlayListEndPoint;
        case 'Music SSeolprise by Jeon Inhyuk':
            return null; //will be added
        default: //return search result
            return null;
    }
}

//print title
const printTitle = type => (<GridItem>
    <h2>{type}</h2>
</GridItem>)

const NotAvailable = () => (<GridItem>
    <h3>준비중입니다...</h3>
</GridItem>)

export const VideoCarouselSection = props => {
    const classes = useStyles();

    const {
        type, //jihbandoifficialchannel, musicsseolprisechannel, 
    } = props;

    const playListId = getPlayListId(type);
    const ENDPOINT = getPlayListURL(playListId, 5);

    //get api
    const {data, error} = useSWR(playListId ? ENDPOINT : null, fetcher);
    //console.log(data, error);

    //get result data
    const resultData = data ? data.items.map(item => {
        //console.log(item.snippet);
        //console.log(item.contentDetails);
        //console.log(item.snippet.thumbnails);
        
        return ({
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.high.url,
            videoId: item.contentDetails.videoId,
        })
    }) : [];

    console.log(resultData)

    //error component should be made 

    if(!data && !error && playListId) return <CircularLoading />

    if(!playListId)  return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer>
                    {printTitle(type)}
                    <NotAvailable />                    
                </GridContainer>
            </div>
        </div>
    );

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer>
                    {printTitle(type)}
                    

                </GridContainer>
            </div>
        </div>
    )
}

VideoCarouselSection.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(VideoCarouselSection)
