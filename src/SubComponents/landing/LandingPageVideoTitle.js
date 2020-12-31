import React from "react";
import PropTypes from "prop-types";
import { GridItem } from "../../components/components";

const LandingPageVideoTitle = (props) => {
  const { landingPageVideoCategoryTitle, className } = props;

  return (
    <GridItem xs={12} sm={12} md={11}>
      <h2 className={className}>{landingPageVideoCategoryTitle}</h2>
    </GridItem>
  );
};

LandingPageVideoTitle.propTypes = {
  landingPageVideoCategoryTitle: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default LandingPageVideoTitle;
