import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  //    LinearLoading,
} from "../../../components/components";

// sub components
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";
import YoutubeTagContainert from "./VideoListSection/YoutubeTagContainer";
import EmptyContainer from "./VideoListSection/EmptyContainer";
//import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";
import FooterMenu from "../../Navigations/FooterMenu";

// route
import { JIHBAND_YOUTUBE_PROFILE_ROUTE } from "../../../routes/params/youtube";
//import { NOT_FOUND_ROUTE } from "../../../routes/params/error";

// video list
import InhyukSampleVideoList from "../../../app/data/yada/InhyukSampleVideoList";
import videoListOfJeonInhyukBand from "../Landing/VideoCarouselSection/videoData/videoListOfJeonInhyukBand";
import videoIdList from "../../../test/dummyData/videos/videoidList";

// page style
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";
import YoutubeTagContainer from "./VideoListSection/YoutubeTagContainer";
const useStyles = makeStyles(styles);

export const YoutubeVideoListByTags = (props) => {
  const classes = useStyles();
  const { location, match } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(location, match);
  console.log(query); // 쿼리에 맞게 아래에 결과 띄운다.

  const { items } = JSON.parse(videoListOfJeonInhyukBand);
  console.log(items);
  console.log(videoIdList);
  console.log(InhyukSampleVideoList);

  if (match.params.search !== "search" && match.params.search !== undefined)
    return <Redirect to={JIHBAND_YOUTUBE_PROFILE_ROUTE} />;

  return (
    <>
      <FooterMenu />
      <SmallParallaxLayout>
        <YoutubeTagContainer />

        <EmptyContainer className={classes.emptyContainer}>
          <h1>업데이트 예정</h1>
        </EmptyContainer>
      </SmallParallaxLayout>
    </>
  );
};

YoutubeVideoListByTags.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(YoutubeVideoListByTags);
