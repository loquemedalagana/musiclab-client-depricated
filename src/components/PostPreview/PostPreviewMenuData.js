import React from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Button } from "../components.js";

import { dropdownLink } from "../../assets/jss/material-kit-react/components/postStyle";

const PostPreviewMenuData = (props) => {
  const { isYoutube, curUserData, authorData } = props;

  const classes = classNames({
    [dropdownLink]: true,
  });

  const isYourPost =
    curUserData && authorData.userId
      ? curUserData.userId === authorData.userId
      : false;

  const postMenuData = [
    <Button
      key={uuidv4()}
      color="transparent"
      onClick={() => console.log("view post")}
      className={classes.dropdownLink}
    >
      {`view ${isYoutube ? "video" : "post"}`}
    </Button>,
  ];

  if (isYoutube && curUserData && curUserData.points >= 0) {
    postMenuData.push(
      <Button
        key={uuidv4()}
        color="transparent"
        onClick={() => console.log("add in my list")}
        className={classes.dropdownLink}
      >
        add to my list
      </Button>
    );
  } else {
    if (isYourPost) {
      postMenuData.push(
        <Button
          key={uuidv4()}
          color="transparent"
          onClick={() => console.log("edit post")}
          className={classes.dropdownLink}
        >
          edit post
        </Button>
      );
      postMenuData.push(
        <Button
          key={uuidv4()}
          color="transparent"
          onClick={() => console.log("delete post")}
          className={classes.dropdownLink}
        >
          delete post
        </Button>
      );
    }
  }

  return postMenuData;
};

PostPreviewMenuData.propTypes = {
  isYoutube: PropTypes.bool,

  curUserData: PropTypes.object,

  authorData: PropTypes.shape({
    channelTitle: PropTypes.string,
    displayName: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string, //user avatar img or channel avatar img
  }),

  postData: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    publishedAt: PropTypes.string,
    description: PropTypes.string,
    videoId: PropTypes.string,
  }),
};

export default PostPreviewMenuData;
