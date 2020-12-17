import React from "react";
import PropTypes from "prop-types";

import InputSocialIcon from "./InputSocialIcon";
import { SOCIAL_NAME_LIST } from "../../app/models/user/social";
import { Link, IconButton } from "@material-ui/core";

const SocialIconButton = (props) => {
  const { snsType, value } = props;
  return (
    <Link component="a" href={value} target="_blank">
      <IconButton color={value ? "primary" : "default"}>
        <InputSocialIcon snsType={snsType} />
      </IconButton>
    </Link>
  );
};

SocialIconButton.propTypes = {
  value: PropTypes.string,
  snsType: PropTypes.oneOf(SOCIAL_NAME_LIST),
};

export default SocialIconButton;
