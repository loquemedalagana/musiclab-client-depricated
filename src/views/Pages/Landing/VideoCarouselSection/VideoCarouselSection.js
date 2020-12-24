import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import PrintVideoCarousel from "./PrintVideoCarousel";

// custom components
import { GridContainer, GridItem } from "../../../../components/components";

// page subcomponents
import LandingPageVideoTitle from "../../../SubComponents/landing/LandingPageVideoTitle";
import VideoPageLink from "../../../SubComponents/landing/VideoPageLink";

// route constants
import { NOT_AVAILABLE_ROUTE } from "../../../../routes/params/error";
import {
  JIHBAND_YOUTUBE_PROFILE_ROUTE,
  VIDEO_SEARCH_ROUTE,
} from "../../../../routes/params/video";
import InhyukSampleVideoList from "../../../../app/data/yada/InhyukSampleVideoList";
import videoListOfJeonInhyukBand from "../../../../test/mockingData/videos/jsonString/videoListOfJeonInhyukBand";

import styles from "../../../../assets/jss/material-kit-react/components/carouselStyle";

import { getVideoDataListFromPlayList } from "../../../../app/utils/video/youtubeDataProcessing";

const useStyles = makeStyles(styles);

const channelProfileLink = {
  "Jeon Inhyuk Band Official Channel": JIHBAND_YOUTUBE_PROFILE_ROUTE,
  "Music SSeolprise by Jeon Inhyuk": NOT_AVAILABLE_ROUTE,
  "Hot Videos of Inhyuk": VIDEO_SEARCH_ROUTE,
  "Latest Videos of Inhyuk": VIDEO_SEARCH_ROUTE,
  "My List": NOT_AVAILABLE_ROUTE,
};

export const VideoCarouselSection = (props) => {
  const classes = useStyles();
  const { videoCategoryTitle, userData } = props;

  const isMyList = videoCategoryTitle === "My List";
  const channelRoute = channelProfileLink[videoCategoryTitle];

  const videoList =
    videoCategoryTitle === "Jeon Inhyuk Band Official Channel"
      ? getVideoDataListFromPlayList(
          JSON.parse(videoListOfJeonInhyukBand),
          true
        )
      : InhyukSampleVideoList;

  // 리덕스로 유저가 저장한 유튜브 영상 불러오기
  console.log(userData);

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
          {channelRoute && !isMyList && (
            <VideoPageLink routeLink={channelRoute}>
              <h5 className={classes.link}>
                view more about {videoCategoryTitle}...
              </h5>
            </VideoPageLink>
          )}
          {isMyList && (
            <GridItem xs={12} sm={12} md={11} style={{ textAlign: "right" }}>
              <h5 className={classes.link}>go to your own play list!</h5>
            </GridItem>
          )}
        </GridContainer>
      </div>
    </div>
  );
};

VideoCarouselSection.propTypes = {
  userData: PropTypes.object,
  videoCategoryTitle: PropTypes.string,
};

export default React.memo(VideoCarouselSection);
