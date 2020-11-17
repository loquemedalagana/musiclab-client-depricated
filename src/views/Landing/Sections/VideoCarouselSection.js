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

//get title kor

export const VideoCarouselSection = props => {
    const classes = useStyles();

    const {
        type, //jihbandoifficialchannel, musicsseolprisechannel, 
    } = props;

    const playListId = getPlayListId(type);
    const ENDPOINT = getPlayListURL(playListId, 5);

    //get api
    const {data, error} = useSWR(ENDPOINT, fetcher);
    //console.log(data, error);

    //get result data
    const resultData = data ? data.items.map(item => {
        console.log(item.snippet);
        console.log(item.contentDetails);
    }) : [];


    //error component should be made 

    if(!data && !error && playListId) return <CircularLoading />

    return (
        <GridContainer>
            <h1>{type}</h1>
        </GridContainer>
    )
}

VideoCarouselSection.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(VideoCarouselSection)
