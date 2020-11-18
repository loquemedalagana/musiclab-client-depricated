import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
//import {Redirect} from 'react-router-dom';
//import { List, ListItem } from '@material-ui/core';

//import fetcher from '../../../app/fetcher';
//import useSWR from 'swr';

import {
    GridContainer,
    //GridItem,
    //CircularLoading,
} from '../../../components/components';

import styles from "../../../assets/jss/material-kit-react/views/videoListStyle";
const useStyles = makeStyles(styles);

export const VideoListSection = props => {
    const {
        info,
        type,
    } = props;

    const classes = useStyles();

    

    console.log(type, info);



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
