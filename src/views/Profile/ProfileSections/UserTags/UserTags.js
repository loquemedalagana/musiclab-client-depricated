import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from "classnames";
import randomColor from 'randomcolor';

import {
    GridContainer,
    GridItem,
    //CircularLoading,
} from '../../../../components/components';

import { //test code
    SampleTagList,
} from '../../../../assets/SampleData/SampleData';

import compositionImg from '../../../../assets/images/TagImages/composition.jpg';
import guitarImg from '../../../../assets/images/TagImages/guitar.jpg';
import bandImg from '../../../../assets/images/TagImages/jeoninhyukband.jpg';
import yadaImg from '../../../../assets/images/TagImages/yada.jpg';
import vocalImg from '../../../../assets/images/TagImages/vocal.jpg';

const getThumbnailImage = tag => {
    switch(tag){
        case 'vocal':
        case 'guitar':
        case 'composition':
        case 'yada':
        case 'jeoninhyukband':
            return true;
        default:
            return false;
    }
}

export const UserTags = props => {
    const {
        classes,
    //    userId,
    } = props;

    const thumbnailListImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    return (
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
            <img
            alt="..."
            src={guitarImg}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={vocalImg}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={compositionImg}
            className={thumbnailListImageClasses}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
            <div className={thumbnailListImageClasses}>
                
            </div>
            <img
            alt="..."
            src={bandImg}
            className={thumbnailListImageClasses}
            />
            <img
            alt="..."
            src={yadaImg}
            className={thumbnailListImageClasses}
            />
        </GridItem>
        </GridContainer>
    )
}

UserTags.propTypes = {
    props: PropTypes.object,
    userId: PropTypes.string,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTags)

//https://www.npmjs.com/package/randomcolor
//https://randomcolor.lllllllllllllllll.com/