import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetcher from '../../../app/fetcher';
import useSWR from 'swr';
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";

import {
    GridContainer,
    GridItem,
    CircularLoading,
    Card,
} from '../../../components/components';

//import {MusicNoteRounded} from '@material-ui/icons';

import styles from '../../../assets/jss/material-kit-react/components/carouselStyle';
import { getPlayListURL, JeonInhyukBandPlayListEndPoint } from '../../../app/videoFetchEndpoints';

const useStyles = makeStyles(styles);

//print title
const printTitle = type => (<GridItem>
    <h2>{type}</h2>
</GridItem>)

const NotAvailable = () => (<GridItem>
    <h3>준비중입니다...</h3>
</GridItem>)

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

//carosel element component
const CaroselElement = props => {
    const {
        data,
    } = props;

    const {
        title,
        thumbnail
    } = data;

    //글자가 너무 길면 자르기

    return (
        <div>
            <img src={thumbnail} alt={title} className="slick-image" />
        </div>
    )
}


export const VideoCarouselSection = props => {
    const classes = useStyles();
    const {
        type, //jihbandoifficialchannel, musicsseolprisechannel, 
    } = props;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,

        responsive: [
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    
                }
            }
        ]
    }

    const playListId = getPlayListId(type);
    const ENDPOINT = getPlayListURL(playListId, 6);

    //get api
    const {data, error} = useSWR(playListId ? ENDPOINT : null, fetcher);
    //console.log(data, error);

    //get result data
    const resultData = data ? data.items.map(item => {        
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
                    
                    <GridItem>
                        <Card carousel>
                            <Slider {...settings}>
                            {resultData.map((item, key) => 
                                <CaroselElement key={key} data={item} />
                            )}
                            </Slider>
                        </Card>
                    </GridItem>

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
