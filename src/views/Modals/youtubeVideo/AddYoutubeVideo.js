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
} from "@material-ui/core";
import NoAuthErrorModal from "../error/NoAuthErrorModal";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";
import { Close } from "@material-ui/icons";
import {
  Button,
  GridContainer,
  GridItem,
  CustomInput,
} from "../../../components/components";
import VideoIframe from "../../../components/VideoIframe/VideoIframe";

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

const AddYoutubeVideo = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { setAlertMsg, open, onClose, curUserData, curUserLoading } = props;

  const [YoutubePreview, setYoutubePreview] = useState(null);

  const [inputs, setInputs] = useState({
    youtubeVideoURL: "",
    videoType: "",
  });

  const { youtubeVideoURL } = inputs;
  const inputRef = {
    youtubeVideoURL: useRef(),
    videoType: useRef(),
  };

  const handleYoutubePreview = useCallback((videoId) => {
    if (videoId.length !== YOUTUBE_VIDEOID_LENGTH) return;
    setYoutubePreview(
      <VideoIframe id={"youtube-preview"} videoId={videoId} title={"preview"} />
    );
  }, []);

  const removeYoutubePreview = useCallback(() => {
    setYoutubePreview(null);
  }, []);

  //const dispatch = useDispatch();
  const onPreviewHandler = useCallback(() => {
    const videoId = getVideoId(youtubeVideoURL.trim());
    console.log(videoId);
    console.log(inputs);
    if (videoId.length === 0 || videoId.length !== YOUTUBE_VIDEOID_LENGTH) {
      inputRef.youtubeVideoURL.current.focus();
      removeYoutubePreview();
      setAlertMsg("올바른 양식이 아닙니다.", "error");
    } else {
      handleYoutubePreview(videoId);
      setAlertMsg("유튜브 주소", "success");
    }
  }, [
    inputs,
    setAlertMsg,
    youtubeVideoURL,
    handleYoutubePreview,
    removeYoutubePreview,
    inputRef.youtubeVideoURL,
  ]);

  const onYoutubeURLinputHandler = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (e.target.name === "youtubeVideoURL") {
          onPreviewHandler();
        }
      }
    },
    [handleYoutubePreview, onPreviewHandler]
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
        dividers={isMobile}
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
              onChange: onYoutubeURLinputHandler,
              inputRef: inputRef.youtubeVideoURL,
              onKeyDown: handleKeyPress,
            }}
          />
        </GridItem>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={11}>
            {YoutubePreview}
          </GridItem>
        </GridContainer>
      </DialogContent>

      <DialogActions>
        <Button simple color="primary" size="lg" onClick={onPreviewHandler}>
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
