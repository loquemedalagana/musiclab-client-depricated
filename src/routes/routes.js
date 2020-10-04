import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import Levelup from '../views/Auth/Levelup';

export default props => (
    <>
        <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/Signup' component = {Signup} />
            <Route exact path = '/levelup' component = {Levelup} />
        </Switch>
    </>
);