import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import {
  GridContainer,
  GridItem,
  //CircularLoading,
} from "../../../../components/components";

import compositionImg from "../../../../assets/images/TagImages/composition.jpg";
import guitarImg from "../../../../assets/images/TagImages/guitar.jpg";
import bandImg from "../../../../assets/images/TagImages/jeoninhyukband.jpg";
import yadaImg from "../../../../assets/images/TagImages/yada.jpg";
import vocalImg from "../../../../assets/images/TagImages/vocal.jpg";

export const UserPostList = (props) => {
  const {
    classes,
    //userId,
  } = props;

  const thumbnailListImageClasses = classNames(
    classes.imgRounded,
    classes.imgGallery
  );

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={4}>
        <img alt="..." src={guitarImg} className={thumbnailListImageClasses} />
        <img alt="..." src={vocalImg} className={thumbnailListImageClasses} />
        <img
          alt="..."
          src={compositionImg}
          className={thumbnailListImageClasses}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <img alt="..." src={bandImg} className={thumbnailListImageClasses} />
        <img alt="..." src={yadaImg} className={thumbnailListImageClasses} />
      </GridItem>
    </GridContainer>
  );
};

UserPostList.propTypes = {
  props: PropTypes.object,
  userId: PropTypes.string,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostList);
