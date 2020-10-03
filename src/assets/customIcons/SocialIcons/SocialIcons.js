import React from 'react';
import facebookIcon from './facebook-icon.svg';
import kakaoIcon from './kakaotalk.svg';
import googleIcon from './google-icon.svg';
import localIcon from '../../../../images/dolphin_default.png';

const LocalIcon = ({className}) => (<img src = {localIcon} className={className} alt = "local icon" />);
const FacebookIcon = ({className}) => (<img src = {facebookIcon} className={className} alt = "facebook icon" />);
const KakaoIcon = ({className}) => (<img src = {kakaoIcon} className={className} alt = "kakao icon" />);
const GoogleIcon = ({className}) => (<img src = {googleIcon} className={className} alt = "google icon" />);

export { LocalIcon, FacebookIcon, KakaoIcon, GoogleIcon };