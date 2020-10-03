import React from 'react';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from './routes/routes';

import Landing from './views/Landing/Landing'

function App() {
  //load and store user state

  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route exact path = '/' component = {Landing} />
          <Route component = {Routes} /> 
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
