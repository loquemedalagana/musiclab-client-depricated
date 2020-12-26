import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Link } from "@material-ui/core";
import {
  LocalOffer as Tag,
  MusicVideoRounded,
  DescriptionRounded as Post,
  Edit,
  Cloud as SoundCloud,
  Home as Blog,
  Twitter,
  Facebook,
  Instagram,
  YouTube,
} from "@material-ui/icons";

// action function
import { fetchTargetUserData } from "../../../../app/store/profile";

// custom component
import {
  //    Button,
  GridContainer,
  GridItem,
  NavPills,
  LinearLoading,
} from "../../../../components/components";

// fragment components
import SmallParallaxLayout from "../../../Layouts/SmallParallaxLayout";
import LikedVideos from "./ProfileSections/LikedVideos/LikedVideos";
import UserPostList from "./ProfileSections/UserPostList/UserPostList";
import UserTags from "./ProfileSections/UserTags/UserTags";
import NotFound from "../../Error/NotFound";

// route constants
import { EDIT_PROFILE_ROUTE } from "../../../../routes/params/profile";

// image
import defaultImg from "../../../../assets/images/dolphin_profile.png";

import styles from "../../../../assets/jss/material-kit-react/views/pages/smallParallax/profilePageStyle";
import { getDateKor } from "../../../../app/models/common/getDate";

const useStyles = makeStyles(styles);

const PrintSocialLinks = (props) => {
  const { social } = props;
  if (!social) return null;

  const getIcon = (key) => {
    switch (key) {
      case "youtube":
        return <YouTube />;
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <Twitter />;
      case "instagram":
        return <Instagram />;
      case "soundcloud":
        return <SoundCloud />;
      default:
        return <Blog />;
    }
  };

  //color primary, href -> social명
  const data = Object.keys(social).map((key) => {
    const link = social[key] ? social[key] : null;
    return (
      <Link key={key} component="a" href={link} target="_blank">
        <IconButton color={link ? "primary" : "default"}>
          {getIcon(key)}
        </IconButton>
      </Link>
    );
  });

  return data;
};

const Profile = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { match, history, curUserId } = props;
  const targetUserId =
    match.params.userid === "my" ? curUserId : match.params.userid;
  const isSame = targetUserId === curUserId;

  const {
    targetUserData,
    targetUserDataNotFound,
    targetUserDataLoading,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTargetUserData(targetUserId));
  }, [dispatch, targetUserId]);

  const thumbnail = targetUserData
    ? targetUserData.thumbnailImage
      ? targetUserData.thumbnailImage
      : undefined
    : undefined;

  if (targetUserDataLoading) return <LinearLoading />;
  if (targetUserDataNotFound) return <Redirect to="/notfound" />;

  return !targetUserDataNotFound ? (
    <SmallParallaxLayout thumbnail={thumbnail}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img
                src={
                  targetUserData.profileImage
                    ? targetUserData.profileImage
                    : defaultImg
                }
                alt="..."
                className={imageClasses}
              />
            </div>
            <div className={classes.name}>
              {/*관리자일 때 공식 표시*/}
              <h3 className={classes.title}>
                {targetUserData.displayName}
                {isSame && (
                  <IconButton
                    color="primary"
                    onClick={() => history.push(EDIT_PROFILE_ROUTE)}
                  >
                    <Edit />
                  </IconButton>
                )}
              </h3>
              {isSame ? (
                <>
                  <h6>{`${targetUserData.PrivateInfo.familyName}${targetUserData.PrivateInfo.givenName}`}</h6>
                  <h6>{`${getDateKor(
                    targetUserData.PrivateInfo.birthday
                  )}생`}</h6>
                </>
              ) : (
                <h6> </h6>
              )}
            </div>
            <GridContainer justify="center" direction="row">
              <PrintSocialLinks social={targetUserData.Social} />
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>

      <div className={classes.description}>
        <p>{targetUserData.description} </p>
      </div>

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
          <NavPills
            alignCenter
            color="primary"
            tabs={[
              {
                tabButton: "Tags",
                tabIcon: Tag,
                tabContent: (
                  <UserTags userId={targetUserId} classes={classes} />
                ),
              },
              {
                tabButton: "Liked Videos",
                tabIcon: MusicVideoRounded,
                tabContent: (
                  <LikedVideos userId={targetUserId} classes={classes} />
                ),
              },
              {
                tabButton: "Written Posts",
                tabIcon: Post,
                tabContent: (
                  <UserPostList userId={targetUserId} classes={classes} />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </SmallParallaxLayout>
  ) : (
    <NotFound />
  );
};

Profile.propTypes = {
  props: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  curUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  curUserId: state.auth.userData ? state.auth.userData.id : undefined,
  //isAdmin: state.auth.userData ? state.auth.userData.isAdmin : false,
});

export default withRouter(connect(mapStateToProps)(React.memo(Profile)));
