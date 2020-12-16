import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import classNames from "classnames";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import {
  Footer,
  Parallax,
  GridContainer,
  GridItem,
} from "../../components/components";

import VideoCarouselSection from "./VideoCarouselSection/VideoCarouselSection";

import { mainParallaxStyle } from "../../assets/jss/material-kit-react/views/background";

import { appDescription, appShortTitle } from "../../app/helper/appTitle";
import styles from "../../assets/jss/material-kit-react/views/landingStyle";

const useStyles = makeStyles(styles);

export const Landing = (props) => {
  const classes = useStyles();
  const { userData, userLoading } = props;

  return (
    <>
      <Parallax className={mainParallaxStyle().root}>
        <div className={clsx(classes.container)}>
          <GridContainer type="parallax">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.brand}>
                <h1 className={classes.title}>{appShortTitle}</h1>
                <h3 className={classes.subtitle}>{appDescription}</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        {userData && !userLoading && userData.points >= 0 ? (
          <VideoCarouselSection categoryTitle="My List" userData={userData} />
        ) : null}

        <VideoCarouselSection categoryTitle="Jeon Inhyuk Band Official Channel" />
        <VideoCarouselSection categoryTitle="Music SSeolprise by Jeon Inhyuk" />
        <VideoCarouselSection categoryTitle="Hot Videos of Inhyuk" />
        <VideoCarouselSection categoryTitle="Latest Videos of Inhyuk" />
      </div>
      <Footer />
    </>
  );
};

Landing.propTypes = {
  userData: PropTypes.object,
  userLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  userLoading: state.auth.loading,
});

export default withRouter(connect(mapStateToProps)(Landing));
