import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-kit-react/components/postPreviewStyle';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core';

import {
  Favorite as LikeIcon,
  QuestionAnswer as DiscussIcon,
  MoreVert as ShowPostMenuIcon,
  ExpandMoreRounded as ViewMoreIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(styles);

//cardMedia 유튜브 주소로 가능?

const PostPreview = props => {
  const classes = useStyles();
  const {
    type,
    authorData,
    postData,
  } = props;

  const {
    thumbnail,
    title,
    publishedAt,
    description,
    videoId,
  } = postData;

  const mediaURL = "https://youtu.be/" + videoId;
  const authorName = type === 'post' ? authorData.displayName : authorData.channelTitle;
  const {image} = authorData;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar
            aria-label="channel-title"
            src={image}
          />
        }
        action={ //mini menu will be added
          <IconButton area-label="post-menu">
            <ShowPostMenuIcon />
          </IconButton>
        }
        title={authorName}
        subheader={publishedAt}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        src={mediaURL}
      />

      {/*미리보기할 내용..*/}
      <CardContent>
        
        <Typography variant="body2" color="textSecondary" component="h3">
          {title}
        </Typography>        
      </CardContent>

      <CardActions disableSpacing>
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
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

PostPreview.propTypes = {
  type: PropTypes.oneOf([
    "youtube",
    "post",
  ]),
  children: PropTypes.node,

  authorData: PropTypes.shape({
    channelTitle: PropTypes.string,
    displayName: PropTypes.string,
    image: PropTypes.string, //user avatar img or channel avatar img
  }),

  postData: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    publishedAt: PropTypes.string,
    description: PropTypes.string,
    videoId: PropTypes.string,
  })
};


export default PostPreview
