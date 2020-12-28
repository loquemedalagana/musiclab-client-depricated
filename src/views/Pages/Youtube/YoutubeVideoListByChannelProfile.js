import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";
import qs from "qs";

// redux fetch
import { fetchChannelProfile } from "../../../app/store/youtube";

// ui components
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem } from "../../../components/components";
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";

// jss components
import defaultImg from "../../../assets/images/dolphin_profile.png";
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";
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
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { category } = query;

  const dispatch = useDispatch();
  const { channelProfile, channelProfileLoading } = useSelector(
    (state) => state.youtube
  );

  useEffect(() => {
    dispatch(fetchChannelProfile({ channelparams, category }));
  }, [dispatch, channelparams, category]);

  console.log(channelProfile, channelProfileLoading);

  if (!channelparams || !category) return <Redirect to="/notfound" />;
  // 로딩 false, 데이터 없으면 not found로 이동
  if (!channelProfileLoading && !channelProfile) {
    return <Redirect to="/notfound" />;
  }

  return (
    <SmallParallaxLayout>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              {channelProfileLoading ? (
                <Skeleton
                  variant="circle"
                  animation="wave"
                  className={imageClasses}
                />
              ) : (
                <img
                  src={
                    channelProfile.thumbnails
                      ? channelProfile.thumbnails.medium.url
                      : defaultImg
                  }
                  alt="..."
                  className={imageClasses}
                />
              )}
            </div>
            <div className={classes.channelTitle}>
              {channelProfileLoading ? (
                <Skeleton variant="text" animation="wave" />
              ) : (
                <h3>{channelProfile.title}</h3>
              )}
            </div>
            {channelProfileLoading ? (
              <Skeleton variant="rect" animation="wave" />
            ) : (
              <h5>{channelProfile.description}</h5>
            )}
          </div>
        </GridItem>
      </GridContainer>
      {channelProfileLoading ? (
        <Skeleton variant="rect" animation="wave" />
      ) : (
        <ViewVideoListSection
          type="channel"
          category={category}
          channelInfo={{
            channelTitle: channelProfile.title,
            profileImage: channelProfile.thumbnails
              ? channelProfile.thumbnails.medium.url
              : defaultImg,
            channelId: channelProfile.channelId,
          }}
          userId={query.userId}
        />
      )}
    </SmallParallaxLayout>
  );
};

YoutubeVideoListByChannelProfile.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default React.memo(YoutubeVideoListByChannelProfile);
