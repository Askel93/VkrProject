import { JWTActions, TokenObject } from '../types';

//refresh
const refreshRequest = (): JWTActions => ({
  type: 'REFRESH'
});
const refreshSuccess = (token: TokenObject): JWTActions => ({
  type: 'REFRESH_SUCCESS',
  payload: token
});

const jwtSetToken = (token: TokenObject): JWTActions => ({
  type: 'SET_TOKEN',
  payload: token
});
const jwtSetTokenSuccess = (token?: TokenObject): JWTActions => ({
  type: 'SET_TOKEN_SUCCESS',
  payload: token
})

const jwtRemoveToken = (): JWTActions => ({
  type: 'REMOVE_TOKEN'
});
const jwtRemoveTokenSuccess = (): JWTActions => ({
  type: 'REMOVE_TOKEN_SUCCESS',
})

export {
  refreshSuccess,
  refreshRequest,
  jwtSetToken,
  jwtSetTokenSuccess,
  jwtRemoveToken,
  jwtRemoveTokenSuccess
}