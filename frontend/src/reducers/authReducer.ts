import { AuthReducer } from '../types';

const initialState = {
  loading: false,
  error: null
}

const authReducer: AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
    case 'SIGN_UP':
    case 'LOGOUT':
      return {
        ...state,
        loading: true,
      }
    case 'AUTH_FAILURE':
      return {
        loading: false,
        error: action.payload as string
      }
    case 'LOGIN_SUCCESS':
    case 'SIGN_UP_SUCCESS':
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}

export default authReducer;