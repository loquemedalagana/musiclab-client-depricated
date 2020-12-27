import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import PrintVideoCarousel from "./PrintVideoCarousel";

// custom components
import { GridContainer } from "../../../../components/components";

// page subcomponents
import LandingPageVideoTitle from "../../../SubComponents/landing/LandingPageVideoTitle";
import VideoPageLink from "../../../SubComponents/landing/VideoPageLink";

// route constants
import { NOT_AVAILABLE_ROUTE } from "../../../../routes/params/error";
import {
  JIHBAND_YOUTUBE_PROFILE_ROUTE,
  YOUTUBE_VIDEO_SEARCH_ROUTE,
  MY_YOUTUBE_VIDEO_LIST,
} from "../../../../routes/params/youtube";
import InhyukSampleVideoList from "../../../../app/data/yada/InhyukSampleVideoList";
import videoListOfJeonInhyukBand from "./videoData/videoListOfJeonInhyukBand";

import styles from "../../../../assets/jss/material-kit-react/components/carouselStyle";

import { getVideoDataListFromPlayList } from "../../../../app/utils/video/youtubeDataProcessing";

const useStyles = makeStyles(styles);

const getVideoListRoute = {
  "Jeon Inhyuk Band Official Channel": JIHBAND_YOUTUBE_PROFILE_ROUTE,
  "Music SSeolprise by Jeon Inhyuk": NOT_AVAILABLE_ROUTE,
  "Hot Videos of Inhyuk": YOUTUBE_VIDEO_SEARCH_ROUTE,
  "Latest Videos of Inhyuk": YOUTUBE_VIDEO_SEARCH_ROUTE,
  "My List": MY_YOUTUBE_VIDEO_LIST,
};

export const VideoCarouselSection = (props) => {
  const classes = useStyles();
  const { videoCategoryTitle, myYoutubeVideoList } = props;

  const isMyList = videoCategoryTitle === "My List";
  const videoListRoute = getVideoListRoute[videoCategoryTitle];

  const getVideoListForCarousel = () => {
    switch (videoCategoryTitle) {
      case "Jeon Inhyuk Band Official Channel":
        return getVideoDataListFromPlayList(
          JSON.parse(videoListOfJeonInhyukBand),
          true
        ).slice(0, 6);
      case "My List":
        return myYoutubeVideoList;
      default:
        return InhyukSampleVideoList;
    }
  };

  const videoList = getVideoListForCarousel();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <LandingPageVideoTitle
            landingPageVideoCategoryTitle={videoCategoryTitle}
            className={classes.title}
          />
          <PrintVideoCarousel resultData={videoList} />
          {/*채널 상세 페이지*/}
          {videoListRoute && (
            <VideoPageLink routeLink={videoListRoute}>
              {!isMyList ? (
                <h5 className={classes.link}>
                  view more about {videoCategoryTitle}...
                </h5>
              ) : (
                <h5 className={classes.link}>go to your own play list!</h5>
              )}
            </VideoPageLink>
          )}
        </GridContainer>
      </div>
    </div>
  );
};

VideoCarouselSection.propTypes = {
  userData: PropTypes.object,
  videoCategoryTitle: PropTypes.string,
  myYoutubeVideoList: PropTypes.array,
};

const mapStateToProps = (state) => ({
  myYoutubeVideoList: state.auth.myYoutubeVideoList,
});

export default React.memo(connect(mapStateToProps)(VideoCarouselSection));
