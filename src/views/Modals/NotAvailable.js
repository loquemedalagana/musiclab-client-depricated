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

const NotAvailable = props => {
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
            fullwidth
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
                <>
                <p>
                    지금 준비중인 페이지입니다. 빠른 시일 내에 오픈하겠습니다!
                </p>
                </>
            </DialogContent>
        </Dialog>
    )
}

export default NotAvailable
