import { JWTReducer, JWTState, TokenObject } from '../types';

const initState = (): JWTState => {
  const token: TokenObject | null = JSON.parse(sessionStorage.getItem("access_token") as string)
  const refreshToken: TokenObject = JSON.parse(sessionStorage.getItem("refresh_token") || localStorage.getItem("refresh_token") as string);
  if (!refreshToken) {
    return { isAuth: false, isAdmin: false, loading: false };
  }
  const isAuth = refreshToken.accessExp - new Date().getTime() + 5000 > 0;
  const isAdmin = refreshToken.authorities.findIndex(i => i.authority === "ROLE_ADMIN") !== -1;
  return { isAuth, ...refreshToken, access_token: token?.access_token, isAdmin, loading: false };
}

const jwtReducer: JWTReducer = (state = initState(), action) => {
  switch(action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        loading: true
      }
    case 'SET_TOKEN_SUCCESS':
      return initState();
    case 'REMOVE_TOKEN':
    case 'REMOVE_TOKEN_SUCCESS':
      return initState();
    case 'REFRESH':
      return state;
    default:
      return state;
  }
}

export default jwtReducer;