import { TokenObject, LoginUser, User, urlConstants, Principal } from "../types";
import { api, createApi } from './util';

const signIn = (loginUser: LoginUser) => api<TokenObject>(
  `${urlConstants.AUTH_SERVICE}/oauth/token`, {
    method: "POST",
    body: new URLSearchParams({
      'username': loginUser.userName,
      'password': loginUser.password,
      'grant_type': 'password',
      'scope': 'ui'
    }),
    headers: {
      'Authorization': 'Basic YnJvd3Nlcjo=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

const getPrincipal = (token: string) => api<Principal>(
  `${urlConstants.AUTH_SERVICE}/users/current`,
  { 
    method: "GET", 
    headers: new Headers({ 'Authorization': `Bearer ${token}` }),
  });

const signUp = (newUser: User) => createApi<any>(
  `${urlConstants.USER_SERVICE}/signUp`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    },
  });

const refreshToken = (token: TokenObject) => api<TokenObject>(
  `${urlConstants.AUTH_SERVICE}/oauth/token`, { 
    method: "POST",
    body: new URLSearchParams({
      'refresh_token': token.refresh_token,
      'grant_type': 'refresh_token',
      'scope': 'ui',
    }),
    headers: {
      'Authorization': 'Basic YnJvd3Nlcjo=',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

const logOut = () => api(
  `/auth/logout`,
  { method: "GET" });

export {
  refreshToken,
  logOut,
  signIn,
  signUp,
  getPrincipal,
}