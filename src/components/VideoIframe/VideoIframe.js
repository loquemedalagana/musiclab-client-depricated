import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const VideoIframe = (props) => {
  const { videoId, autoPlay, id, title } = props;
  const videoURL = `https://www.youtube.com/embed/${videoId}${
    autoPlay ? "?autoplay=1" : ""
  }`;

  const [iframeDOM, setIframeDOM] = useState(null);
  const [videoHeight, setVideoHeight] = useState(320);

  const handleChangeVideoWidth = useCallback(() => {
    return setVideoHeight(
      // 사이즈가 변할 때마다 높이도 같이 바뀜
      Math.floor(window.document.getElementById(id).offsetWidth * 0.5625)
    );
  }, [id]);

  useEffect(() => {
    setIframeDOM(window.document.getElementById(id));
  }, [id, iframeDOM]);

  useEffect(() => {
    window.addEventListener("resize", handleChangeVideoWidth);
    setVideoHeight(
      // 로딩 후 높이 부분이 비율에 맞춰짐
      Math.floor(window.document.getElementById(id).offsetWidth * 0.5625)
    );
    return function cleanup() {
      window.removeEventListener("resize", handleChangeVideoWidth);
    };
  }, [id, iframeDOM, videoHeight, handleChangeVideoWidth]);

  return (
    <iframe
      id={id}
      title={title}
      width="100%"
      height={`${videoHeight}px`}
      src={videoURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

VideoIframe.propTypes = {
  videoId: PropTypes.string,
  autoPlay: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default VideoIframe;
