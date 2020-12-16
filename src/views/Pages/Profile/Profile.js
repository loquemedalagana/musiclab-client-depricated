import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import classNames from "classnames";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Link } from "@material-ui/core";

import {
  LocalOffer as Tag,
  MusicVideoRounded,
  Favorite,
  DescriptionRounded as Post,
  Edit,
  Cloud as SoundCloud,
  Home as Blog,
  Twitter,
  Facebook,
  Instagram,
  YouTube,
} from "@material-ui/icons";

import {
  Footer,
  //    Button,
  GridContainer,
  GridItem,
  NavPills,
  Parallax,
  LinearLoading,
} from "../../../components/components";

import SmallParallaxLayout from "../../Layouts/SmallParallaxLayout";

import LikedVideos from "./ProfileSections/LikedVideos/LikedVideos";
import UserPostList from "./ProfileSections/UserPostList/UserPostList";
import UserTags from "./ProfileSections/UserTags/UserTags";

import NotFound from "../Error/NotFound";

import defaultImg from "../../../assets/images/dolphin_profile.png";

import styles from "../../../assets/jss/material-kit-react/views/pages/profilePageStyle";
import { smallParallaxStyle } from "../../../assets/jss/material-kit-react/views/layouts/background";
import { getDateKor } from "../../../app/utils/functions";

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

  const { match, isAdmin, history, curUserId } = props;

  const targetUserId = match.params.userid; //useEffect 안에서 아이디가 있음.
  const isSame = curUserId === targetUserId;
  const ENDPOINT = `/api/profiles/${targetUserId}`;
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
  }, [ENDPOINT, match, curUserId, isAdmin]);

  console.log(data, error);

  const thumbnail = data
    ? data.userData.thumbnail
      ? data.userData.thumbnail
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
                src={data.userData.image ? data.userData.image : defaultImg}
                alt="..."
                className={imageClasses}
              />
            </div>
            <div className={classes.name}>
              {/*관리자일 때 공식 표시*/}
              <h3 className={classes.title}>
                {data.userData.displayName}
                {isSame ? (
                  <IconButton
                    color="primary"
                    onClick={() => history.push(`/modify/profile`)}
                  >
                    <Edit />
                  </IconButton>
                ) : (
                  <IconButton color="secondary" onClick={null}>
                    <Favorite />
                  </IconButton>
                )}
              </h3>
              {isAdmin || isSame ? (
                <>
                  <h6>{`${data.userData.name.familyName}${data.userData.name.givenName}`}</h6>
                  <h6>{`${getDateKor(data.userData.birthday)}생`}</h6>
                </>
              ) : (
                <h6> </h6>
              )}
            </div>
            <GridContainer justify="center" direction="row">
              <PrintSocialLinks social={data.userData.social} />
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>

      <div className={classes.description}>
        <p>{data.userData.description} </p>
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
  curUserId: PropTypes.string,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  curUserId: state.auth.userData ? state.auth.userData._id : undefined,
  isAdmin: state.auth.userData ? state.auth.userData.isAdmin : false,
});

export default withRouter(connect(mapStateToProps)(React.memo(Profile)));
