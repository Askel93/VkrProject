import { JWTReducer, JWTState, TokenObject } from '../types';


//todo
const initState = (token: TokenObject = JSON.parse(localStorage.getItem("token") as string)): JWTState => {

  if (!token) {
    return { isAuth: false, isAdmin: false, loading: false };
  }
  
  console.log(token.accessExp);
  const isAuth = token.accessExp - new Date().getTime() > 0;
  const isAdmin = token.authorities.findIndex(i => i.authority === "ROLE_ADMIN") !== -1;
  return { isAuth, ...token, isAdmin, loading: false };
}

const jwtReducer: JWTReducer = (state = initState(), action) => {
  switch(action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        loading: true
      }
    case 'SET_TOKEN_SUCCESS':
      return initState(action.payload as TokenObject);
    case 'REMOVE_TOKEN':
      state = initState();
      return state;
    case 'REFRESH':
      return state;
    case 'REFRESH_SUCCESS':
      return state;
    default:
      return state;
  }
}

export default jwtReducer;