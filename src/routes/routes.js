import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from '../views/Auth/Login';

export default props => (
    <>
        <Switch>
            <Route exact path = '/login' component = {Login} />
            
        </Switch>
    </>
);