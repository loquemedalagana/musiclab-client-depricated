import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";

import PrintVideoCarousel from './PrintVideoCarousel';

import {
    GridContainer,
    GridItem,
    CircularLoading,
} from '../../../components/components';

//import {MusicNoteRounded} from '@material-ui/icons';

import styles from '../../../assets/jss/material-kit-react/components/carouselStyle';
import { 
    JeonInhyukBandPlayListId,
    getPlayListURL, 
    getLatestVideoListURL,
    getHotVideoListURL,
} from '../../../app/videoData/videoFetchEndpoints';

const useStyles = makeStyles(styles);

//print title
const printTitle = (categoryTitle, style) => (
    <GridItem xs={12} sm={12} md={11}>
        <h2 className={style}>{categoryTitle}</h2>
    </GridItem>
)

const NotAvailable = ({className}) => (
    <GridItem xs={12} sm={12} md={11}>
        <h3 className={className}>준비중입니다...</h3>
    </GridItem>
)

const getPlayListEndpoint = categoryTitle => {
    switch(categoryTitle){
        case 'Jeon Inhyuk Band Official Channel':
            return getPlayListURL(JeonInhyukBandPlayListId, 6);
        case 'Music SSeolprise by Jeon Inhyuk':
            return null;
        case 'Hot Videos of Inhyuk':
            return getHotVideoListURL([], 10);
        case 'Latest Videos of Inhyuk':
            return getLatestVideoListURL([], 10);
        default: 
            return null;
    }
}

//return channel detail link
const getChannelRoute = categoryTitle => {
    switch(categoryTitle){
        case 'Jeon Inhyuk Band Official Channel':
            return '/officialvideolist/jihbandofficial';
        case 'Music SSeolprise by Jeon Inhyuk':
            return null; //will be added
        case 'Hot Videos of Inhyuk':
        case 'Latest Videos of Inhyuk':
            return '/videolistbykeywords';
        default: //return search result
            return null;
    }
}

const getData = data => data ? data.items.map(item => {        
    return ({
        title: item.snippet.title.replace(/&#39;/g, ','),
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        videoId: item.contentDetails ? item.contentDetails.videoId : item.id.videoId,
    })
}) : [];

export const VideoCarouselSection = props => {
    const classes = useStyles();
    const {
        categoryTitle, 
    } = props;

    const ENDPOINT = getPlayListEndpoint(categoryTitle);
    const [resultData, setResultData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(ENDPOINT, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const result = getData(data);
            setResultData(result);
        })
        .catch(err => setError(err));
    }, [ENDPOINT]);

    //get result data

    console.log(resultData)

    if(!resultData && ENDPOINT) return <CircularLoading />

    if(!ENDPOINT || !resultData || error)  return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer justify='center'>
                    {printTitle(categoryTitle, classes.title)}
                    <NotAvailable className={classes.detail}/>                    
                </GridContainer>
            </div>
        </div>
    );

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer justify='center'>
                    {printTitle(categoryTitle, classes.title)}                    
                    <PrintVideoCarousel resultData={resultData} />
                    {/*채널 상세 페이지*/}
                    <GridItem xs={12} sm={12} md={11} style={{textAlign: 'right'}}>
                        <Link to = {getChannelRoute(categoryTitle)}>
                            <h5 className={classes.link}>
                            view more about {categoryTitle}...
                            </h5>
                        </Link>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

VideoCarouselSection.propTypes = {
    props: PropTypes.object,
}

export default React.memo(VideoCarouselSection)
