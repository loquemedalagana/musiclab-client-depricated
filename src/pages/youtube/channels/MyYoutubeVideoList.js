import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/smallParallaxPageStyle";

// custom component
import SmallParallaxLayout from "../../../layouts/SmallParallaxLayout";
import { GridContainer, GridItem } from "../../../components/components";
import ViewVideoListSection from "../../../views/sections/youtube/ViewVideoListSection";

import defaultImg from "../../../assets/images/dolphin_profile.png";

const useStyles = makeStyles(styles);

const MyYoutubeVideoList = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { curUserData, match } = props;
  const thumbnail = curUserData
    ? curUserData.thumbnailImage
      ? curUserData.thumbnailImage
      : undefined
    : undefined;

  return (
    <SmallParallaxLayout thumbnail={thumbnail}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img
                src={
                  curUserData.profileImage
                    ? curUserData.profileImage
                    : defaultImg
                }
                alt="..."
                className={imageClasses}
              />
            </div>
            <div className={classes.channelTitle}>
              <h3>{`${curUserData.displayName}님이 즐겨보는 영상들`}</h3>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <ViewVideoListSection type="mylist" category="etc" match={match} />
    </SmallParallaxLayout>
  );
};

MyYoutubeVideoList.propTypes = {
  curUserData: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(MyYoutubeVideoList);
