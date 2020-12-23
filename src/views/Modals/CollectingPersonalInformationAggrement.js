import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
} from "@material-ui/core";

import GridContainer from "../../components/Grid/GridContainer";
import Button from "../../components/CustomButtons/Button";

import Close from "@material-ui/icons/Close";
import CollectingPersonalInformationAggrementText from "../../app/helper/CollectingPersonalInformationAggrement/CollectingPersonalInformationAggrementText";
import { CHECK_AGREEMENT_HELPER } from "../../app/helper/auth/helperTexts";

import styles from "../../assets/jss/material-kit-react/components/modalStyle";
import { GridItem } from "../../components/components";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CollectingPersonalInformationAgreement = (props) => {
  const classes = useStyles();
  const {
    open,
    onClose,
    setCheckedAgreement,
    setChangeHelperText,
    ...rest
  } = props;

  const handleCheckAgree = () => {
    setCheckedAgreement(true);
    setChangeHelperText(CHECK_AGREEMENT_HELPER + " (동의함)");
    onClose();
  };

  const handleCheckDisagree = () => {
    setCheckedAgreement(false);
    setChangeHelperText(CHECK_AGREEMENT_HELPER + " (동의안함)");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      aria-labelledby="music-sseolprise-personalinfo-agreement"
      aria-describedby="music-sseolprise-personalinfo-agreement-detail"
      classes={{
        paper: "scrollbar-rainy-ashville",
      }}
      {...rest}
    >
      <DialogTitle
        id="music-sseolprise-about-title"
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
        <h3 className={classes.modalTitle}>
          뮤직 썰! 프라이즈(뮤직랩) 개인정보 이용방침
        </h3>
      </DialogTitle>

      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody + " scrollbar-rainy-ashville"}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {CollectingPersonalInformationAggrementText["ko"]}
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <GridContainer spacing={3}>
          <Button simple color="primary" size="lg" onClick={handleCheckAgree}>
            동의함
          </Button>
          <Button
            simple
            color="primary"
            size="lg"
            onClick={handleCheckDisagree}
          >
            동의안함
          </Button>
        </GridContainer>
      </DialogActions>
    </Dialog>
  );
};

CollectingPersonalInformationAgreement.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setCheckedAgreement: PropTypes.func,
  setChangeHelperText: PropTypes.func,
};

export default CollectingPersonalInformationAgreement;
