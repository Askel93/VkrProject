import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  fetchShipSuccess,
  fetchShipsSuccess,
  getCountPageSuccess,
  saveShipSuccess,
  updateShipSuccess,
  fetchOwnOperatorSuccess,
  noAuthRequest,
  updateOwnOperatorSuccess,
  deleteShipsSuccess,
  fetchOwnOperatorsSuccess,
  getCountPageOwnSuccess,
  ownOperatorFailure,
  shipFailure
} from '../actions';
import { 
  fetchCountPage,
  fetchOwnOperator,
  fetchShip,
  fetchShips,
  fetchUpdateOwnOperator,
  saveShip as fetchSaveShip,
  updateShip as fetchUpdateShip,
  deleteAllById,
  fetchOwnOperators,
  fetchOwnCountPage
} from '../services/shipService';
import { DeleteResponse, errorType, FetchPayload, OwnOperator, OwnOperatorAction, OwnOperatorKeys, Ship, ShipAction, ShipKeys } from '../types';

function* getShips(action: ShipAction) {
  const fetchPayload: FetchPayload = yield action.payload;
  try {
    const res: Ship[] = yield call(fetchShips, fetchPayload);
    yield put(fetchShipsSuccess(res));

  } catch(e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* getCountPage(action: ShipAction) {
  const size: number = yield action.payload;
  try {
    const res: number = yield call(fetchCountPage, size);
    yield put(getCountPageSuccess(res))
  } catch(e) {}
}

function* saveShip(action: ShipAction) {
  const ship: Ship = yield action.payload;
  try {
    yield call(fetchSaveShip, ship);
    yield put(saveShipSuccess())
  } catch(e) {
    const err = e as Error;
    if (err.message.includes(errorType.NO_AUTH)) {
      yield noAuthRequest();
      return;
    }
    yield put(shipFailure(err.message));
  }
}

function* updateShip(action: ShipAction) {
  const newShip: Ship = yield action.payload;
  try {
    yield call(fetchUpdateShip, newShip);
    yield put(updateShipSuccess(newShip.id));
  } catch(e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* getShip(action: ShipAction) {
  const id: number = yield action.payload;
  try {
    const res: Ship = yield call(fetchShip, id);
    yield put(fetchShipSuccess(res));
  } catch(e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* deleteShips(action: ShipAction) {
  const deleteRes: DeleteResponse = yield action.payload;
  try {
    yield call(deleteAllById, deleteRes);
    yield put(deleteShipsSuccess(deleteRes));
  } catch(e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* getOwnOperator(action: OwnOperatorAction) {
  const name: string = yield action.payload;
  try {
    const res: OwnOperator = yield call(fetchOwnOperator, name);
    yield put(fetchOwnOperatorSuccess(res));
  } catch(e) {
    const err = e as Error;
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

function* getOwnOperators(action: OwnOperatorAction) {
  const fetchPayload: FetchPayload = yield action.payload;
  try {
    const res: OwnOperator[] = yield call(fetchOwnOperators, fetchPayload);
    yield put(fetchOwnOperatorsSuccess(res));
  } catch(e) {
    const err = e as Error;
    yield put(ownOperatorFailure(err.message));
  }
}

function* getCountPageOwn(action: OwnOperatorAction) {
  const size: number = yield action.payload;
  try {
    const count: number = yield call(fetchOwnCountPage, size);
    yield put(getCountPageOwnSuccess(count));
  } catch(e) {};
}

export default function* shipSaga() {
  yield all([
    //fetch ship[]
    takeEvery<ShipKeys>('FETCH_SHIPS', getShips),
    takeEvery<ShipKeys>('DELETE_SHIPS_SUCCESS', getShips),
    //get count page
    takeEvery<ShipKeys>('GET_COUNT_PAGE', getCountPage),
    //fetch ship
    takeEvery<ShipKeys>('FETCH_SHIP', getShip),
    takeEvery<ShipKeys>('UPDATE_SHIP_SUCCESS', getShip),

    takeEvery<ShipKeys>('SAVE_SHIP', saveShip),
    takeEvery<ShipKeys>('UPDATE_SHIP', updateShip),
    takeEvery<ShipKeys>('DELETE_SHIPS', deleteShips),
    
    //fetch ownOperator
    takeEvery<OwnOperatorKeys>('FETCH_OWNOPERATOR', getOwnOperator),
    takeEvery<OwnOperatorKeys>('UPDATE_OWNOPERATOR_SUCCESS', getOwnOperator),
    //fetch ownOperator[]
    takeEvery<OwnOperatorKeys>('FETCH_OWNOPERATORS', getOwnOperators),

    takeEvery<OwnOperatorKeys>('GET_COUNT_PAGE_OWN', getCountPageOwn),
    
    takeEvery<OwnOperatorKeys>('UPDATE_OWNOPERATOR', updateOwnOperator),
  ]);
}