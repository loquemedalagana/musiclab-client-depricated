import React from "react";
import PropTypes from "prop-types";

const VideoIframe = (props) => {
  const { videoId, width, height } = props;

  const videoURL = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width={width}
      height={height}
      src={videoURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

VideoIframe.propTypes = {
  videoId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default VideoIframe;
