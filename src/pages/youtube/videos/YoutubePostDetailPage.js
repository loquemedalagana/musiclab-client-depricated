import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// actions
import { fetchYoutubeVideoData } from "../../../app/store/youtube";

// components
import LinearLoading from "../../../components/Loading/LinearLoading";
import SmallParallaxLayout from "../../../layouts/SmallParallaxLayout";
import YoutubeVideoIframe from "../../../views/SubComponents/youtube/YoutubeVideoIframe";
import FooterMenu from "../../../views/sections/navigations/FooterMenu";

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
    classes.imgFluid,
    classes.imgCursor,
    classes.imgRoundedCircleHover
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
    return <Redirect to={NOT_FOUND_ROUTE} />;
  }

  console.log(
    youtubeVideoData,
    loadYoutubeVideoDataError,
    loadYoutubeVideoDataLoading
  );

  const videoLoading =
    loadYoutubeVideoDataLoading && !loadYoutubeVideoDataError;

  if (loadYoutubeVideoDataLoading) return <LinearLoading />;

  return (
    <>
      <SmallParallaxLayout>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              <div>
                {videoLoading ? (
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
              <div className={classes.name}>
                {videoLoading ? (
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className={classes.title}
                  />
                ) : (
                  <>
                    <h3>{youtubeVideoData.title}</h3>
                    <h6>{youtubeVideoData.publishedAt}</h6>
                  </>
                )}
              </div>
              {videoLoading ? (
                <Skeleton
                  variant="rect"
                  animation="wave"
                  className={classes.description}
                />
              ) : (
                <div className={classes.description}>
                  <p>{youtubeVideoData.description}</p>
                </div>
              )}
            </div>
          </GridItem>
        </GridContainer>
        {videoLoading ? (
          <GridContainer>
            <Skeleton variant="rect" animation="wave" />
          </GridContainer>
        ) : (
          <YoutubeVideoIframe
            videoId={youtubeVideoData.videoId}
            title={youtubeVideoData.title}
          />
        )}

        {/*댓글 로딩하는 페이지*/}
        <GridContainer justify="center" id="discuss">
          <h3>여기다 댓글 창 로딩할 예정(별도 컴포넌트)</h3>
        </GridContainer>
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
