import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from './routes/routes';
import "./assets/scss/material-kit-react.scss?v=1.9.0";

import {fetchUser, authSelector} from './app/store/auth';

import Landing from './views/Landing/Landing';

import {
  Header,
  //HeaderLinks, //loggedin or not loggedin
  HeaderLinksNotLoggedIn,
//  Footer,
} from './components/components';

import {appTitle} from './utils/texts';

function App(props) {
  //load and store user state
  const { ...rest } = props;

  const dispatch = useDispatch();
  const state = useSelector(authSelector);
  const {
    loading,
    userData,
    auth,
  } = state;

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (  
      <Router>
        <Header
            color="transparent"
            brand={appTitle}
            rightLinks={<HeaderLinksNotLoggedIn />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "info"
            }}
            {...rest}
        />
        <Switch>
          <Route exact path = '/' component = {Landing} />
          <Route component = {Routes} /> 
        </Switch>
      </Router>
  );
}

export default App;
