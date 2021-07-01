import { OwnOperatorAction, OwnOperator, FetchPayload, DeleteResponse } from '../types';

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
const fetchOwnOperatorsSuccess = (data: OwnOperator[], payload: FetchPayload): OwnOperatorAction => {
  sessionStorage.setItem("ownOperators", JSON.stringify({ ownOperators: data, fetchPayload: payload }))
  return {
    type: 'FETCH_OWNOPERATORS_SUCCESS',
    payload: data,
  };
}

const updateOwnOperator = (data: OwnOperator): OwnOperatorAction => ({
  type: 'UPDATE_OWNOPERATOR',
  payload: data
})
const updateOwnOperatorSuccess = (name: string): OwnOperatorAction => ({
  type: 'UPDATE_OWNOPERATOR_SUCCESS',
  payload: name
})

const getCountPageOwn = (data: FetchPayload): OwnOperatorAction => ({
  type: 'GET_COUNT_PAGE_OWN',
  payload: data
})
const getCountPageOwnSuccess = (count: number): OwnOperatorAction => ({
  type: 'GET_COUNT_PAGE_OWN_SUCCESS',
  payload: count,
})

const deleteOwnOperators = (data: DeleteResponse): OwnOperatorAction => ({
  type: 'DELETE_OWNOPERATORS',
  payload: data,
})
const deleteOwnOperatorsSuccess = (data: FetchPayload): OwnOperatorAction => ({
  type: 'DELETE_OWNOPERATORS_SUCCESS',
  payload: data
})

const saveOwnOperator = (data: OwnOperator): OwnOperatorAction => ({
  type: 'SAVE_OWNOPERATOR',
  payload: data
})
const saveOwnOperatorSuccess = (name: string): OwnOperatorAction => ({
  type: 'SAVE_OWNOPERATOR_SUCCESS',
  payload: name
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
  deleteOwnOperators,
  deleteOwnOperatorsSuccess,
  saveOwnOperator,
  saveOwnOperatorSuccess,
  ownOperatorFailure,
}