import {LoginUser, User, TokenObject, AuthActions} from '../types';

//login
const loginRequest = (loginUser : LoginUser): AuthActions => ({
  type: 'LOGIN',
  payload: loginUser
});
const loginSuccess = (token : TokenObject): AuthActions => ({
  type: 'LOGIN_SUCCESS',
  payload: token
});

//signUp
const signUpRequest = (newUser : User): AuthActions => ({
  type: 'SIGN_UP',
  payload: newUser
});
const signUpSuccess = (loginUser : LoginUser): AuthActions => ({
  type: 'SIGN_UP_SUCCESS',
  payload: loginUser
});

//logout
const logoutRequest = (data : TokenObject): AuthActions => ({
  type: 'LOGOUT',
  payload: data
});
const logoutSuccess = (): AuthActions => ({
  type: 'LOGOUT_SUCCESS',
});

const authFailure = (err: string): AuthActions => ({
  type: 'AUTH_FAILURE',
  payload: err,
});

export {
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  signUpRequest,
  signUpSuccess,
  authFailure,
}