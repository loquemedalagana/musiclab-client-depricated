import React from 'react';
import { Switch, Route } from "react-router-dom";

import IsNotLoggedInRoute from './IsNotLoggedInRoute'
import MemberRoute from './MemberRoute';
import NonMemberRoute from './NonMemberRoute';
import NonMemberRouteWithoutEmail from './NonMemberWithoutEmail';

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import Levelup from '../views/Auth/Levelup';
import WaitingLevelup from '../views/Auth/WaitingLevelup';
import InputEmailForSocialUsers from '../views/Auth/InputEmailForSocialUsers';

import Profile from '../views/Profile/Profile';

import UpdateProfile from '../views/Profile/UpdateProfile'; //not made yet
import NotFound from '../views/Pages/NotFound';

import ToastAlert from '../components/ToastAlerts/ToastAlerts';

//https://velog.io/@ksh4820/ErrorNote-Warning-Cant-perform-a-React-state-update-on-an-unmounted-component.-This-is-a-no-op-but-it-indicates-a-memory-leak-in-your-application.-To-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useEffect-cleanup-function

//aaa.com/member/active?token=abcdefg1234

export default props => (
    <>
        <ToastAlert />
        <Switch>
            <IsNotLoggedInRoute exact path = '/login' component = {Login} />
            <IsNotLoggedInRoute exact path = '/signup' component = {Signup} />
            <Route exact path = '/levelup/:name?' component = {Levelup} />
            <NonMemberRoute exact path = '/waitinglevelup' component = {WaitingLevelup} />
            <NonMemberRouteWithoutEmail exact path = '/emailregister' component = {InputEmailForSocialUsers} />

            <MemberRoute exact path = '/profiles/:userid' component = { Profile } />
            <MemberRoute exact path = '/modify/profile' component = { UpdateProfile } />

            <Route component = {NotFound} />
        </Switch>
    </>
);