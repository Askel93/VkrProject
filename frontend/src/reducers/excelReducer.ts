import { ExcelReducer, ExcelState } from '../types';

const initState: ExcelState = {
  loading: false,
  error: null
}

const excelReducer: ExcelReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'SAVE_TO_DB':
    case 'SAVE_TO_EXCEL':
    case 'SAVE_TO_EXCEL_BY_OWN':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SAVE_TO_DB_SUCCESS':
    case 'EXCEL_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload as string
      }
    case 'SAVE_TO_EXCEL_SUCCESS':
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

export default excelReducer;