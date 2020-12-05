import React from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Button } from "../components.js";

import { dropdownLink } from "../../assets/jss/material-kit-react/components/postStyle";

const PostMenuData = (props) => {
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
      view post
    </Button>,
  ];

  if (isYoutube) {
    postMenuData.push(
      <Button
        key={uuidv4()}
        color="transparent"
        onClick={() => console.log("add in my list")}
        className={classes.dropdownLink}
      >
        add in my list
      </Button>
    );
  } else {
    //if your post or you are admin?
    //add edit and delete
    if (isYourPost || curUserData.isAdmin) {
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

PostMenuData.propTypes = {
  isYoutube: PropTypes.bool,

  curUserData: PropTypes.shape({
    isAdmin: PropTypes.bool,
    userId: PropTypes.string,
  }),

  authorData: PropTypes.shape({
    channelTitle: PropTypes.string,
    displayName: PropTypes.string,
    userId: PropTypes.string,
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

export default PostMenuData;
