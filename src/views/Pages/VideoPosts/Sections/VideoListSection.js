import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  GridItem,
  PostPreview,
} from "../../../../components/components";

// video data 불러오는거!
import videoListOfJeonInhyukBand from "../../../../test/mockingData/videos/jsonString/videoListOfJeonInhyukBand";
import { officialChannelProfileData } from "../../../../app/data/yada/officialChannelData";

// jss style
import styles from "../../../../assets/jss/material-kit-react/views/fragments/previewListStyle";
import { getVideoDataListFromPlayList } from "../../../../app/utils/video/youtubeDataProcessing";
const useStyles = makeStyles(styles);

export const VideoListSection = (props) => {
  const classes = useStyles();
  const { videoListId, type, userId, isAdmin } = props;
  const [channelInfo] = officialChannelProfileData.filter(
    ({ playListId }) => playListId === videoListId
  );

  const { channelTitle, image } = channelInfo;
  const resultData = getVideoDataListFromPlayList(
    JSON.parse(videoListOfJeonInhyukBand),
    true
  );

  return (
    <GridContainer className={classes.listContainer} spacing={4}>
      {resultData.map((data, idx) => (
        <GridItem xs={12} sm={12} md={6} key={idx}>
          <PostPreview
            type="youtube"
            authorData={{
              channelTitle,
              image,
            }}
            curUserData={{
              userId,
              isAdmin,
            }}
            postData={data}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
};

VideoListSection.propTypes = {
  props: PropTypes.object,
  type: PropTypes.oneOf(["official", "channel", "keywords"]),
  children: PropTypes.node,
  userId: PropTypes.string,
  isAdmin: PropTypes.bool,
  videoListId: PropTypes.string,
};

export default VideoListSection;
