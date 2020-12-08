import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import classNames from "classnames";

import {
  GridContainer,
  GridItem,
  //CircularLoading,
} from "../../../../components/components";

import {
  //test code
  SampleTagList,
  SampleVideoList,
} from "../../../../app/videoData/SampleData/SampleVideoData";

const PrintVideoThumbnail = (props) => {
  const { videoData, thumbnailListImageClasses } = props; //add hover

  const { thumbnail, title } = videoData;

  return (
    <img alt={title} src={thumbnail} className={thumbnailListImageClasses} />
  );
};

PrintVideoThumbnail.propTypes = {
  videoData: PropTypes.object,
  thumbnailListImageClasses: PropTypes.string,
};

export const LikedVideos = (props) => {
  const {
    classes,
    //userId,
  } = props;

  const thumbnailListImageClasses = classNames(
    classes.imgRounded,
    classes.imgGallery
  );

  const midIdx =
    SampleVideoList.length / 2
      ? Math.floor(SampleVideoList.length / 2)
      : SampleVideoList.length / 2;

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={4}>
        {SampleVideoList.slice(0, midIdx).map((videoData, idx) => (
          <PrintVideoThumbnail
            key={idx}
            thumbnailListImageClasses={thumbnailListImageClasses}
            videoData={videoData}
          />
        ))}
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        {SampleVideoList.slice(midIdx, SampleTagList.length).map(
          (videoData, idx) => (
            <PrintVideoThumbnail
              key={idx}
              thumbnailListImageClasses={thumbnailListImageClasses}
              videoData={videoData}
            />
          )
        )}
      </GridItem>
    </GridContainer>
  );
};

LikedVideos.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  userId: PropTypes.string,
  thumbnailListImageClasses: PropTypes.string,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LikedVideos);
