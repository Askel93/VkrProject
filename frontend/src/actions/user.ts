import { UserActions, User, UserResponse } from '../types';

const getProfileRequest = (): UserActions => ({
  type: 'PROFILE'
});
const getProfileSuccess = (data: User): UserActions => ({
  type: 'PROFILE_SUCCESS',
  payload: data
})

const updateProfile = (data: User): UserActions => ({
  type: 'UPDATE_PROFILE',
  payload: data
})
const updateProfileSuccess = (data: User, prevPath?: string): UserActions => ({
  type: 'UPDATE_PROFILE_SUCCESS',
  payload: data,
  prevPath
})

const getUsers = (): UserActions => ({
  type: 'FETCH_USERS'
})
const getUsersSuccess = (data: UserResponse[]): UserActions => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: data
})

const addAdmin = (data: UserResponse): UserActions => ({
  type: 'ADD_ADMIN',
  payload: data
})
const addAdminSuccess = (data: UserResponse): UserActions => ({
  type: 'ADD_ADMIN_SUCCESS',
  payload: data
})

const userFailure = (err: string): UserActions => ({
  type: 'USER_FAILURE',
  payload: err
})

export {
  getProfileRequest,
  getProfileSuccess,
  updateProfile,
  updateProfileSuccess,
  getUsers,
  getUsersSuccess,
  addAdmin,
  addAdminSuccess,
  userFailure,
}