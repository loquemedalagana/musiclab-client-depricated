import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  GridItem,
  //    LinearLoading,
} from "../../../components/components";

// sub components
import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";
import RenderEmptyList from "./VideoListSection/RenderEmptyList";

// route
import { JIHBAND_YOUTUBE_PROFILE_ROUTE } from "../../../routes/params/video";
import { NOT_FOUND_ROUTE } from "../../../routes/params/error";

// video list
import { InhyukSampleVideoList } from "../../../app/data/yada/InhyukSampleVideoList";
import videoListOfJeonInhyukBand from "../../../test/mockingData/videos/jsonString/videoListOfJeonInhyukBand";
import videoIdList from "../../../test/mockingData/videos/videoidList";

// page style
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/videoListByKeywordsStyle";
const useStyles = makeStyles(styles);

export const VideoListBySearchKeyword = (props) => {
  const classes = useStyles();
  const { location, match } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(location, match);
  console.log(query);

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
        <h2>탭 매뉴 선택(사슬, 커버)</h2>
      </GridContainer>

      {/* 요 부분은 쿼리에 따라 다르게 출력됨*/}
      <RenderEmptyList>
        <h1>업데이트 예정</h1>
      </RenderEmptyList>
    </SmallParallaxLayout>
  );
};

VideoListBySearchKeyword.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(VideoListBySearchKeyword);
