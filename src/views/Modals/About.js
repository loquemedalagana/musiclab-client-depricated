import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Slide,
    IconButton,
} from '@material-ui/core';

import Close from "@material-ui/icons/Close";
import {YadaDebutDate} from '../../utils/variablesAndRegs';
import styles from '../../assets/jss/material-kit-react/components/modalStyle';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const lapsed = (1900 + new Date().getYear()) - YadaDebutDate.getFullYear() + 1;

const About = props => {
    const classes = useStyles();
    const {
        open,
        onClose,
    } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
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

                <p>
                    ✔ 야다 입덕 후 덕질하기 힘드셨죠?
                </p>
                <p>
                    ✔ 뮤직 썰! 프라이즈가 고민을 해결해 드립니다
                    <span role="img">😉</span>
                </p>
                <p>
                    ✔ 내가 보고 싶은 인혁 영상만 주제별로 모아
                    <span role="img">🎞</span>
                </p>
                <p>
                    ✔ 내가 커버한 곡 인혁님이 직접 피드백을
                    <span role="img">😲</span>
                </p>
                <p>
                    ✔ 데뷔 후 {lapsed}년간 못다했던 인혁님의 이야기까지!
                </p>
            </DialogContent>
        </Dialog>
    )
}

export default About
