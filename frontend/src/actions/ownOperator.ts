import { OwnOperatorAction, OwnOperator, FetchPayload } from '../types';

const fetchOwnOperator = (name: string): OwnOperatorAction => ({
  type: 'FETCH_OWNOPERATOR',
  payload: name,
});
const fetchOwnOperatorSuccess = (data: OwnOperator): OwnOperatorAction => ({
  type: 'FETCH_OWNOPERATOR_SUCCESS',
  payload: data,
});

const fetchOwnOperators = (data: FetchPayload): OwnOperatorAction => ({
  type: 'FETCH_OWNOPERATORS',
  payload: data
});
const fetchOwnOperatorsSuccess = (data: OwnOperator[]): OwnOperatorAction => ({
  type: 'FETCH_OWNOPERATORS_SUCCESS',
  payload: data,
});

const updateOwnOperator = (data: OwnOperator): OwnOperatorAction => ({
  type: 'UPDATE_OWNOPERATOR',
  payload: data
})
const updateOwnOperatorSuccess = (name: string): OwnOperatorAction => ({
  type: 'UPDATE_OWNOPERATOR_SUCCESS',
  payload: name
})

const getCountPageOwn = (size: number): OwnOperatorAction => ({
  type: 'GET_COUNT_PAGE_OWN',
  payload: size
})
const getCountPageOwnSuccess = (count: number): OwnOperatorAction => ({
  type: 'GET_COUNT_PAGE_OWN_SUCCESS',
  payload: count,
})

const ownOperatorFailure = (err: string): OwnOperatorAction => ({
  type: 'OWNOPERATOR_FAILURE',
  payload: err
})


export {
  fetchOwnOperator,
  fetchOwnOperatorSuccess,
  fetchOwnOperators,
  fetchOwnOperatorsSuccess,
  updateOwnOperator,
  updateOwnOperatorSuccess,
  getCountPageOwn,
  getCountPageOwnSuccess,
  ownOperatorFailure,
}