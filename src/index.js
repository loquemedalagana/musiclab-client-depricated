import React from "react";
import store from "./app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./assets/scss/material-kit-react.scss?v=1.9.0";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
