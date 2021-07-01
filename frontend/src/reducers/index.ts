import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import excelReducer from './excelReducer';
import jwtReducer from './jwtReducer';
import ownOperatorReducer from './ownOperatorReducer';
import shipReducer from './shipReducer';
import userReducer from './userReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  excel: excelReducer,
  jwt: jwtReducer,
  ownOperator: ownOperatorReducer,
  user: userReducer,
  ship: shipReducer,
  filter: filterReducer,
});

export default rootReducer;