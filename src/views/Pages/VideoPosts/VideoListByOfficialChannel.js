import React from "react";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import VideoListSection from "./Sections/VideoListSection";
import qs from "qs";

import { makeStyles } from "@material-ui/core/styles";

import {
  Footer,
  GridContainer,
  GridItem,
  Parallax,
  //LinearLoading,
} from "../../../components/components";

import { officialChannelProfileData } from "../../../app/videoData/officialChannelData";

import defaultImg from "../../../assets/images/dolphin_profile.png";

import styles from "../../../assets/jss/material-kit-react/views/videoListStyle";
import { smallParallaxStyle } from "../../../assets/jss/material-kit-react/views/layouts/background";

const useStyles = makeStyles(styles);

export const VideoListByOfficialChannel = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { location, match } = props;

  const channelParam = match.params.channel;
  const [channelInfo] = officialChannelProfileData.filter(
    ({ routeParam }) => routeParam === channelParam
  );

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (!channelInfo) return <Redirect to="/notfound" />;

  return (
    <>
      <Parallax small filter style={smallParallaxStyle().root} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.channelProfile}>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

VideoListByOfficialChannel.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default React.memo(VideoListByOfficialChannel);
