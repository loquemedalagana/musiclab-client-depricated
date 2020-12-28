import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";
import { Close } from "@material-ui/icons";
import { Button } from "../../../components/components";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddYoutubeVideo = (props) => {
  const classes = useStyles();
  const { setAlertMsg, open, onClose, curUserData } = props;

  const onSubmitHandler = useCallback(() => {
    console.log("video added!");
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
        id="classic-modal-slide-description"
        className={classes.modalBody + " scrollbar-rainy-ashville"}
      ></DialogContent>

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
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(AddYoutubeVideo);
