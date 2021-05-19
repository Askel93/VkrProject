import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import { signIn, logOut, signUp } from "../services/authService";
import { 
  loginSuccess,
  logoutSuccess,
  signUpSuccess,
  authFailure
} from '../actions/auth';
import { AuthActions, TokenObject, LoginUser, User, AuthKeys } from '../types';
import { removeToken } from './jwt';
import { jwtSetToken, historyPush } from '../actions';


function* loginSuccessSaga(action: AuthActions) {
  const token: TokenObject = action.payload as TokenObject;
  yield put(jwtSetToken(token));
  yield take('SET_TOKEN_SUCCESS');
  yield call(historyPush, "/ship");
}

//Listner loginRequest; action.payload loginUser
//Listner signUpSuccess; action.payload loginUser
function* login(action: AuthActions) {
  try {
    const loginUser = action.payload as LoginUser
    const res: TokenObject = yield call(signIn, loginUser);
    res.accessExp = new Date().getMilliseconds() + res.expires_in * 1000 - 5000;
    //yield call(saveToken, res);
    yield put(loginSuccess(res));
  } catch (err) {
    const error : string = err.message;
    yield put(authFailure(error));
  }
}

function* register(action: AuthActions) {
  try {
    const newUser: User = yield action.payload as User;
    yield call(signUp, newUser);
    
    yield put(signUpSuccess(newUser));
  } catch (err) {
    const error: Error = err;
    yield put(authFailure(error.message));
  }
}

function* logout() {
  try {
    const response: Response = yield call(logOut);
    if (response.status === 200) {
      yield put(logoutSuccess());
      yield call(removeToken)
    } else {
      throw response.json();
    }
  } catch (err) {
    yield put(authFailure(err.message));
  }
}

function* authSaga() {
  yield all([
    //login
    takeEvery<AuthKeys>('LOGIN', login),
    takeEvery<AuthKeys>('SIGN_UP_SUCCESS', login),
    takeEvery<AuthKeys>('LOGIN_SUCCESS', loginSuccessSaga),
    //logout
    takeEvery<AuthKeys>('LOGOUT', logout),
    //signUp
    takeEvery<AuthKeys>('SIGN_UP', register),
  ]);
}

export default authSaga;