import { Ship, ShipReducer, ShipState } from '../types';

const initState: ShipState = {
  ship: null,
  error: null,
  ships: [],
  count: 0,
  loading: false
}

const shipReducer: ShipReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'SAVE_SHIP':
    case 'UPDATE_SHIP':
    case 'FETCH_SHIP':
    case 'FETCH_SHIPS':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SHIPS_SUCCESS':
      return {
        ...state,
        ships: payload as Ship[],
        loading: false
      }
    case 'SHIP_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload as string
      }
    case 'GET_COUNT_PAGE_SUCCESS':
      return {
        ...state,
        count: payload as number
      }
    case 'UPDATE_SHIP_SUCCESS':
    case 'SAVE_SHIP_SUCCESS':
      return {
        ...state,
        loading: false
      }
    case 'FETCH_SHIP_SUCCESS':
      return {
        ...state,
        loading: false,
        ship: payload as Ship
      }
    default:
      return state;
  }
}

export default shipReducer;