import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from "classnames";

import {
    GridContainer,
    GridItem,
    //CircularLoading,
} from '../../../../components/components';

import studio1 from "../examples/studio-1.jpg";
import studio2 from "../examples/studio-2.jpg";
import studio4 from "../examples/studio-4.jpg";
import studio5 from "../examples/studio-5.jpg";

export const LikedVideos = props => {
    const {
        classes,
    } = props;

    const thumbnailListImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
                <img
                alt="..."
                src={studio1}
                className={thumbnailListImageClasses}
                />
                <img
                alt="..."
                src={studio2}
                className={thumbnailListImageClasses}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <img
                alt="..."
                src={studio5}
                className={thumbnailListImageClasses}
                />
                <img
                alt="..."
                src={studio4}
                className={thumbnailListImageClasses}
                />
            </GridItem>
        </GridContainer>
    )
}

LikedVideos.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedVideos)
