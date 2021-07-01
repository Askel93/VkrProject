import { all, call, put, takeEvery } from 'redux-saga/effects';

import { 
  fetchOwnOperatorSuccess,
  ownOperatorFailure,
  updateOwnOperatorSuccess,
  fetchOwnOperatorsSuccess,
  deleteOwnOperatorsSuccess,
  historyPush,
  noAuthRequest,
  getCountPageOwnSuccess,
  fetchOwnOperators as fetchRequest,
  getCountPageOwn as getCountRequest,
  saveOwnOperatorSuccess
} from '../actions';

import {
  fetchOwnOperator,
  fetchOwnOperators,
  fetchOwnCountPage,
  fetchUpdateOwnOperator,
  deleteAllOwnById,
  saveOwnOperatorApi
} from '../services/ownOperatorService'

import { OwnOperatorAction, OwnOperatorKeys, OwnOperator, FetchPayload, DeleteResponse, errorType } from '../types';

function* getOwnOperator(action: OwnOperatorAction) {
  const name: string = yield action.payload;
  try {
    const res: OwnOperator = yield call(fetchOwnOperator, name);
    yield put(fetchOwnOperatorSuccess(res));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NOT_FOUND) {
      yield call(historyPush, "/notFound")
    }
    yield put(ownOperatorFailure(err.message));
  }
}

function* updateOwnOperator(action: OwnOperatorAction) {
  const data: OwnOperator = yield action.payload;
  try {
    data.shipsOperator = undefined;
    data.shipsOwn = undefined;
    yield call(fetchUpdateOwnOperator, data);
    yield put(updateOwnOperatorSuccess(data.name));
  } catch(e) {
    const err = e as Error;
    yield put(ownOperatorFailure(err.message));
  }
}
function* saveOwnOperator(action: OwnOperatorAction) {
  const data: OwnOperator = yield action.payload;
  try {
    data.shipsOperator = undefined;
    data.shipsOwn = undefined;
    yield call(saveOwnOperatorApi, data)
    yield put(saveOwnOperatorSuccess(data.name));
  } catch(e) {
    const err = e as Error;
    yield put(ownOperatorFailure(err.message));
  }
}

function* getOwnOperators(action: OwnOperatorAction) {
  const fetchPayload: FetchPayload = yield action.payload;
  try {
    const res: OwnOperator[] = yield call(fetchOwnOperators, fetchPayload);
    yield put(fetchOwnOperatorsSuccess(res, fetchPayload));
  } catch(e) {
    const err = e as Error;
    yield put(ownOperatorFailure(err.message));
  }
}

function* getCountPageOwn(action: OwnOperatorAction) {
  const data: FetchPayload = yield action.payload;
  try {
    const count: number = yield call(fetchOwnCountPage, data);
    yield put(getCountPageOwnSuccess(count));
  } catch(e) {};
}

function* deleteOwnOperators(action: OwnOperatorAction) {
  const data: DeleteResponse = yield action.payload;
  try {
    yield call(deleteAllOwnById, data);
    yield put(deleteOwnOperatorsSuccess(data));
  } catch(e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest);
    } else {
      yield put(ownOperatorFailure(err.message));
    }
  }
}

function* deleteSuccess(action: OwnOperatorAction) {
  const data: FetchPayload = yield action.payload;
  const { page, size, sort = 'name' } = data;
  yield put(fetchRequest(data));
  yield put(getCountRequest(data));
  yield call(historyPush, `/ownoperators/${page}/${size}/${sort}`);
}

export default function* ownoperatorSaga() {
  yield all([
    takeEvery<OwnOperatorKeys>('DELETE_OWNOPERATORS', deleteOwnOperators),
    takeEvery<OwnOperatorKeys>('DELETE_OWNOPERATORS_SUCCESS', deleteSuccess),
    
    takeEvery<OwnOperatorKeys>('GET_COUNT_PAGE_OWN', getCountPageOwn),
    takeEvery<OwnOperatorKeys>('FETCH_OWNOPERATORS', getOwnOperators),

    takeEvery<OwnOperatorKeys>('FETCH_OWNOPERATOR', getOwnOperator),
    takeEvery<OwnOperatorKeys>('UPDATE_OWNOPERATOR_SUCCESS', getOwnOperator),
    takeEvery<OwnOperatorKeys>('SAVE_OWNOPERATOR_SUCCESS', getOwnOperator),
    
    takeEvery<OwnOperatorKeys>('UPDATE_OWNOPERATOR', updateOwnOperator),
    takeEvery<OwnOperatorKeys>('SAVE_OWNOPERATOR', saveOwnOperator)
  ]);
}