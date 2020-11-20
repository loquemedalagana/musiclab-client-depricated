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
import studio3 from "../examples/studio-3.jpg";
import work1 from "../examples/olu-eletu.jpg";
import work2 from "../examples/clem-onojeghuo.jpg";
import work4 from "../examples/mariya-georgieva.jpg";

export const UserPostList = props => {
    const {
        classes,
    } = props;

    const thumbnailListImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    return (
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
            <img
            alt="..."
            src={work4}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={studio3}
            className={thumbnailListImageClasses}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
            <img
            alt="..."
            src={work2}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={work1}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={studio1}
            className={thumbnailListImageClasses}
            />
        </GridItem>
        </GridContainer>
    )
}

UserPostList.propTypes = {
    props: PropTypes.object,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPostList)
