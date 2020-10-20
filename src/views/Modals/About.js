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

import styles from '../../assets/jss/material-kit-react/components/modalStyle';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

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
                <h4 className={classes.modalTitle}>Music SSeolprise by Jeon Inhyuk</h4>
                <h5 className={classes.modalTitle}>야다 전인혁의 뮤직 썰!프라이즈</h5>
            </DialogTitle>

            <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
            >
                <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean. A small
                    river named Duden flows by their place and supplies it
                    with the necessary regelialia. It is a paradisematic
                    country, in which roasted parts of sentences fly into your
                    mouth. Even the all-powerful Pointing has no control about
                    the blind texts it is an almost unorthographic life One
                    day however a small line of blind text by the name of
                    Lorem Ipsum decided to leave for the far World of Grammar.
                </p>
            </DialogContent>
        </Dialog>
    )
}

export default About
