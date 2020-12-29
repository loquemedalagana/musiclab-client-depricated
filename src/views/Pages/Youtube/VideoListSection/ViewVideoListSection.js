import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import qs from "qs";

// styled component
import { makeStyles } from "@material-ui/core/styles";
import {
  GridContainer,
  GridItem,
  PostPreview,
} from "../../../../components/components";
import EmptyContainer from "./EmptyContainer";
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
  const { channelInfo, type, curUserData, match } = props;
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  // 스크롤바 위치 읽는 함수
  const getScrollbarPosition = useCallback(() => {
    const windowsScrollTop = window.pageYOffset;
    //console.log(windowsScrollTop);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", getScrollbarPosition);
    return function cleanup() {
      window.removeEventListener("scroll", getScrollbarPosition);
    };
  }, [getScrollbarPosition]);

  // 영상 리스트 selector (내꺼일땐 user에서, 그 외에는 youtube selector에서)
  const {
    youtubeVideoList,
    loadVideoListLoading,
    loadVideoListDone,
    loadVideoListError,
  } = useSelector((state) => (type === "mylist" ? state.user : state.youtube));

  // 테스트용 코드
  console.log(
    type,
    youtubeVideoList,
    loadVideoListLoading,
    loadVideoListDone,
    loadVideoListError
  );

  // 1. my list (내 영상 불러오는 액션)
  // 2. 채널 리스트 (채널 영상 불러오는 액션)
  // 3. 검색 결과 리스트 (검색 결과 불러오는 액션)

  const { channelTitle, profileImage } = channelInfo
    ? channelInfo
    : { channelTitle: undefined, profileImage: defaultImg };

  console.log(match, query);
  console.log(type, channelInfo);

  const resultData =
    type === "channel"
      ? getVideoDataListFromPlayList(
          JSON.parse(videoListOfJeonInhyukBand),
          true
        )
      : InhyukSampleVideoList;

  // 로딩 끝났는데 빈 배열이면 검색결과 없다는 메시지 반환
  if (!loadVideoListLoading && loadVideoListDone && youtubeVideoList === [])
    return <EmptyContainer />;

  return (
    <GridContainer
      className={classes.listContainer}
      spacing={4}
      id={"youtube-video-list"}
    >
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
  type: PropTypes.oneOf(["channel", "mylist", "searchresult"]).isRequired,
  category: PropTypes.oneOf(["official", "fan", "musician", "etc"]),
  children: PropTypes.node,
  curUserData: PropTypes.object,
  channelInfo: PropTypes.shape({
    profileImage: PropTypes.string,
    channelTitle: PropTypes.string,
    channelId: PropTypes.string,
  }),
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : null,
});

export default connect(mapStateToProps)(React.memo(ViewVideoListSection));
