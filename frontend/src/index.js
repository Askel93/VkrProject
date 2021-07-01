import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import syncHistoryWithStore from 'react-router-redux/lib/sync'

import App from './components/app';
import configureStore, { history } from './store';

const store = configureStore();
const syncHistory = syncHistoryWithStore(history, store);

render(
  <Provider store={store}>
    <Router history={syncHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);