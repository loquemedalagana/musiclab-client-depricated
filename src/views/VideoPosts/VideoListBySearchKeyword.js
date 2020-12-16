/**
keyword별로 검색해서 나오는 결과들 반환
https://developers.google.com/youtube/v3/docs/search/list?authuser=1
 */

import React from "react";
import { connect } from "react-redux";
//import fetcher from '../../app/fetcher';
//import useSWR from 'swr';

import classNames from "classnames";
//import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import qs from "qs";
//import VideoListSection from './Sections/VideoListSection';

import { makeStyles } from "@material-ui/core/styles";

import {
  Footer,
  GridContainer,
  GridItem,
  Parallax,
  //    LinearLoading,
} from "../../components/components";

import defaultImg from "../../assets/images/dolphin_profile.png";

import styles from "../../assets/jss/material-kit-react/views/videoListStyle";
import { smallParallaxStyle } from "../../assets/jss/material-kit-react/views/layouts/background";

const useStyles = makeStyles(styles);

export const VideoListBySearchKeyword = (props) => {
  const { location } = props;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  console.log(query);

  //fetch data with get request

  return (
    <>
      <Parallax small filter style={smallParallaxStyle().root} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/*youtube channel profile*/}
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.channelProfile}>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

VideoListBySearchKeyword.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(VideoListBySearchKeyword);
