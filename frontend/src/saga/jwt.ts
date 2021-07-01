import { all, call, delay, put, select, take, takeEvery } from 'redux-saga/effects';

import { jwtRemoveToken, jwtRemoveTokenSuccess, jwtSetTokenSuccess, refreshSuccess, historyPush } from '../actions';
import { jwtSelector } from '../selector';
import { getPrincipal, refreshToken } from '../services/authService';
import { AuthActions, TokenObject, JWTActions, Principal, JWTState } from '../types';

function* saveToken(action: JWTActions | AuthActions) {
  let token: TokenObject = yield action.payload;
  const principal: Principal = yield call(getPrincipal, token.access_token);
  token.authorities = principal.authorities;
  token.accessExp = new Date().getTime() + token.expires_in * 1000 - 5000;
  const refreshToken = { refresh_token: token.refresh_token, authorities: token.authorities, accessExp: token.accessExp, isRemember: token.isRemember }
  const accessToken = { access_token: token.access_token }
  if (token.isRemember) {
    localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
  } else {
    sessionStorage.setItem("refresh_token", JSON.stringify(refreshToken))
  }
  sessionStorage.setItem("access_token", JSON.stringify(accessToken));
  yield put(jwtSetTokenSuccess(token));
}

function* removeToken() {
  localStorage.clear();
  sessionStorage.clear();
  yield put(jwtRemoveTokenSuccess());
  yield call(historyPush, "/auth/signin");
}

function* refresh(token: JWTState) {
  let refreshInterval = (token.accessExp || 0) - new Date().getTime();
  if (refreshInterval > 0 && token.access_token) {
    yield delay(refreshInterval);
  }
  try {
    let newToken: TokenObject = yield call(refreshToken, token.refresh_token!);
    newToken.isRemember = token.isRemember;
    yield put(refreshSuccess(newToken));
  } catch(e) {
    yield put(jwtRemoveToken());
  }
}

function* initSaga() {
  while (true) {
    let token: JWTState = yield select(jwtSelector);
    if (!token.refresh_token || !token.accessExp) {
      yield take('SET_TOKEN_SUCCESS');
      continue;
    }
    yield call(refresh, token)
    yield take('SET_TOKEN_SUCCESS');
  }
}

export default function* jwtSaga() {
  yield all([
    takeEvery('SET_TOKEN', saveToken),
    takeEvery('REFRESH_SUCCESS', saveToken),
    takeEvery('REMOVE_TOKEN', removeToken),
    initSaga()
  ])
}