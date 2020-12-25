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
import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";
import SelectMenuSection from "./TabMenuSection/SelectMenuSection";
import EmptyContainer from "./VideoListSection/EmptyContainer";

// route
import { JIHBAND_YOUTUBE_PROFILE_ROUTE } from "../../../routes/params/video";
import { NOT_FOUND_ROUTE } from "../../../routes/params/error";

// video list
import InhyukSampleVideoList from "../../../app/data/yada/InhyukSampleVideoList";
import videoListOfJeonInhyukBand from "../../../test/mockingData/videos/jsonString/videoListOfJeonInhyukBand";
import videoIdList from "../../../test/mockingData/videos/videoidList";

// page style
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/videoListByKeywordsStyle";
const useStyles = makeStyles(styles);

export const YoutubeVideoListBySearchKeyword = (props) => {
  const classes = useStyles();
  const { location, match, document } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(location, match);
  console.log(query);
  console.log(document);

  console.log(query);
  const { items } = JSON.parse(videoListOfJeonInhyukBand);
  console.log(items);
  console.log(videoIdList);
  console.log(InhyukSampleVideoList);

  if (match.params.search !== "search" && match.params.search !== undefined)
    return <Redirect to={JIHBAND_YOUTUBE_PROFILE_ROUTE} />;

  return (
    <SmallParallaxLayout>
      <GridContainer justify="center">
        <SelectMenuSection />
      </GridContainer>

      {/* 요 부분은 쿼리에 따라 다르게 출력됨*/}
      <EmptyContainer className={classes.emptyContainer}>
        <h1>업데이트 예정</h1>
      </EmptyContainer>
    </SmallParallaxLayout>
  );
};

YoutubeVideoListBySearchKeyword.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(YoutubeVideoListBySearchKeyword);
