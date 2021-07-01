import { ExcelAction, SaveToExcelPayload } from '../types'

const saveToDbRequest = (formData: FormData): ExcelAction => ({
  type: 'SAVE_TO_DB',
  payload: formData
});
const saveToDbSuccess = (err: string): ExcelAction => ({
  type: 'SAVE_TO_DB_SUCCESS',
  payload: err
});

const saveToExcelRequest = (data: SaveToExcelPayload): ExcelAction => ({
  type: 'SAVE_TO_EXCEL',
  payload: data
});
const saveToExcelSuccess = (): ExcelAction => ({
  type: 'SAVE_TO_EXCEL_SUCCESS'
});
const saveToExcelByOwn = (data: SaveToExcelPayload): ExcelAction => ({
  type: 'SAVE_TO_EXCEL_BY_OWN',
  payload: data
});

const excelFailure = (err: string): ExcelAction => ({
  type: 'EXCEL_FAILURE',
  payload: err
});

export {
  saveToDbRequest,
  saveToDbSuccess,
  saveToExcelRequest,
  saveToExcelSuccess,
  saveToExcelByOwn,
  excelFailure
}
