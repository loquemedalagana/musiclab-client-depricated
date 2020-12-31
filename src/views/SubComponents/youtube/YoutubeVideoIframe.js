import React from "react";
import PropTypes from "prop-types";
import { GridContainer, GridItem } from "../../../components/components";
import VideoIframe from "../../../components/VideoIframe/VideoIframe";

const YoutubeVideoIframe = (props) => {
  const { videoId, title } = props;
  return (
    <GridContainer justify="center" id="play">
      <GridItem xs={12} sm={12} md={8}>
        <VideoIframe videoId={videoId} title={title} id="play-video" />
      </GridItem>
    </GridContainer>
  );
};

YoutubeVideoIframe.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
};

export default YoutubeVideoIframe;
