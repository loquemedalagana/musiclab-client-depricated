import React, { useEffect } from "react";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";
import qs from "qs";

// redux fetch
import { fetchChannelProfile } from "../../../app/store/youtube";
import { officialChannelProfileData } from "../../../app/data/yada/officialChannelData";

// ui components
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem } from "../../../components/components";
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";

// jss components
import defaultImg from "../../../assets/images/dolphin_profile.png";
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/profilePageStyle";
const useStyles = makeStyles(styles);

export const YoutubeVideoListByChannelProfile = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { location, match } = props;

  const { channelparams } = match.params;

  // 이 부분 바꾸기
  const [channelInfo] = officialChannelProfileData.filter(
    ({ routeParam }) => routeParam === channelparams
  );

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  console.log(query, channelparams, location, match);

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
      <ViewVideoListSection
        type="official"
        channelId={channelInfo.channelId}
        userId={query.userId}
      />
    </SmallParallaxLayout>
  );
};

YoutubeVideoListByChannelProfile.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default React.memo(YoutubeVideoListByChannelProfile);
