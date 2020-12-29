import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// style components
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
import { Close, YouTube, Movie } from "@material-ui/icons";
import CustomRadioGroup from "../../../components/CustomRadioGroup/CustomRadioGroup";
import { Button, CustomInput, GridItem } from "../../../components/components";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";

// check channel url
import { youtubeReg } from "../../../app/models/user/social";
import { setAlertMsg } from "../../../app/store/alert";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddYoutubeChannel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { setAlertMsg, open, onClose } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [inputs, setInputs] = useState({
    title: "",
    channelURL: "",
    channelType: "",
    content: "",
  });

  const { channelURL, channelType, content, title } = inputs;

  const inputRef = {
    title: useRef(),
    channelURL: useRef(),
    channelType: useRef(),
    content: useRef(),
  };

  const [channelURLModalError, setChannelURLModalError] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let ok = true;

    // 유튜브 regex 추가
    if (channelURL) {
      if (!youtubeReg.test(channelURL)) {
        setChannelURLModalError(true);
        setAlertMsg("올바르지 않은 형식입니다.", "error");
      }
    }

    if (content.length === 0 || title.length === 0) {
      ok = false;
      setContentErr(true);
      setAlertMsg("제목, 내용 모두 입력해주세요", "error");
    }

    if (ok) {
      setContentErr(false);
      setChannelURLModalError(false);
    }
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      scroll={"paper"}
      aria-labelledby="music-sseolprise-about"
      aria-describedby="music-sseolprise-about-detail"
      classes={{
        paper: "scrollbar-rainy-ashville",
      }}
    >
      <DialogTitle
        id="music-sseolprise-about-title"
        disableTypography
        className={classes.modalHeader}
        classes={{
          root: classes.modalHeader,
        }}
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
        id="help-modal-description"
        className={classes.modalBody + " scrollbar-rainy-ashville"}
        dividers={true}
      >
        <GridItem xs={12} sm={12} md={11}>
          <div className={classes.textArea}>
            <p>채널 등록 페이지입니다.</p>
            <p>담당자가 확인한 후 승인이 되면 채널 리스트에 등록됩니다.</p>
          </div>
        </GridItem>

        <br />
        <GridItem xs={12} sm={12} md={11}>
          <CustomInput
            labelText="Your Youtube Channel URL"
            id="add-youtube-channel-link"
            error={channelURLModalError}
            formControlProps={{
              fullWidth: true,
              className: classes.textArea,
            }}
            inputProps={{
              name: "channelURL",
              value: channelURL,
              onChange: onInputHandler,
              inputRef: inputRef.channelURL,
              endAdornment: (
                <InputAdornment position="end">
                  <YouTube className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <CustomRadioGroup
            className={classes.radioGroup}
            title={"Type"}
            name={"channelType"}
            value={channelType}
            onChange={onInputHandler}
            selectItems={[
              { key: "fan", value: "팬 계정" },
              { key: "musician", value: "뮤지션 계정" },
              { key: "etc", value: "etc" },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <CustomInput
            labelText="Youtube Channel Title"
            id="channel-title"
            error={contentErr}
            formControlProps={{
              fullWidth: true,
              className: classes.textArea,
            }}
            inputProps={{
              name: "title",
              value: title,
              onChange: onInputHandler,
              inputRef: inputRef.title,
              endAdornment: (
                <InputAdornment position="end">
                  <Movie className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={11}>
          <CustomInput
            labelText="유튜브 채널에 대해 간단하게 써주세요"
            id="add-channel-request-message"
            error={contentErr}
            formControlProps={{
              fullWidth: true,
              className: classes.textArea,
            }}
            inputProps={{
              multiline: true,
              rows: 5,
              name: "content",
              value: content,
              onChange: onInputHandler,
              inputRef: inputRef.content,
            }}
          />
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

AddYoutubeChannel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  userInfo: PropTypes.object,
  userLoading: PropTypes.bool,
  setAlertMsg: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userLoading: state.user.loading,
  userInfo: state.user.userData,
});

export default connect(mapStateToProps, { setAlertMsg })(AddYoutubeChannel);
