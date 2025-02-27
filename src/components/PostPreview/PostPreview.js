import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/material-kit-react/components/postPreviewStyle";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
} from "@material-ui/core";

import {
  Favorite as LikeIcon,
  QuestionAnswer as DiscussIcon,
  MoreVert as ShowPostMenuIcon,
  ExpandMoreRounded as ViewMoreIcon,
} from "@material-ui/icons";

import { CustomDropdown, PostPreviewMenuData } from "../components.js";

const useStyles = makeStyles(styles);

//cardMedia 유튜브 주소로 가능?

const PostPreview = (props) => {
  const classes = useStyles();
  const { type, authorData, postData, curUserData, history } = props;

  const { thumbnail, title, publishedAt, description, videoId } = postData;

  const isYoutube = type === "youtube";
  const postMenuData = PostPreviewMenuData({
    isYoutube: type === "youtube",
    authorData,
    curUserData,
    postData,
    history,
  });

  const mediaURL = "https://youtu.be/" + videoId;
  const authorName =
    type === "post" ? authorData.displayName : authorData.channelTitle;
  const { profileImage } = authorData;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const viewMedia = () => {
    if (isYoutube) return (window.open("about:blank").location.href = mediaURL);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
        }}
        avatar={<Avatar aria-label="channel-title" src={profileImage} />}
        action={
          //mini menu will be added
          <CustomDropdown
            caret={false}
            buttonIcon={ShowPostMenuIcon}
            hoverColor="rose"
            noLiPadding
            buttonProps={{
              justIcon: true,
              color: "transparent",
              className: classes.showPostMenu,
            }}
            dropdownList={postMenuData}
          />
        }
        disableTypography
        title={<h5 className={classes.authorName}>{authorName}</h5>}
        subheader={<h6 className={classes.publishtedAt}>{publishedAt}</h6>}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        src={mediaURL}
        onClick={viewMedia}
      />

      <CardContent
        classes={{
          root: classes.cardBody,
        }}
      >
        <h4 className={classes.postTitle}>{title}</h4>
      </CardContent>

      <CardActions
        disableSpacing
        classes={{
          root: classes.cardFooter,
        }}
      >
        <IconButton aria-label="add to like">
          <LikeIcon />
        </IconButton>

        <IconButton aria-label="discuss">
          <DiscussIcon />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ViewMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          classes={{
            root: classes.cardFooter,
          }}
        >
          <p>{description}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
};

PostPreview.propTypes = {
  history: PropTypes.object,
  type: PropTypes.oneOf(["youtube", "post"]),
  children: PropTypes.node,

  curUserData: PropTypes.object,

  authorData: PropTypes.shape({
    channelTitle: PropTypes.string,
    displayName: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    profileImage: PropTypes.string, //user avatar img or channel avatar img
  }),

  postData: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    publishedAt: PropTypes.string,
    description: PropTypes.string,
    videoId: PropTypes.string,
  }),
};

export default withRouter(PostPreview);
