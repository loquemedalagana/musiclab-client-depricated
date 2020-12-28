import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
  const { channelInfo, type, curUserData } = props;

  const { channelTitle, profileImage } = channelInfo
    ? channelInfo
    : { channelTitle: undefined, profileImage: defaultImg };

  console.log(channelInfo);

  const resultData =
    type === "channel"
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
              profileImage,
            }}
            curUserData={curUserData}
            postData={data}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
};

ViewVideoListSection.propTypes = {
  type: PropTypes.oneOf(["channel", "mylist", "searchresult"]),
  category: PropTypes.oneOf(["official", "fan", "musician", "etc"]),
  children: PropTypes.node,
  curUserData: PropTypes.object,
  channelInfo: PropTypes.shape({
    profileImage: PropTypes.string,
    channelTitle: PropTypes.string,
    channelId: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : null,
});

export default connect(mapStateToProps)(ViewVideoListSection);
