import { all, call, delay, put, take, takeEvery } from 'redux-saga/effects';

import { jwtRemoveToken, jwtSetTokenSuccess, refreshRequest, refreshSuccess } from '../actions/jwt';
import { getPrincipal, refreshToken } from '../services/authService';
import { AuthActions, TokenObject, JWTActions, Principal } from '../types';

const isTokenChanged = (action: JWTActions | AuthActions) => ['LOGIN_SUCCESS', 'SET_TOKEN'].indexOf(action.type) >= 0;

export function* saveToken(action: JWTActions | AuthActions) {
  let token: TokenObject = yield action.payload;
  const principal: Principal = yield call(getPrincipal, token.access_token);
  token.authorities = principal.authorities;
  token.accessExp = new Date().getTime() + token.expires_in * 1000;
  localStorage.setItem("token", JSON.stringify(token));
  yield put(jwtSetTokenSuccess(token));
}

export function* removeToken() {
  localStorage.removeItem("token")
  yield put(jwtRemoveToken());
}

function* refresh(token: TokenObject) {
  yield put(refreshRequest());
  try {
    const newToken: TokenObject = yield call(refreshToken, token);
    newToken.accessExp = new Date().getTime() + newToken.expires_in;
    yield put(refreshSuccess(newToken));
  } catch(err) {
    yield call(removeToken);
  }
}
const getTokens = () => {
  const token = localStorage.getItem("token");
  return token === null ? null : JSON.parse(token) as TokenObject;
}

function* initSaga() {
  while(true) {
    let token: TokenObject | null = yield call(getTokens);
    if (!token) {
      yield take('SET_TOKEN_SUCCESS');
      continue;
    }
    let refreshInterval: number = token.accessExp - new Date().getTime();

    if (refreshInterval < 0) {
      refreshInterval = 0;
      // yield call(removeToken);
      // continue;
    } else if (refreshInterval > 5000) {
      refreshInterval = refreshInterval - 5000;
    }

    yield delay(refreshInterval)
    yield call(refresh, token);
  }
}

function* jwtSaga() {
  yield all([
    takeEvery('SET_TOKEN', saveToken),
    //takeEvery('LOGIN_SUCCESS', saveToken), //save token to session storage and store
    takeEvery('REFRESH_SUCCESS', saveToken),
    initSaga()
  ])
}

export default jwtSaga;