import React from 'react';
import { Switch, Route } from "react-router-dom";

import MemberRoute from './MemberRoute';

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import Levelup from '../views/Auth/Levelup';
import InputEmail from '../views/Auth/InputEmailForSocialUsers';

import Profile from '../views/Profile/Profile';

import ProfileUpdate from '../views/Profile/Update';
import NotFound from '../views/Pages/NotFound';

export default props => (
    <>
        <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/Signup' component = {Signup} />
            <Route exact path = '/levelup' component = {Levelup} />
            <Route exact path = '/social' component = {InputEmail} />

            <MemberRoute exact path = '/profiles/:userid' component = { Profile } />
            <MemberRoute exact path = '/modify/profile' component = { ProfileUpdate } />

            <Route component = {NotFound} />
        </Switch>
    </>
);