import React from 'react';
import { Switch, Route } from "react-router-dom";

import IsNotLoggedInRoute from './HigherOrderComponets/IsNotLoggedInRoute'
import MemberRoute from './HigherOrderComponets/MemberRoute';
import NonMemberRoute from './HigherOrderComponets/NonMemberRoute';
import TokenRoute from './HigherOrderComponets/TokenRoute';
import NonMemberRouteWithoutEmail from './HigherOrderComponets/NonMemberWithoutEmail';

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import ResetPassword  from '../views/Auth/ResetPassword';
import Levelup from '../views/Auth/Levelup';
import WaitingLevelup from '../views/Auth/WaitingLevelup';
import InputEmailForSocialUsers from '../views/Auth/InputEmailForSocialUsers';

import Profile from '../views/Profile/Profile';
import VideoListByChannel from '../views/VideoPosts/VideoListByChannel';

import UpdateProfile from '../views/Profile/UpdateProfile'; //not made yet
import NotFound from '../views/Error/NotFound';
import ServerError from '../views/Error/ServerError';

import ToastAlert from '../components/ToastAlerts/ToastAlerts';

//https://velog.io/@ksh4820/ErrorNote-Warning-Cant-perform-a-React-state-update-on-an-unmounted-component.-This-is-a-no-op-but-it-indicates-a-memory-leak-in-your-application.-To-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useEffect-cleanup-function

//aaa.com/member/active?token=abcdefg1234
// ~.com/levelup/?token=ABCDE

export default props => (
    <>
        <ToastAlert />
        <Switch>
            <IsNotLoggedInRoute exact path = '/login' component = {Login} />
            <IsNotLoggedInRoute exact path = '/signup' component = {Signup} />
            <TokenRoute exact path = '/resetpassword/:auth?' component = {ResetPassword} />
            <TokenRoute exact path = '/levelup/:auth?' component = {Levelup} />
            <NonMemberRoute exact path = '/waitinglevelup' component = {WaitingLevelup} />
            <NonMemberRouteWithoutEmail exact path = '/emailregister' component = {InputEmailForSocialUsers} />

            <MemberRoute exact path = '/profiles/:userid' component = { Profile } />
            <MemberRoute exact path = '/modify/profile' component = { UpdateProfile } />

            <Route exact path = '/officialvideolist/:channel?' component = {VideoListByChannel} />

            <Route exact path = '/servererror' component = {ServerError} />
            <Route component = {NotFound} />
        </Switch>
    </>
);