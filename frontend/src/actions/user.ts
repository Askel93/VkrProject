import { UserResponse, UserActions } from '../types';

const getProfileRequest = (): UserActions => ({
  type: 'PROFILE'
});
const getProfileSuccess = (data: UserResponse): UserActions => ({
  type: 'PROFILE_SUCCESS',
  payload: data
})
const getProfileFailure = (err: string): UserActions => ({
  type: 'PROFILE_FAILURE',
  payload: err
});

export {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure
}