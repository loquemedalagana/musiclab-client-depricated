import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import { Close } from "@material-ui/icons";
import CustomRadioGroup from "../../../components/CustomRadioGroup/CustomRadioGroup";
import {
  Button,
  CustomInput,
  GridContainer,
  GridItem,
} from "../../../components/components";
import EmailInput from "../../SubComponents/authAndProfile/EmailInput";
import NameInput from "../../SubComponents/authAndProfile/NameInput";
import NoAuthErrorModal from "../error/NoAuthErrorModal";

import styles from "../../../assets/jss/material-kit-react/components/modalStyle";

import EmailValidation from "../../../app/inputValidation/user/emailValidation";

import { setAlertMsg } from "../../../app/store/alert";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const Help = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { setAlertMsg, open, onClose, userInfo, userLoading } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [inputs, setInputs] = useState({
    displayName: userInfo && !userLoading ? userInfo.displayName : "",
    email:
      userInfo && !userLoading ? (userInfo.email ? userInfo.email : "") : "",
    mailType: "",
    title: "",
    content: "",
  });

  const { email, displayName, content, title, mailType } = inputs;

  const [emailModalErr, setEmailModalErr] = useState(false);
  const [nameModalErr, setNameModalErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const onInputHandler = (event) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //console.log(inputs);
  console.log(mailType);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let ok = true;
    const emailInputCheck = new EmailValidation({ email });
    const emailInputValidationResult = emailInputCheck.getResult();

    if (!emailInputValidationResult.ok) {
      ok = false;
      setAlertMsg(emailInputValidationResult.message, "error", "email");
      setEmailModalErr(true);
    } else {
      setEmailModalErr(false);
    }

    if (!displayName) {
      ok = false;
      setNameModalErr(true);
      setAlertMsg("이름을 입력해주세요", "error");
    }

    if (content.length === 0 || title.length === 0) {
      ok = false;
      setContentErr(true);
      setAlertMsg("제목, 내용 모두 입력해주세요", "error");
    }

    if (ok) {
      setContentErr(false);
      setEmailModalErr(false);
      setNameModalErr(false);
    }
  };

  return userInfo ? (
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
        dividers={isMobile}
      >
        <p>
          뮤썰 이용 중에 궁금한 점이 있으시거나 예상치 못한 오류가 생기면 여기로
          연락주세요!
        </p>
        <p>담당자가 확인 후 바로 반영해드리고 답변드립니다.</p>
        <p>양식에 맞지 않은 내용은 전송이 되지 않습니다.</p>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <NameInput
              isModal={true}
              nameType="displayName"
              error={nameModalErr}
              value={displayName}
              onChange={onInputHandler}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <EmailInput
              isModal={true}
              error={emailModalErr}
              value={email}
              onChange={onInputHandler}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Message Title"
              id="help-message-title"
              error={contentErr}
              formControlProps={{
                fullWidth: true,
                className: classes.textArea,
              }}
              inputProps={{
                name: "title",
                value: title,
                onChange: onInputHandler,
              }}
            />
          </GridItem>
          {/*양식 적기(radio button)*/}
          <GridItem xs={12} sm={12} md={12}>
            <CustomRadioGroup
              title={"Type"}
              name={"mailType"}
              value={mailType}
              onChange={onInputHandler}
              selectItems={[
                { key: "error", value: "오류 보고" },
                { key: "help", value: "문의 사항" },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Message Content"
              id="help-message"
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
  ) : (
    <NoAuthErrorModal open={open} onClose={onClose} />
  );
};

Help.propTypes = {
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

export default connect(mapStateToProps, { setAlertMsg })(Help);
