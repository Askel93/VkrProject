import { initOwnOperatorState, OwnOperatorReducer, OwnOperator, OwnOperatorState, FetchPayload } from '../types';

const initState = (state: OwnOperatorState = initOwnOperatorState): OwnOperatorState => {
  const stateInitString = sessionStorage.getItem("ownOperators");
  if (stateInitString !== null) {
    const initState: { ownOperators: OwnOperator[], fetchPayload: FetchPayload } = JSON.parse(stateInitString);
    return { ...state, ...initState }
  }
  return state;
}

const ownOperatorReducer: OwnOperatorReducer = (state = initState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_OWNOPERATOR':
    case 'UPDATE_OWNOPERATOR':
    case 'DELETE_OWNOPERATORS':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_OWNOPERATORS':
      return {
        ...state,
        loading: true,
        fetchPayload: payload as FetchPayload,
        error: null,
      }
    case 'FETCH_OWNOPERATOR_SUCCESS':
      return {
        ...state,
        ownOperator: payload as OwnOperator,
        loading: false,
        error: null
      }
    case 'DELETE_OWNOPERATORS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      }
    case 'FETCH_OWNOPERATORS_SUCCESS':
      return {
        ...state,
        ownOperators: payload as OwnOperator[],
        loading: false,
        error: null
      }
    case 'GET_COUNT_PAGE_OWN_SUCCESS':
      return {
        ...state,
        loading: false,
        count: payload as number,
        error: null
      }
    case 'OWNOPERATOR_FAILURE':
      return {
        ...initState(state),
        loading: false,
        error: payload as string
      }
    default:
      return state;
  }
}

export default ownOperatorReducer;