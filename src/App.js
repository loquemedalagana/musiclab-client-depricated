import React from 'react';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from './routes/routes';

import "./assets/scss/material-kit-react.scss?v=1.9.0";

import Landing from './views/Landing/Landing';

import {
  Header,
  HeaderLinks, //loggedin or not loggedin
//  Footer,
} from './components/components';

import {appTitle} from './utils/texts';

function App(props) {
  //load and store user state
  const { ...rest } = props;

  return (
    <Provider store = {store}>
      <Router>
        <Header
            color="transparent"
            brand={appTitle}
            rightLinks={<HeaderLinks />}
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
    </Provider>
  );
}

export default App;
