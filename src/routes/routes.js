import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';

export default props => (
    <>
        <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/Signup' component = {Signup} />
        </Switch>
    </>
);