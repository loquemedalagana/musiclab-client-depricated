import React from 'react';
import store from './app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store = {store}>
      <h1>hello world</h1>
    </Provider>
  );
}

export default App;
