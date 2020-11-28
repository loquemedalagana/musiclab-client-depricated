import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    IconButton,
    InputAdornment,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import {
    Close, Email, People,
    FiberManualRecord,
} from "@material-ui/icons";

import {
    Button,
    CustomInput,
    GridContainer,
    GridItem,
} from '../../components/components';

import styles from '../../assets/jss/material-kit-react/components/modalStyle';

import {checkValidEmail} from '../../utils/checkStringPatterns';
import {setAlertMsg} from '../../app/store/alert';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export const Help = props => {
    const classes = useStyles();
    const {
        setAlertMsg,
        open,
        onClose,
        userInfo,
        userLoading
    } = props;

    const [inputs, setInputs] = useState({
        displayName: userInfo && !userLoading ? userInfo.displayName : '',
        email: userInfo && !userLoading ? (userInfo.email ? userInfo.email : '' ) : '',
        title: '',
        content: '',
    });

    const {email, displayName, content, title} = inputs;

    const [emailModalErr, setEmailModalErr] = useState(false);
    const [nameModalErr, setNameModalErr] = useState(false);
    const [contentErr, setContentErr] = useState(false);


    const onInputHandler = event => {
        const {name, value} = event.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        let ok = true;
        if(!email) {
            ok=false;
            setAlertMsg('이메일을 입력해주세요', 'error');
            setEmailModalErr(true);
        }
        else if (!checkValidEmail(email)){
            ok=false;
            setAlertMsg('올바른 형식으로 입력해주세요.', 'error');
            setEmailModalErr(true);
        }

        if(!displayName) {
            ok=false;
            setNameModalErr(true);
            setAlertMsg('이름을 입력해주세요', 'error');
        }

        if(content.length === 0 || title.length === 0) {
            ok=false;
            setContentErr(true);
            setAlertMsg('제목, 내용 모두 입력해주세요', 'error');
        }
        
        if(ok){
            setContentErr(false);
            setEmailModalErr(false);
            setNameModalErr(false);

            
        }
    }

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
                className={classes.modalBody + " " + "scrollbar-lady-lips"}
            >
                <p>
                뮤썰 이용 중에 궁금한 점이 있으시거나 예상치 못한 오류가 생기면 여기로 연락주세요!
                </p>
                <p>담당자가 확인 후 바로 반영해드리고 답변드립니다.</p>
                <p>양식에 맞지 않은 내용은 전송이 되지 않습니다.</p>
                <br />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="Your Name"
                        id="name"
                        error={nameModalErr}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                                type: "text",
                                name: "displayName",                                
                                value: displayName,
                                onChange: onInputHandler,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                        />
                    </GridItem>
                <GridItem xs={12} sm={12} md={6}>                
                    <CustomInput
                            labelText="Your Email"
                            id="useremail"
                            error = {emailModalErr}
                            formControlProps={{
                                fullWidth: true
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
                                )
                            }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Message Title"
                        id="help-message-title"
                        error={contentErr}
                        formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
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
                    <FormControl component = "fieldset">
                        <FormLabel component = "h3">Type</FormLabel>
                        <RadioGroup>
                            {
                                //요기다 양식 배열에다 담기
                            }
                        </RadioGroup>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Message Content"
                        id="help-message"
                        error={contentErr}
                        formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
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
    )
}

Help.propTypes = {
    props: PropTypes.object,
    setAlertMsg: PropTypes.func,
}

const mapStateToProps = (state) => ({
    userLoading: state.auth.loading,
    userInfo: state.auth.userData,
})


export default connect(mapStateToProps, {setAlertMsg})(Help)
