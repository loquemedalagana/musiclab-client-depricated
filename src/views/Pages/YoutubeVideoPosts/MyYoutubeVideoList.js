import React from "react";
import { connect, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/pages/smallParallax/profilePageStyle";

// custom component
import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";
import { GridContainer, GridItem } from "../../../components/components";
//import ViewVideoListSection from "./VideoListSection/ViewVideoListSection";

import defaultImg from "../../../assets/images/dolphin_profile.png";

const useStyles = makeStyles(styles);

const MyYoutubeVideoList = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { curUserData } = props;
  const thumbnail = curUserData
    ? curUserData.thumbnailImage
      ? curUserData.thumbnailImage
      : undefined
    : undefined;

  const { myYoutubeVideoList } = useSelector((state) => state.youtubeVideo);

  console.log(myYoutubeVideoList);

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
            <h5>자주 봅시다!!</h5>
          </div>
        </GridItem>
      </GridContainer>
    </SmallParallaxLayout>
  );
};

MyYoutubeVideoList.propTypes = {
  curUserData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.auth.userData ? state.auth.userData : undefined,
});

export default connect(mapStateToProps)(MyYoutubeVideoList);
