import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import {
  PostAddSharp,
  VideoCallSharp,
  AddAPhotoSharp,
  YouTube,
} from "@material-ui/icons";

import styles from "../../assets/jss/material-kit-react/views/navigations/footerMenuStyle";

const useStyles = makeStyles(styles);

const menuItems = [
  { icon: <PostAddSharp />, name: "새 글 작성" },
  { icon: <AddAPhotoSharp />, name: "사진 등록" },
  { icon: <VideoCallSharp />, name: "영상 등록" },
  { icon: <YouTube />, name: "채널 등록" },
];

const FooterMenu = (props) => {
  const classes = useStyles();
  const footerMenuClasses = classNames({
    [classes.wrapper]: true,
    [classes.fixed]: true,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { curUserData } = props;

  return curUserData && curUserData.points >= 0 ? (
    <div className={footerMenuClasses}>
      <SpeedDial
        ariaLabel={"right-bottom-navigation"}
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
      >
        {menuItems.map((menuItem, index) => (
          <SpeedDialAction
            key={index}
            icon={menuItem.icon}
            tooltipTitle={menuItem.name}
            tooltipOpen={true}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  ) : null;
};

FooterMenu.propTypes = {
  curUserData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(FooterMenu);
