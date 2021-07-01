import { all, call, put, takeEvery } from 'redux-saga/effects';

import { saveToDbSuccess, saveToExcelSuccess, excelFailure } from '../actions/excel'
import excelService from '../services/excelService';
import { ExcelAction, ExcelKeys, SaveToExcelPayload } from '../types';

const { loadOnDb, loadOnExcelByOwn, loadOnExcelByShips } = excelService;

function* saveToDb(action: ExcelAction) {
  const formData: FormData = yield action.payload;
  try {
    const res: string = yield call(loadOnDb, formData);
    yield put(saveToDbSuccess(res));
  } catch(e) {
    const err = e as Error;
    yield put(excelFailure(err.message));
  }
}

function* saveToExcel(action: ExcelAction) {
  const data: SaveToExcelPayload = yield action.payload;
  try {
    yield call(loadOnExcelByShips, data);
    yield put(saveToExcelSuccess())
  } catch(e) {
    const err = e as Error;
    yield put(excelFailure(err.message))
  }
}

function* saveToExcelByOwn(action: ExcelAction) {
  const data: SaveToExcelPayload = yield action.payload;
  try {
    yield call(loadOnExcelByOwn, data);
    yield put(saveToExcelSuccess())
  } catch(e) {
    const err = e as Error;
    yield put(excelFailure(err.message));
  }
}

export default function* excelSaga() {
  yield all([
    takeEvery<ExcelKeys>('SAVE_TO_DB', saveToDb),
    takeEvery<ExcelKeys>('SAVE_TO_EXCEL', saveToExcel),
    takeEvery<ExcelKeys>('SAVE_TO_EXCEL_BY_OWN', saveToExcelByOwn)
  ])
}