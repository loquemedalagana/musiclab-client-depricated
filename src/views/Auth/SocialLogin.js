import React from 'react';

import {
    IconButton, 
} from "@material-ui/core";

import {
    FacebookIcon, KakaoIcon, GoogleIcon
} from '../../assets/customIcons/SocialIcons/SocialIcons';

import {
    CardHeader,
} from '../../components/components';

const SocialLoginURL = process.env.REACT_APP_SERVERURL + '/api/users';
const KakaoLoginURL = SocialLoginURL + '/kakao';
const GoogleLoginURL = SocialLoginURL + '/google';
const FacebookLoginURL = SocialLoginURL + '/facebook';

const SocialLogin = (props) => {
    const {
        color,
        classes,
    } = props;

    const GoogleLogin = () => {
        window.location.assign(GoogleLoginURL);
    }
    const KakaoLogin = () => {
        window.location.assign(KakaoLoginURL);
    }
    const FacebookLogin = () => {
        window.location.assign(FacebookLoginURL);
    }

    return (
        <CardHeader color={color} className={classes.cardHeader}>
        <h4>Sign up with</h4>
        <div className={classes.socialLine}>
            <IconButton size='small' onClick={KakaoLogin}>
                <KakaoIcon />
            </IconButton>
            <IconButton size='small' onClick={GoogleLogin}>
                <GoogleIcon />
            </IconButton>
            <IconButton size='small' onClick={FacebookLogin}>
                <FacebookIcon />
            </IconButton>
        </div>
        </CardHeader>
    )
}

export default SocialLogin
