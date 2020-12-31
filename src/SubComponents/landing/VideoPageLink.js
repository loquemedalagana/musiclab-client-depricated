import React from "react";
import PropTypes from "prop-types";
import { GridItem } from "../../components/components";
import { Link } from "react-router-dom";

const VideoPageLink = (props) => {
  const { routeLink, children } = props;

  return (
    <GridItem xs={12} sm={12} md={11} style={{ textAlign: "right" }}>
      <Link to={routeLink}>{children}</Link>
    </GridItem>
  );
};

VideoPageLink.propTypes = {
  routeLink: PropTypes.string,
  children: PropTypes.node,
};

export default VideoPageLink;
