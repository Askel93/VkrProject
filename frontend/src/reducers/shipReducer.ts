import { Ship, ShipReducer, initShipState, ShipState, FetchPayload, } from '../types';

const initState = (state: ShipState = initShipState): ShipState => {
  const stateInitString = sessionStorage.getItem("ships");
  if (stateInitString !== null) {
    const initState: { ships: Ship[], fetchPayload: FetchPayload } = JSON.parse(stateInitString);
    return { ...state, ...initState }
  }
  return state;
}

const shipReducer: ShipReducer = (state = initState(), action) => {
  const { type, payload } = action;
  switch(type) {
    case 'SAVE_SHIP':
    case 'UPDATE_SHIP':
    case 'FETCH_SHIP':
    case 'DELETE_SHIPS':
    case 'DELETE_SHIP':
    case 'GET_COUNT_PAGE':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'FETCH_SHIPS':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'FETCH_SHIPS_SUCCESS':
      return {
        ...state,
        ships: payload as Ship[],
        loading: false
      }
    case 'SHIP_FAILURE':
      return {
        ...initState(state),
        loading: false,
        error: payload as string
      }
    case 'UPDATE_SHIP_SUCCESS':
    case 'DELETE_SHIP_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ship: null
      }
    case 'GET_COUNT_PAGE_SUCCESS':
      return {
        ...state,
        loading: false,
        count: payload as number
      }
    case 'SAVE_SHIP_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      }
    case 'FETCH_SHIP_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ship: payload as Ship
      }
    default:
      return state;
  }
}

export default shipReducer;