import React from "react";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import VideoListSection from "./Sections/VideoListSection";
import qs from "qs";

import { makeStyles } from "@material-ui/core/styles";

import VideoListBySearchKeyword from "./VideoListBySearchKeyword";

import {
  GridContainer,
  GridItem,
  //LinearLoading,
} from "../../../components/components";
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";

import { officialChannelProfileData } from "../../../app/data/yada/officialChannelData";
import defaultImg from "../../../assets/images/dolphin_profile.png";

import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/profilePageStyle";

const useStyles = makeStyles(styles);

export const VideoListByYoutubeChannelProfile = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { location, match } = props;

  const { channel } = match.params;

  // channel이란 매개변수로 들어온 데이터가, 공식 채널에 존재하면 거기에 맞는 목록 출력해줌
  const [channelInfo] = officialChannelProfileData.filter(
    ({ routeParam }) => routeParam === channel
  );

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  //if (channel === "any") return <VideoListBySearchKeyword />;
  if (!channelInfo) return <Redirect to="/notfound" />;

  return (
    <SmallParallaxLayout>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img
                src={channelInfo.image ? channelInfo.image : defaultImg}
                alt="..."
                className={imageClasses}
              />
            </div>
            <div className={classes.channelTitle}>
              <h3>{channelInfo.channelTitle}</h3>
            </div>
            <h5>{channelInfo.description}</h5>
          </div>
        </GridItem>
      </GridContainer>
      <VideoListSection
        type="official"
        videoListId={channelInfo.playListId}
        userId={query.userId}
      />
    </SmallParallaxLayout>
  );
};

VideoListByYoutubeChannelProfile.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default React.memo(VideoListByYoutubeChannelProfile);
