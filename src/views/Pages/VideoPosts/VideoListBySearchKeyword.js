/**
keyword별로 검색해서 나오는 결과들 반환
https://developers.google.com/youtube/v3/docs/search/list?authuser=1
 */

import React from "react";
import { connect } from "react-redux";

import classNames from "classnames";
import PropTypes from "prop-types";
import qs from "qs";

//import VideoListSection from './Sections/VideoListSection';
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";

import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  GridItem,
  //    LinearLoading,
} from "../../../components/components";

import defaultImg from "../../../assets/images/dolphin_profile.png";

import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/profilePageStyle";

const useStyles = makeStyles(styles);

export const VideoListBySearchKeyword = (props) => {
  const { location, match } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(location, match);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  console.log(query);

  //fetch data with get request

  return (
    <SmallParallaxLayout>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img src={defaultImg} alt="..." className={imageClasses} />
            </div>
            <div className={classes.channelTitle}>
              <h3>title</h3>
            </div>
            <h5>descriptrion</h5>
          </div>
        </GridItem>
      </GridContainer>
    </SmallParallaxLayout>
  );
};

VideoListBySearchKeyword.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(VideoListBySearchKeyword);
