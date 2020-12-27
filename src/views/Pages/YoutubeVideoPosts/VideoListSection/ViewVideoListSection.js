import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
  GridContainer,
  GridItem,
  PostPreview,
} from "../../../../components/components";

import defaultImg from "../../../../assets/images/dolphin_profile.png";

// video data 불러오는거!
import videoListOfJeonInhyukBand from "../../Landing/VideoCarouselSection/videoData/videoListOfJeonInhyukBand";
import InhyukSampleVideoList from "../../../../app/data/yada/InhyukSampleVideoList";
import { getVideoDataListFromPlayList } from "../../../../app/utils/video/youtubeDataProcessing";

// jss style
import styles from "../../../../assets/jss/material-kit-react/views/fragments/previewListStyle";
const useStyles = makeStyles(styles);

export const ViewVideoListSection = (props) => {
  const classes = useStyles();
  const { channelInfo, type, userId, isAdmin } = props;

  // 채널 영상 info 미리 들고오기
  const { channelTitle, image } = channelInfo
    ? channelInfo
    : { channelTitle: undefined, image: defaultImg };

  // 리덕스 기준으로 데이터를 불러온다.
  const resultData =
    type === "official"
      ? getVideoDataListFromPlayList(
          JSON.parse(videoListOfJeonInhyukBand),
          true
        )
      : InhyukSampleVideoList;

  console.log(resultData);

  return (
    <GridContainer className={classes.listContainer} spacing={4}>
      {resultData.map((data, idx) => (
        <GridItem xs={12} sm={12} md={6} key={idx}>
          <PostPreview
            type="youtube"
            authorData={{
              channelTitle:
                channelTitle === undefined ? data.channelTitle : channelTitle,
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

ViewVideoListSection.propTypes = {
  props: PropTypes.object,
  type: PropTypes.oneOf(["official", "channel", "keywords"]),
  children: PropTypes.node,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isAdmin: PropTypes.bool,
  channelInfo: PropTypes.object,
};

export default ViewVideoListSection;
