import React from "react";
import PropTypes from "prop-types";

import { SERVERURL } from "../../../../app/prod";

import { IconButton } from "@material-ui/core";

import {
  FacebookIcon,
  KakaoIcon,
  GoogleIcon,
} from "../../../../assets/customIcons/SocialIcons/SocialIcons";

import { CardHeader } from "../../../../components/components";

const SocialLoginURL = SERVERURL + "/api/users";
const KakaoLoginURL = SocialLoginURL + "/kakao";
const GoogleLoginURL = SocialLoginURL + "/google";
const FacebookLoginURL = SocialLoginURL + "/facebook";

const SocialLoginSection = (props) => {
  const { color, classes } = props;

  const GoogleLogin = () => {
    window.location.assign(GoogleLoginURL);
  };
  const KakaoLogin = () => {
    window.location.assign(KakaoLoginURL);
  };
  const FacebookLogin = () => {
    window.location.assign(FacebookLoginURL);
  };

  return (
    <CardHeader color={color} className={classes.cardHeader}>
      <h4>Sign up with</h4>
      <div className={classes.socialLine}>
        <IconButton size="small" onClick={KakaoLogin}>
          <KakaoIcon />
        </IconButton>
        <IconButton size="small" onClick={GoogleLogin}>
          <GoogleIcon />
        </IconButton>
        <IconButton size="small" onClick={FacebookLogin}>
          <FacebookIcon />
        </IconButton>
      </div>
    </CardHeader>
  );
};

SocialLoginSection.propTypes = {
  color: PropTypes.string,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SocialLoginSection;
