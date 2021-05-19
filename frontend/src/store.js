import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import rootSaga from './saga';
import reducer from './reducers';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    ),
  ),
);

export default () => {
  sagaMiddleware.run(rootSaga);
  return store;
}