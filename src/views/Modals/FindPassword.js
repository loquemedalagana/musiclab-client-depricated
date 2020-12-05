import React, { useState } from "react";
//import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Close, Email } from "@material-ui/icons";

import { Button, CustomInput } from "../../components/components";

import styles from "../../assets/jss/material-kit-react/components/modalStyle";

import { checkValidEmail } from "../../utils/checkStringPatterns";
import { setAlertMsg } from "../../app/store/alert";
import { requestFindPassword } from "../../app/store/userValidation";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FindPassword = (props) => {
  const classes = useStyles();
  const { setAlertMsg, open, onClose, requestFindPassword } = props;

  const [inputs, setInputs] = useState({
    email: "",
  });

  const { email } = inputs;

  const [emailModalErr, setEmailModalErr] = useState(false);

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
    if (!email) {
      ok = false;
      setAlertMsg("이메일을 입력해주세요", "error");
      setEmailModalErr(true);
    } else if (!checkValidEmail(email)) {
      ok = false;
      setAlertMsg("올바른 형식으로 입력해주세요.", "error");
      setEmailModalErr(true);
    }

    if (ok) {
      //이벤트 처리
      //창 닫기
      setEmailModalErr(false);
      requestFindPassword({ email });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      aria-labelledby="music-sseolprise-about"
      aria-describedby="music-sseolprise-about-detail"
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
        <h3 className={classes.modalTitle}>Music SSeolprise by Jeon Inhyuk</h3>
        <h5 className={classes.modalTitle}>야다 전인혁의 뮤직 썰!프라이즈</h5>
      </DialogTitle>

      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <p>가입하신 메일주소를 입력해주세요</p>
        <CustomInput
          labelText="Input your Email..."
          id="findemail"
          error={emailModalErr}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "email",
            name: "email",
            value: email,
            onChange: onInputHandler,
            endAdornment: (
              <InputAdornment position="end">
                <Email className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button simple color="primary" size="lg" onClick={onSubmitHandler}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FindPassword.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setAlertMsg: PropTypes.func,
  requestFindPassword: PropTypes.func,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlertMsg, requestFindPassword })(
  FindPassword
);
