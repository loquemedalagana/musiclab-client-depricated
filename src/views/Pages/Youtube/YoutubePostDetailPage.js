import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// actions
import { setAlertMsg } from "../../../app/store/alert";
import { fetchYoutubeVideoData } from "../../../app/store/youtube";

// components
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";
import YoutubeVideoIframe from "../../SubComponents/youtube/YoutubeVideoIframe";
import FooterMenu from "../../Navigations/FooterMenu";

// route variable
import { NOT_FOUND_ROUTE } from "../../../routes/params/error";

// style components
import classNames from "classnames";
import { GridContainer, GridItem } from "../../../components/components";
import { Skeleton } from "@material-ui/lab";

import defaultImg from "../../../assets/images/dolphin_profile.png";
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);
const YoutubePostDetailPage = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { match } = props;
  const { videoId } = match.params;

  const {
    loadYoutubeVideoDataLoading,
    youtubeVideoData,
    loadYoutubeVideoDataError,
  } = useSelector((state) => state.youtube);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchYoutubeVideoData({ videoId }));
  }, [dispatch, videoId]);

  if (loadYoutubeVideoDataError) {
    dispatch(setAlertMsg(loadYoutubeVideoDataError, "error"));
    return <Redirect to={NOT_FOUND_ROUTE} />;
  }

  console.log(
    youtubeVideoData,
    loadYoutubeVideoDataError,
    loadYoutubeVideoDataLoading
  );

  return (
    <>
      <SmallParallaxLayout>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              <div>
                {loadYoutubeVideoDataLoading ? (
                  <Skeleton
                    variant="circle"
                    animation="wave"
                    className={imageClasses}
                  />
                ) : (
                  <img
                    src={
                      youtubeVideoData.profileImage
                        ? youtubeVideoData.profileImage
                        : defaultImg
                    }
                    alt="..."
                    className={imageClasses}
                  />
                )}
              </div>
              <div className={classes.channelTitle}>
                {loadYoutubeVideoDataLoading ? (
                  <Skeleton variant="text" animation="wave" />
                ) : (
                  <h3>{youtubeVideoData.channelTitle}</h3>
                )}
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <YoutubeVideoIframe videoId={youtubeVideoData.videoId} />
        {/*댓글 로딩하는 페이지*/}
      </SmallParallaxLayout>
      <FooterMenu />
    </>
  );
};

YoutubePostDetailPage.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default YoutubePostDetailPage;
