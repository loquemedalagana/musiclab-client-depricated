/*eslint-disable*/
import React from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// react components for routing our app without refresh
import { withRouter, } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  List, ListItem, Badge, Tooltip
} from "@material-ui/core";

// @material-ui/icons
import {
  VideoLibrarySharp,
  Apps,
  SupervisorAccount,
  ExitToApp,
  Notifications,
  AccountCircle,
  Language,
} from "@material-ui/icons";

import {logoutUser} from '../../app/store/user';

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

// route constants
import {jihbandOfficialYoutubeLink} from "../../app/data/yada/yadaSocialLinks";
import {YOUTUBE_VIDEO_SEARCH_ROUTE, JIHBAND_YOUTUBE_PROFILE_ROUTE, MY_YOUTUBE_VIDEO_LIST} from "../../routes/params/youtube";
import {MY_PROFILE_ROUTE} from "../../routes/params/profile";
import {NOT_AVAILABLE_ROUTE} from "../../routes/params/error";
import {LOGIN_ROUTE, SIGNUP_ROUTE} from "../../routes/params/auth";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  const {
    setMobileOpen,
    logoutUser,
    username,
    isAuth,
    isMember,
    history,
    notifications,
  } = props;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="VIDEOS"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={VideoLibrarySharp}
          dropdownList={[
            <Button color = "transparent" onClick={()=>history.push(MY_YOUTUBE_VIDEO_LIST)} className={classes.dropdownLink}>
              My List
            </Button>,
            <Button color = "transparent" onClick={()=>history.push(NOT_AVAILABLE_ROUTE)} className={classes.dropdownLink}>
              Music SSeolprise
            </Button>,
            <Button color = "transparent" onClick={()=> {
              history.push(JIHBAND_YOUTUBE_PROFILE_ROUTE);
              setMobileOpen(false);
            }} className={classes.dropdownLink}>
              Jeon Inhyuk Band official
            </Button>,
            <Button color = "transparent" onClick={()=>{
              history.push(YOUTUBE_VIDEO_SEARCH_ROUTE);
              setMobileOpen(false);
            }} className={classes.dropdownLink}>
              Search videos
            </Button>,
          ]}
        />
      </ListItem>
      {isMember && (
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="POSTS"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Button color = "transparent"
              onClick={()=>history.push(NOT_AVAILABLE_ROUTE)}
              className={classes.dropdownLink}
            >
              New
            </Button>,
            <Button color = "transparent"
              onClick={()=>history.push(NOT_AVAILABLE_ROUTE)}
              className={classes.dropdownLink}
            >
              Hot
            </Button>,
            <Button color = "transparent"
              onClick={()=>history.push(NOT_AVAILABLE_ROUTE)}
              className={classes.dropdownLink}
            >
              From Yada Jeon Inhyuk
            </Button>,
          ]}
        />
      </ListItem>
      )}

      {isAuth ? (
        <>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={username}
            badgeContent={notifications.length}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Button color = "transparent" onClick={()=> {
                history.push(MY_PROFILE_ROUTE);
                setMobileOpen(false);
              }} className={classes.dropdownLink}>
                <AccountCircle/>
                My Profile
              </Button>,
              <Button color = "transparent" onClick={()=>console.log('notifications')} className={classes.dropdownLink}>
                <Badge
                  badgeContent={notifications.length}
                  variant='dot'
                  color="secondary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Notifications />
                </Badge>
                Notifications
              </Button>,
              <Button color = "transparent" onClick={()=>console.log('language')} className={classes.dropdownLink}>
                <Language />
                Language Setting
              </Button>,
              <Button color = "transparent" onClick={()=>{
                logoutUser();
                return <Redirect to = '/' />;
              }} className={classes.dropdownLink}>
                <ExitToApp />
                Logout
              </Button>
            ]}
          />
        </ListItem>
        </>
      ) : (
        <>
        <ListItem className={classes.listItem}>
          <Button
            color='transparent'
            className={classes.navLink}
            onClick={() => {
              history.push(LOGIN_ROUTE);
              setMobileOpen(false);
            }}
          >
            Login
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
        <Button
          color='transparent'
          className={classes.navLink}
          onClick={() => {
          history.push(SIGNUP_ROUTE);
          setMobileOpen(false);
        }}
        >
          Sign up
        </Button>
        </ListItem>
        </>
      )}


      <ListItem className={classes.listItem}>
        <Tooltip
          id="youtube"
          title="Subscribe us"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={jihbandOfficialYoutubeLink}
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-youtube"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  setMobileOpen: PropTypes.func,
  history: PropTypes.object,
  logoutUser: PropTypes.func,
  username: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isAuth: PropTypes.bool,
  isMember: PropTypes.bool,
  notifications: PropTypes.array,
}

const mapStateToProps = (state) => ({
  isAuth: state.user.auth,
  username: state.user.userData ? state.user.userData.displayName : undefined,
  userId: state.user.userData ? state.user.userData.id : undefined,
  isMember: state.user.auth === true ? (state.user.userData && state.user.userData.points >= 0) : false,
  notifications: ['hello'], //다르게 불러올 것
})


export default withRouter(connect(mapStateToProps, {logoutUser})(HeaderLinks));
