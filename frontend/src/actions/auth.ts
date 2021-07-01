import {LoginUser, User, TokenObject, AuthActions} from '../types';

//login
const loginRequest = (loginUser : LoginUser, prevPath?: string): AuthActions => ({
  type: 'LOGIN',
  payload: loginUser,
  prevPath
});
const loginSuccess = (token : TokenObject, prevPath?: string): AuthActions => ({
  type: 'LOGIN_SUCCESS',
  payload: token,
  prevPath
});

//signUp
const signUpRequest = (newUser : User, prevPath?: string): AuthActions => ({
  type: 'SIGN_UP',
  payload: newUser,
  prevPath
});
const signUpSuccess = (loginUser : LoginUser): AuthActions => ({
  type: 'SIGN_UP_SUCCESS',
  payload: loginUser
});

const authFailure = (err: string): AuthActions => ({
  type: 'AUTH_FAILURE',
  payload: err,
});

export {
  loginRequest,
  loginSuccess,
  signUpRequest,
  signUpSuccess,
  authFailure,
}