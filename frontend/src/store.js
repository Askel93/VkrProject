import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import { testState } from './types';
import rootSaga from './saga';
import reducer from './reducers';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true, traceLimit: 25
    }) : compose;

const store = createStore(
  reducer,
  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? testState : undefined,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

// eslint-disable-next-line
export default () => {
  sagaMiddleware.run(rootSaga);
  return store;
}