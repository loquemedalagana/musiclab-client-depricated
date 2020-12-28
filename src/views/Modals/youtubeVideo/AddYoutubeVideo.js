import React from "react";
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
const useStyles = makeStyles(styles);

const AddYoutubeVideo = (props) => {
  const classes = useStyles();

  return <Dialog></Dialog>;
};

AddYoutubeVideo.propTypes = {
  curUserData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  curUserData: state.user.userData ? state.user.userData : undefined,
});

export default connect(mapStateToProps)(AddYoutubeVideo);
