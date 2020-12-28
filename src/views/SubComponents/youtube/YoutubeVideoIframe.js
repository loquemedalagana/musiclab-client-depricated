import React from "react";
import PropTypes from "prop-types";
import { GridContainer, GridItem } from "../../../components/components";
import VideoIframe from "../../../components/VideoIframe/VideoIframe";

const YoutubeVideoIframe = (props) => {
  const { videoId } = props;
  return (
    <GridContainer justify="center" id="play">
      <GridItem xs={12} sm={12} md={8}>
        <VideoIframe videoId={videoId} id="play-video" />
      </GridItem>
    </GridContainer>
  );
};

YoutubeVideoIframe.propTypes = {
  videoId: PropTypes.string,
};

export default YoutubeVideoIframe;
