//이메일 인증 대기페이지
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
    Footer,
    GridContainer,
    GridItem,
} from '../../components/components';

import { sendEmailAuthCode } from '../../app/store/userValidation';

import {defaultBgStyle} from '../../assets/jss/material-kit-react/views/background';
import styles from '../../assets/jss/material-kit-react/views/WaitingLevelupStyle';
import { checkPropTypes } from 'prop-types';

const useStyles = makeStyles(styles);

const WaitingLevelup = props => {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(() => {
        setCardAnimation("");
    }, 800);
    const classes = useStyles();

    const {
        sendEmailAuthCode,
    } = props;

    return (
        <div className={clsx(classes.pageHeader, defaultBgStyle().root)}>
            <div className={classes.container}>
                <GridContainer justify={window.innerWidth > 959 ? "space-between" : "center"}>
                    <GridItem xs={12} sm={12} md={6} lg={5} >
                        <div className={clsx(classes[cardAnimaton], classes.brand)}>
                            <h1 className={classes.title}>레벨업 대기중...</h1>
                            <p className={classes.content}>
                                이메일 인증코드를 통해 개인정보를 입력해주세요
                            </p>

                            <Link component='button' className={classes.subtitle}>
                            이메일 인증코드 재전송을 원하시나요?
                            </Link>

                            <h3 className={classes.content}>
                                Music Sseolprise by Inhyuk
                            </h3>
                            <h3 className={classes.content}>
                                원조 자작돌, 야다 전인혁의 뮤직 썰!프라이즈
                            </h3>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
    )
}

const mapStateToProps = (state) => ({
    sendEmailAuthCode: PropTypes.func,
});

export default connect(mapStateToProps, {sendEmailAuthCode})(WaitingLevelup)
