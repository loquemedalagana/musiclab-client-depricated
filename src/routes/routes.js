import React from 'react';
import { Switch, Route } from "react-router-dom";

import MemberRoute from './MemberRoute';
import NonMemberRoute from './NonMemberRoute'

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import Levelup from '../views/Auth/Levelup';
import InputEmailForSocialUsers from '../views/Auth/InputEmailForSocialUsers';

import Profile from '../views/Profile/Profile';

import ProfileUpdate from '../views/Profile/Update';
import NotFound from '../views/Pages/NotFound';

import ToastAlert from '../components/ToastAlerts/ToastAlerts';

//https://velog.io/@ksh4820/ErrorNote-Warning-Cant-perform-a-React-state-update-on-an-unmounted-component.-This-is-a-no-op-but-it-indicates-a-memory-leak-in-your-application.-To-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useEffect-cleanup-function

export default props => (
    <>
        <ToastAlert />
        <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/Signup' component = {Signup} />
            <NonMemberRoute exact path = '/levelup' component = {Levelup} />
            <NonMemberRoute exact path = '/social' component = {InputEmailForSocialUsers} />

            <MemberRoute exact path = '/profiles/:userid' component = { Profile } />
            <MemberRoute exact path = '/modify/profile' component = { ProfileUpdate } />

            <Route component = {NotFound} />
        </Switch>
    </>
);