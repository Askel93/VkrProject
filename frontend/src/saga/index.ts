import { take, select, all } from 'redux-saga/effects';
import { Action } from 'redux';

import authSaga from './auth';
import excelSaga from './excel';
import jwtSaga from './jwt';
import shipSaga from './ship';
import userSaga from './user';

import { State } from '../types'

function* watchAndLog() {
  while (true) {
    const action: Action = yield take();
    const state: State = yield select();

    console.log('action', action.type)
    console.log('state after', state)
  }
}

export default function* rootSaga() {
  yield all([
    watchAndLog(),
    authSaga(),
    excelSaga(),
    jwtSaga(),
    shipSaga(),
    userSaga(),
  ]);
}