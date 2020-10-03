import React from 'react';
import facebookIcon from './facebook-icon.svg';
import kakaoIcon from './kakaotalk.svg';
import googleIcon from './google-icon.svg';


const FacebookIcon = () => (
    <img src = {facebookIcon} 
    style = {{
        width: '32px',
        height: '32px',
        margin: '1em',
    }}
    alt = "facebook icon" />
);

const KakaoIcon = () => (
    <img src = {kakaoIcon} 
    style = {{
        width: '32px',
        height: '32px',
        margin: '1em',
    }}
    alt = "kakao icon" />
);

const GoogleIcon = () => (
    <img src = {googleIcon} 
    style = {{
        width: '32px',
        height: '32px',
        margin: '1em',
    }}
    alt = "google icon" 
/>);

export { FacebookIcon, KakaoIcon, GoogleIcon };