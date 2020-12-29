/*eslint no-useless-escape: "off"*/
import React, { useCallback, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setAlertMsg } from "../../../app/store/alert";
// material ui
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import NoAuthErrorModal from "../error/NoAuthErrorModal";
import CustomRadioGroup from "../../../components/CustomRadioGroup/CustomRadioGroup";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";
import { Close, YouTube, LocalOffer, Search } from "@material-ui/icons";
import {
  Button,
  GridContainer,
  GridItem,
  CustomInput,
} from "../../../components/components";
import VideoIframe from "../../../components/VideoIframe/VideoIframe";

import inputResult from "../../../app/inputValidation/inputResult";
import { YOUTUBE_VIDEOID_LENGTH } from "../../../app/inputValidation/constants";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getVideoId = (youtubeURL) => {
  // 값 반환 못하면 null 반환
  const startShortURL = "https://youtu.be/";
  const startLongURL = "https://www.youtube.com/watch?v=";

  if (youtubeURL.substring(0, startShortURL.length) === startShortURL) {
    return youtubeURL.substring(
      startShortURL.length,
      startShortURL.length + YOUTUBE_VIDEOID_LENGTH
    );
  } else if (youtubeURL.substring(0, startLongURL.length) === startLongURL) {
    return youtubeURL.substring(
      startLongURL.length,
      startLongURL.length + YOUTUBE_VIDEOID_LENGTH
    );
  } else {
    return "";
  }
};

// 해시태그 유효성 검사
class CheckTagInputValidation {
  constructor({ tag, tags }) {
    this.haveSpace = /\s+/g.test(tag);
    this.isEmptyInput = tag.length === 0;
    this.isAlreadyExist = tags.includes(tag);
    this.hasContainNumber = /[0-9]+/g.test(tag);
    this.hasContainSpecialChar = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi.test(
      tag
    );
  }

  getResult() {
    if (this.isEmptyInput) return inputResult(false, "태그를 입력해주세요.");
    if (this.haveSpace)
      // 앞뒤 공백 자르는거도 갠춘
      return inputResult(false, "태그에는 공백이 들어갈 수 없습니다.");
    if (this.isAlreadyExist)
      return inputResult(false, "이미 입력받은 태그입니다.");

    // 숫자, 특수문자 X
    if (this.hasContainNumber)
      return inputResult(false, "숫자는 태그가 될 수 없습니다.");
    if (this.hasContainSpecialChar)
      return inputResult(
        false,
        "-,_를 제외한 특수문자는 입력받을 수 없습니다."
      );
    return inputResult(true);
  }
}

const AddYoutubeVideo = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { setAlertMsg, open, onClose, curUserData, curUserLoading } = props;

  const [YoutubePreview, setYoutubePreview] = useState(null);
  const [inputs, setInputs] = useState({
    youtubeVideoURL: "",
    videoType: "",
    tag: "",
  });
  const { youtubeVideoURL, videoType, tag } = inputs;
  const [tags, setTags] = useState([]);
  const inputRef = {
    youtubeVideoURL: useRef(),
    videoType: useRef(),
    tag: useRef(),
  };

  const onSubmitHandler = useCallback(() => {
    console.log(inputs, tags);
  }, [inputs, tags]);

  const onInputHandler = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const handleYoutubePreview = useCallback((videoId) => {
    if (videoId.length !== YOUTUBE_VIDEOID_LENGTH) return;
    setYoutubePreview(
      <VideoIframe id={"youtube-preview"} videoId={videoId} title={"preview"} />
    );
  }, []);

  const removeYoutubePreview = useCallback(() => {
    setYoutubePreview(null);
  }, []);

  const onYoutubePreviewHandler = useCallback(() => {
    const videoId = getVideoId(youtubeVideoURL.trim());
    if (videoId.length === 0 || videoId.length !== YOUTUBE_VIDEOID_LENGTH) {
      inputRef.youtubeVideoURL.current.focus();
      removeYoutubePreview();
      setAlertMsg("올바른 양식이 아닙니다.", "error");
    } else {
      handleYoutubePreview(videoId);
      setAlertMsg("유튜브 주소", "success");
    }
  }, [
    setAlertMsg,
    youtubeVideoURL,
    handleYoutubePreview,
    removeYoutubePreview,
    inputRef.youtubeVideoURL,
  ]);

  const addTagHandler = useCallback(() => {
    const tagInputCheck = new CheckTagInputValidation({ tag, tags });
    const { ok, message } = tagInputCheck.getResult();
    if (!ok) {
      setAlertMsg(message, "error");
      return;
    }
    setTags([...tags, tag]);
    console.log(tags);
  }, [tag, tags, setAlertMsg]);

  const removeTagHandler = useCallback((removedTag) => {
    console.log(removedTag);
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (e.target.name === "youtubeVideoURL") {
          onYoutubePreviewHandler();
        }
        switch (e.target.name) {
          case "youtubeVideoURL":
            return onYoutubePreviewHandler();
          case "tag":
            return addTagHandler();
          default:
            return onSubmitHandler();
        }
      }
    },
    [onYoutubePreviewHandler, addTagHandler, onSubmitHandler]
  );

  return !curUserLoading && !curUserData ? (
    <NoAuthErrorModal open={open} onClose={onClose} />
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={isMobile}
      scroll={"paper"}
      fullWidth={true}
      aria-labelledby="music-sseolprise-about"
      aria-describedby="add-youtube-video"
      classes={{
        paper: "scrollbar-rainy-ashville",
      }}
    >
      <DialogTitle
        id="add-youtube-video-title"
        disableTypography
        className={classes.modalHeader}
      >
        <IconButton
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h3 className={classes.modalTitle}>Music SSeolprise by Jeon Inhyuk</h3>
        <h5 className={classes.modalTitle}>야다 전인혁의 뮤직 썰!프라이즈</h5>
      </DialogTitle>

      <DialogContent
        id="add-new-youtube-video-description"
        className={classes.modalBody + " scrollbar-rainy-ashville"}
        dividers={true}
      >
        <GridContainer
          justify="center"
          alignContent="flex-end"
          alignItems="flex-end"
        >
          <GridItem xs={12} sm={12} md={11}>
            <CustomInput
              labelText="Youtube Video URL"
              id="new-youtube-video-url"
              formControlProps={{
                fullWidth: true,
                className: classes.textArea,
              }}
              inputProps={{
                name: "youtubeVideoURL",
                value: youtubeVideoURL,
                onChange: onInputHandler,
                inputRef: inputRef.youtubeVideoURL,
                onKeyDown: handleKeyPress,
                endAdornment: (
                  <InputAdornment position="end">
                    <YouTube className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={11}>
            <div className={classes.textArea}>
              <Button
                color="primary"
                size="sm"
                round
                onClick={onYoutubePreviewHandler}
              >
                <Search className={classes.miniButtonIcon} />
              </Button>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={11}>
            {YoutubePreview}
          </GridItem>
        </GridContainer>
        <GridItem xs={12} sm={12} md={11}>
          <CustomRadioGroup
            className={classes.radioGroup}
            title={"Type"}
            name={"videoType"}
            value={videoType}
            onChange={onInputHandler}
            selectItems={[
              { key: "Inhyuk", value: "인혁 영상" },
              { key: "cover", value: "커버 영상" },
              { key: "etc", value: "etc" },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <div className={classes.textArea}>
            <h4>Tags</h4>
            <h5>태그를 입력해주세요</h5>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <CustomInput
            labelText="Tag Name"
            id="new-youtube-tag"
            formControlProps={{
              fullWidth: true,
              className: classes.textArea,
            }}
            inputProps={{
              name: "tag",
              value: tag,
              onChange: onInputHandler,
              inputRef: inputRef.youtubeVideoURL,
              onKeyDown: handleKeyPress,
              endAdornment: (
                <InputAdornment position="end">
                  <LocalOffer className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <div className={classes.textArea}>
            <Button color="primary" size="sm" round onClick={addTagHandler}>
              add
            </Button>
          </div>
        </GridItem>

        <GridItem xs={12} sm={12} md={11}>
          <div className={classes.textArea}>
            <h4>여기다 태그 나옴</h4>
          </div>
        </GridItem>
      </DialogContent>

      <DialogActions>
        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddYoutubeVideo.propTypes = {
  curUserLoading: PropTypes.bool,
  curUserData: PropTypes.object,
  setAlertMsg: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
  curUserLoading: state.user.loading,
});

export default connect(mapStateToProps, { setAlertMsg })(AddYoutubeVideo);
