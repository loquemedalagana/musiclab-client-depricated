import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import {
  PostAddSharp,
  GroupAddRounded,
  AddAPhotoSharp,
  YouTube,
} from "@material-ui/icons";

// menu components
import AddYoutubeVideo from "../../modals/youtubeVideo/AddYoutubeVideo";
import AddNewPost from "../../modals/post/AddNewPost";
import AddYoutubeChannel from "../../modals/youtubeVideo/AddYoutubeChannel";

import styles from "../../../assets/jss/material-kit-react/views/navigations/footerMenuStyle";

const useStyles = makeStyles(styles);

const FooterMenu = (props) => {
  const classes = useStyles();
  const footerMenuClasses = classNames({
    [classes.wrapper]: true,
    [classes.fixed]: true,
  });

  const [menuButtonOpen, setMenuButtonOpen] = useState(false);
  const handleMenuButtonOpen = () => {
    setMenuButtonOpen(true);
  };
  const handleMenuButtonClose = () => {
    setMenuButtonOpen(false);
  };

  const [addYoutubeVideoOpen, setYoutubeVideoOpen] = useState(false);
  const handleYoutubeVideoOpen = () => {
    setYoutubeVideoOpen(true);
  };
  const handleYoutubeVideoClose = () => {
    setYoutubeVideoOpen(false);
  };

  const [addYoutubeChannelOpen, setAddYoutubeChannelOpen] = useState(false);
  const handleAddYoutubeChannelOpen = () => {
    setAddYoutubeChannelOpen(true);
  };
  const handleAddYoutubeChannelClose = () => {
    setAddYoutubeChannelOpen(false);
  };

  const [addPostOpen, setAddPostOpen] = useState(false);
  const handleAddPostOpen = () => {
    setAddPostOpen(true);
  };
  const handleAddPostClose = () => {
    setAddPostOpen(false);
  };

  const menuItems = [
    {
      icon: <PostAddSharp />,
      name: "새 글 작성",
      title: "new post",
      callback: handleAddPostOpen,
    },
    { icon: <AddAPhotoSharp />, name: "사진 등록", title: "new photo" },
    {
      icon: <GroupAddRounded />,
      name: "채널 등록",
      title: "add youtube channel",
      callback: handleAddYoutubeChannelOpen,
    },
    {
      icon: <YouTube />,
      name: "영상 등록",
      callback: handleYoutubeVideoOpen,
      title: "add youtube video",
    },
  ];

  const { curUserData } = props;
  return curUserData && curUserData.points >= 0 ? (
    <>
      <AddYoutubeVideo
        open={addYoutubeVideoOpen}
        onClose={handleYoutubeVideoClose}
      />
      <AddYoutubeChannel
        open={addYoutubeChannelOpen}
        onClose={handleAddYoutubeChannelClose}
      />
      <AddNewPost open={addPostOpen} onClose={handleAddPostClose} />
      <div className={footerMenuClasses}>
        <SpeedDial
          ariaLabel={"right-bottom-navigation"}
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onOpen={handleMenuButtonOpen}
          onClose={handleMenuButtonClose}
          open={menuButtonOpen}
        >
          {menuItems.map((menuItem, index) => (
            <SpeedDialAction
              key={index}
              icon={menuItem.icon}
              tooltipTitle={menuItem.name}
              onClick={menuItem.callback}
              title={menuItem.title}
            />
          ))}
        </SpeedDial>
      </div>
    </>
  ) : null;
};

FooterMenu.propTypes = {
  curUserData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(FooterMenu);
