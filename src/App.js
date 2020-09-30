import React from 'react';
import store from './app/store';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import Routes from './routes/routes';

function App() {
  //load and store user state

  return (
    <Provider store = {store}>
      <h1>hello world</h1>
      <Router>
        <Switch>
          <Route exact path = '/' component = {null} />
          <Route component = {Routes} /> 
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
