import { api, withAuth, stringApi } from './util';
import { urlConstants as url, User, UserResponse } from '../types';

const fetchProfile = () => api<User>(
  `${url.USER_SERVICE}/profile`,
  { method: "GET", headers: withAuth() });

const fetchUpdateProfile = (data: User) => stringApi(
  `${url.USER_SERVICE}/profile`,
  {
    method: "PUT",
    headers: withAuth(new Headers({ 'Content-Type': 'application/json' })),
    body: JSON.stringify(data)
  })

const fetchUsers = () => api<UserResponse[]>(
  `${url.AUTH_SERVICE}/users`,
  { method: "GET", headers: withAuth() })

const fetchAddAdmin = (data: UserResponse) => stringApi(
  `${url.AUTH_SERVICE}/users/toAdmin`,
  {
    method: "POST",
    headers: withAuth(new Headers({ 'Content-Type': 'application/json' })),
    body: JSON.stringify(data)
  })


export {
  fetchProfile,
  fetchUpdateProfile,
  fetchUsers,
  fetchAddAdmin,
}