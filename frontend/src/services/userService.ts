import { api, withAuth } from './util';
import { urlConstants as url, UserResponse } from '../types';

const fetchProfile = () => api<UserResponse>(
  `${url.USER_SERVICE}/profile`,
  { method:"GET" , headers: withAuth() });

export {
  fetchProfile
}