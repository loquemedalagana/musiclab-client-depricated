import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import PrintVideoCarousel from "./PrintVideoCarousel";

// custom components
import { GridContainer, GridItem } from "../../../../components/components";
import NotAvailable from "../../../SubComponents/landing/NotAvailable";

// page subcomponents
import LandingPageVideoTitle from "../../../SubComponents/landing/LandingPageVideoTitle";
import VideoPageLink from "../../../SubComponents/landing/VideoPageLink";

// route constants
import { NOT_AVAILABLE_ROUTE } from "../../../../routes/params/error";
import {
  JIHBAND_YOUTUBE_PROFILE_ROUTE,
  VIDEO_SEARCH_ROUTE,
} from "../../../../routes/params/video";
import { SampleVideoList } from "../../../../app/data/yada/InhyukSampleVideoList";

import styles from "../../../../assets/jss/material-kit-react/components/carouselStyle";
import { getVideoDataFromPlayList } from "../../../../app/api/video/youtube/youtubeFetchEndpoints";

// video list fetched data
import {
  JIHBAND_OFFICIAL_LIST,
  HOT_VIDEO_LIST,
  LATEST_VIDEO_LIST,
} from "../../../../app/api/video/landingPageCarousel";

const useStyles = makeStyles(styles);

const playList = {
  "Jeon Inhyuk Band Official Channel": JIHBAND_OFFICIAL_LIST,
  "Music SSeolprise by Jeon Inhyuk": null,
  "Hot Videos of Inhyuk": HOT_VIDEO_LIST,
  "Latest Videos of Inhyuk": LATEST_VIDEO_LIST,
  "My List": null, //나중에 내 비디오 리스트 가져오는 함수 넣기 getMyVideoList (서버랑 연동)
};

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
  const ENDPOINT = playList[videoCategoryTitle];

  //if my list exists,

  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ENDPOINT, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const result = getVideoDataFromPlayList(data);
        setLoading(false);
        setResultData(result);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [ENDPOINT, userData]);

  console.log(resultData);

  if (!resultData && ENDPOINT && loading)
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <Skeleton animation="wave" varient="rect" />
        </div>
      </div>
    );

  if (!ENDPOINT)
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <LandingPageVideoTitle
              landingPageVideoCategoryTitle={videoCategoryTitle}
              className={classes.title}
            />
            <NotAvailable className={classes.detail} />
          </GridContainer>
        </div>
      </div>
    );

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <LandingPageVideoTitle
            landingPageVideoCategoryTitle={videoCategoryTitle}
            className={classes.title}
          />
          <PrintVideoCarousel
            resultData={resultData && !error ? resultData : SampleVideoList}
          />
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
