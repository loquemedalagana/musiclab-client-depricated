import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import AddYoutubeVideo from "../Modals/youtubeVideo/AddYoutubeVideo";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import {
  PostAddSharp,
  VideoCallSharp,
  AddAPhotoSharp,
  YouTube,
} from "@material-ui/icons";

import styles from "../../assets/jss/material-kit-react/views/navigations/footerMenuStyle";

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

  const menuItems = [
    { icon: <PostAddSharp />, name: "새 글 작성" },
    { icon: <AddAPhotoSharp />, name: "사진 등록" },
    {
      icon: <VideoCallSharp />,
      name: "영상 등록",
      callback: handleYoutubeVideoOpen,
    },
    { icon: <YouTube />, name: "채널 등록" },
  ];

  const { curUserData } = props;
  return curUserData && curUserData.points >= 0 ? (
    <>
      <AddYoutubeVideo
        open={addYoutubeVideoOpen}
        onClose={handleYoutubeVideoClose}
      />
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
              tooltipOpen={true}
              onClick={menuItem.callback}
              title={"add-items"}
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
