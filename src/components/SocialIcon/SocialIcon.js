import React from "react";
import PropTypes from "prop-types";
import styles from "../../assets/jss/material-kit-react/components/socialIconStyle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Cloud as SoundCloud,
  Facebook,
  Home as Blog,
  Instagram,
  Twitter,
  YouTube,
} from "@material-ui/icons";

import { SOCIAL_LIST } from "../../app/helper/auth/social";

const useStyles = makeStyles(styles);

const SocialIcon = (props) => {
  const classes = useStyles();
  const { snsType } = props;

  switch (snsType) {
    case "youtube":
      return <YouTube className={classes.inputIconsColor} />;
    case "facebook":
      return <Facebook className={classes.inputIconsColor} />;
    case "twitter":
      return <Twitter className={classes.inputIconsColor} />;
    case "instagram":
      return <Instagram className={classes.inputIconsColor} />;
    case "soundcloud":
      return <SoundCloud className={classes.inputIconsColor} />;
    default:
      return <Blog className={classes.inputIconsColor} />;
  }
};

SocialIcon.propTypes = {
  snsType: PropTypes.oneOf(SOCIAL_LIST),
};

export default SocialIcon;
