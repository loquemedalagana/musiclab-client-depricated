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
import videoListOfJeonInhyukBand from "../../../../test/mockingData/videos/jsonString/videoListOfJeonInhyukBand";
import { officialChannelProfileData } from "../../../../app/data/yada/officialChannelData";
import InhyukSampleVideoList from "../../../../app/data/yada/InhyukSampleVideoList";

// jss style
import styles from "../../../../assets/jss/material-kit-react/views/fragments/previewListStyle";
import { getVideoDataListFromPlayList } from "../../../../app/utils/video/youtubeDataProcessing";
const useStyles = makeStyles(styles);

export const ViewVideoListSection = (props) => {
  const classes = useStyles();
  const { videoListId, type, userId, isAdmin } = props;
  const [channelInfo] = officialChannelProfileData.filter(
    ({ playListId }) => playListId === videoListId
  );

  const { channelTitle, image } = channelInfo
    ? channelInfo
    : { channelTitle: undefined, image: defaultImg };

  // 백앤드에서 쿼리를 때린 후 데이터 불러온다.
  const resultData =
    type === "official"
      ? getVideoDataListFromPlayList(
          JSON.parse(videoListOfJeonInhyukBand),
          true
        )
      : InhyukSampleVideoList;

  // 채널 info가 없을 때는 회원 프로필 혹은 일반 데이터로 하기
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
  userId: PropTypes.string,
  isAdmin: PropTypes.bool,
  videoListId: PropTypes.string,
};

export default ViewVideoListSection;
