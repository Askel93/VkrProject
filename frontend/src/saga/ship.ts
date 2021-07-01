import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  fetchShipSuccess,
  fetchShipsSuccess,
  getCountPageSuccess,
  saveShipSuccess,
  updateShipSuccess,
  noAuthRequest,
  deleteShipsSuccess,
  shipFailure,
  historyPush,
  fetchShipsRequest,
  getCountPage as fetchCountPage,
} from '../actions';
import {
  fetchShipCountPage,
  fetchShip,
  saveShip as fetchSaveShip,
  updateShip as fetchUpdateShip,
  deleteAllShipsById,
  deleteShipById,
  fetchShips
} from '../services/shipService';
import { DeleteResponse, errorType, FetchPayload, Ship, ShipAction, ShipKeys } from '../types';

function* getShips(action: ShipAction) {
  const fetchPayload: FetchPayload = yield action.payload;
  try {
    const res: Ship[] = yield call(fetchShips, fetchPayload);
    yield put(fetchShipsSuccess(res, fetchPayload));
  } catch (e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* getCountPage(action: ShipAction) {
  const data: FetchPayload = yield action.payload;
  try {
    const res: number = yield call(fetchShipCountPage, data);
    yield put(getCountPageSuccess(res))
  } catch (e) { }
}

function* saveShip(action: ShipAction) {
  const ship: Ship = yield action.payload;
  try {
    yield call(fetchSaveShip, ship);
    yield put(saveShipSuccess())
  } catch (e) {
    const err = e as Error;
    if (err.message.includes(errorType.NO_AUTH)) {
      yield call(noAuthRequest);
      return;
    }
    yield put(shipFailure(err.message));
  }
}

function* updateShip(action: ShipAction) {
  const newShip: Ship = yield action.payload;
  try {
    yield call(fetchUpdateShip, newShip);
    yield put(updateShipSuccess({ page: 1, size: 20 }));
  } catch (e) {
    const err = e as Error;
    yield put(shipFailure(err.message));
  }
}

function* getShip(action: ShipAction) {
  const id: number = yield action.payload;
  try {
    const res: Ship = yield call(fetchShip, id);
    yield put(fetchShipSuccess(res));
  } catch (e) {
    const err = e as Error;
    if (err.message === errorType.NOT_FOUND) {
      yield call(historyPush, "/notFound");
    }
    yield put(shipFailure(err.message));
  }
}

function* deleteShips(action: ShipAction) {
  const deleteRes: DeleteResponse = yield action.payload;
  try {
    yield call(deleteAllShipsById, deleteRes);
    yield put(deleteShipsSuccess(deleteRes));
  } catch (e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest);
    }
    yield put(shipFailure(err.message));
  }
}

function* deleteShip(action: ShipAction) {
  const deleteRes: DeleteResponse = yield action.payload;
  try {
    yield call(deleteShipById, deleteRes);
    yield put(deleteShipsSuccess(deleteRes));
  } catch (e) {
    const err = e as Error;
    if (err.message === errorType.NO_AUTH) {
      yield call(noAuthRequest);
    }
    yield put(shipFailure(err.message));
  }
}


function* changesSuccess(action: ShipAction) {
  const data: FetchPayload = yield action.payload;
  const { page, size, sort = 'id' } = data;
  yield put(fetchShipsRequest(data));
  yield put(fetchCountPage(data));
  yield call(historyPush, `/ships/${page}/${size}/${sort}`);
}


export default function* shipSaga() {
  yield all([
    //fetch ship[]
    takeEvery<ShipKeys>('FETCH_SHIPS', getShips),
    //get count page
    takeEvery<ShipKeys>('GET_COUNT_PAGE', getCountPage),
    //fetch ship
    takeEvery<ShipKeys>('FETCH_SHIP', getShip),

    takeEvery<ShipKeys>('SAVE_SHIP', saveShip),
    takeEvery<ShipKeys>('UPDATE_SHIP', updateShip),

    takeEvery<ShipKeys>('DELETE_SHIP', deleteShip),
    takeEvery<ShipKeys>('DELETE_SHIPS', deleteShips),

    takeEvery<ShipKeys>('UPDATE_SHIP_SUCCESS', changesSuccess),
    takeEvery<ShipKeys>('DELETE_SHIP_SUCCESS', changesSuccess),
  ]);
}