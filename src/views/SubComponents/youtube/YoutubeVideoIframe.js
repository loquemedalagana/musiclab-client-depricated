import React from "react";
import PropTypes from "prop-types";
import { GridContainer } from "../../../components/components";

const YoutubeVideoIframe = (props) => {
  const { videoId } = props;
  return (
    <GridContainer justify="center">
      <h1>{videoId}</h1>
    </GridContainer>
  );
};

YoutubeVideoIframe.propTypes = {
  videoId: PropTypes.string,
};

export default YoutubeVideoIframe;
