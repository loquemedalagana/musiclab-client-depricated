import React, { useCallback, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setAlertMsg } from "../../../app/store/alert";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
} from "@material-ui/core";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";
import { Close } from "@material-ui/icons";
import {
  Button,
  GridContainer,
  GridItem,
  CustomInput,
} from "../../../components/components";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// 모바일일 때는 full width로 한다.

const AddYoutubeVideo = (props) => {
  const classes = useStyles();
  const { setAlertMsg, open, onClose } = props;
  const [youtubeVideoURL, setYoutubeVideoURL] = useState("");
  const youtubeURLinputRef = useRef();

  const dispatch = useDispatch();
  const onSubmitHandler = useCallback(() => {
    console.log("video added!");
    dispatch(setAlertMsg("유튜브 주소"), "error");
  }, [dispatch, setAlertMsg]);

  const onYoutubeURLinputHandler = useCallback((event) => {
    setYoutubeVideoURL(event.currentTarget.value);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
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
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <p>유튜브 주소 입력</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Youtube Video URL"
              id="new-youtube-video-url"
              formControlProps={{
                fullWidth: true,
                className: classes.textArea,
              }}
              inputProps={{
                name: "title",
                value: youtubeVideoURL,
                onChange: onYoutubeURLinputHandler,
                inputRef: youtubeURLinputRef,
              }}
            />
          </GridItem>
        </GridContainer>
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
  curUserData: PropTypes.object,
  setAlertMsg: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps, { setAlertMsg })(AddYoutubeVideo);
