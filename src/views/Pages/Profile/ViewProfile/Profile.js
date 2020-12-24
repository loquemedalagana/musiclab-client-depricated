import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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
    const link = social[key].length > 0 ? social[key] : null;
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

//일단 데이터 지우고 다시하기 (ajax는 나중에 하면 되니까)
const Profile = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { match, history, curUserId } = props;

  // 나중에 백앤드랑 연결 후 바꿀 것!
  const targetUserId = match.params.userid; //useEffect 안에서 아이디가 있음.
  const isSame = targetUserId === "my";
  const ENDPOINT = `/api/profiles/${
    targetUserId === "my" ? curUserId : targetUserId
  }`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resultData) => {
        setData(resultData);
      })
      .catch((err) => setError(err));
  }, [ENDPOINT, match, curUserId]);

  console.log(data);
  console.log(data ? data.PrivateInfo : null);

  const thumbnail = data
    ? data.thumbnailImage
      ? data.thumbnailImage
      : undefined
    : undefined;

  if (!data && !error) return <LinearLoading />;
  if (error) return <Redirect to="/notfound" />;

  return !error ? (
    <SmallParallaxLayout thumbnail={thumbnail}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img
                src={data.profileImage ? data.profileImage : defaultImg}
                alt="..."
                className={imageClasses}
              />
            </div>
            <div className={classes.name}>
              {/*관리자일 때 공식 표시*/}
              <h3 className={classes.title}>
                {data.displayName}
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
                  <h6>{`${data.PrivateInfo.familyName}${data.PrivateInfo.givenName}`}</h6>
                  <h6>{`${getDateKor(data.PrivateInfo.birthday)}생`}</h6>
                </>
              ) : (
                <h6> </h6>
              )}
            </div>
            <GridContainer justify="center" direction="row">
              <PrintSocialLinks social={data.Social} />
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>

      <div className={classes.description}>
        <p>{data.description} </p>
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
