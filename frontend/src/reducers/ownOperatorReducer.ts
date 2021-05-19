import { initOwnOperatorState, OwnOperatorReducer, OwnOperator } from '../types';

const ownOperatorReducer: OwnOperatorReducer = (state = initOwnOperatorState, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'FETCH_OWNOPERATOR':
    case 'FETCH_OWNOPERATORS':
    case 'UPDATE_OWNOPERATOR':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_OWNOPERATOR_SUCCESS':
      return {
        ...state,
        ownOperator: payload as OwnOperator,
        loading: false
      }
    case 'UPDATE_OWNOPERATOR_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'OWNOPERATOR_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload as string
      }
    case 'FETCH_OWNOPERATORS_SUCCESS':
      return {
        ...state,
        ownOperators: payload as OwnOperator[],
        loading: false
      }
    case 'GET_COUNT_PAGE_OWN_SUCCESS':
      return {
        ...state,
        count: payload as number,
      }
    default:
      return state;
  }
}

export default ownOperatorReducer;