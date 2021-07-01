import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import { fetchProfile, fetchUpdateProfile, fetchUsers, fetchAddAdmin } from '../services/userService';
import { 
  getProfileSuccess,
  noAuthRequest,
  updateProfileSuccess,
  userFailure,
  getUsersSuccess,
  addAdminSuccess
} from '../actions';
import { errorType, JWTKeys, User, UserActions, UserKeys, UserResponse } from '../types';

function* getProfile() {
  try {
    const res: User = yield call(fetchProfile);
    yield put(getProfileSuccess(res));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest)
    }
    yield put(userFailure(err.message));
  }
}

function* getUsers() {
  try {
    const res: UserResponse[] = yield call(fetchUsers);
    yield put(getUsersSuccess(res));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest)
    }
    yield put(userFailure(err.message))
  }
}

function* addAdmin(action: UserActions) {
  const addedAdmin: UserResponse = yield action.payload;
  try {
    yield call(fetchAddAdmin, addedAdmin);
    yield put(addAdminSuccess(addedAdmin));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest);
    }
    yield put(userFailure(err.message))
  }
}

function* updateProfile(action: UserActions) {
  try {
    const data: User = yield action.payload;
    yield call(fetchUpdateProfile, data);
    yield put(updateProfileSuccess(data, "/profile"));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest)
    }
    yield put(userFailure(err.message));
  }
}

function* updateSuccess() {
  yield take('SET_TOKEN_SUCCESS');
  yield call(getProfile);
}

function* onLogout() {
  yield put({ type: 'LOGOUT'});
}

export default function* userSaga() {
  yield all([
    takeEvery<UserKeys>('PROFILE', getProfile),
    takeEvery<UserKeys>('UPDATE_PROFILE', updateProfile),
    takeEvery<UserKeys>('UPDATE_PROFILE_SUCCESS', updateSuccess),

    takeEvery<UserKeys>('FETCH_USERS', getUsers),
    takeEvery<UserKeys>('ADD_ADMIN', addAdmin),
    takeEvery<JWTKeys>('REMOVE_TOKEN_SUCCESS', onLogout)
  ]);
}