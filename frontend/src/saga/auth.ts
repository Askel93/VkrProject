import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import { signIn, signUp } from "../services/authService";
import {
  loginSuccess,
  signUpSuccess,
  authFailure,
  jwtSetToken,
  historyPush,
} from '../actions';
import { AuthActions, TokenObject, LoginUser, User, AuthKeys, UserKeys, UserActions } from '../types';

//Listner loginRequest; action.payload loginUser
//Listner signUpSuccess; action.payload loginUser
function* login(action: AuthActions | UserActions) {
  try {
    const loginUser: LoginUser = yield action.payload;
    let prevPath: string | undefined = yield action.prevPath;
    let res: TokenObject = yield call(signIn, loginUser);
    res.isRemember = loginUser.isRemember;
    yield put(jwtSetToken(res));
    yield take('SET_TOKEN_SUCCESS');
    prevPath = prevPath && !prevPath.includes("/auth") ? prevPath : "/ships";
    yield call(historyPush, prevPath);
    yield put(loginSuccess(res, prevPath));
  } catch (err) {
    yield put(authFailure(err.error_description));
  }
}

function* register(action: AuthActions) {
  try {
    const newUser: User = yield action.payload as User;
    yield call(signUp, newUser);
    yield put(signUpSuccess(newUser));

  } catch (err) {
    const error = err as Error;
    yield put(authFailure(error.message));
  }
}

function* authSaga() {
  yield all([
    //login
    takeEvery<AuthKeys>('LOGIN', login),
    takeEvery<AuthKeys>('SIGN_UP_SUCCESS', login),
    takeEvery<UserKeys>('UPDATE_PROFILE_SUCCESS', login),
    //signUp
    takeEvery<AuthKeys>('SIGN_UP', register),
  ]);
}

export default authSaga;