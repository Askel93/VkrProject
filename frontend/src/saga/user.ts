import { all, call, put, takeEvery } from 'redux-saga/effects';

import { fetchProfile } from '../services/userService';
import { getProfileSuccess, getProfileFailure, noAuthRequest } from '../actions';
import { errorType, UserResponse } from '../types';

function* getProfile() {
  try {
    const res: UserResponse = yield call(fetchProfile);
    yield put(getProfileSuccess(res));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest)
      return;
    }
    yield put(getProfileFailure(err.message));
  }
}

export default function* userSaga() {
  yield all([
    takeEvery('PROFILE', getProfile)
  ]);
}