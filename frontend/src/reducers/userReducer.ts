import { UserReducer, User, initUserState, UserResponse } from '../types'

const userReducer: UserReducer = (state = initUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PROFILE':
    case 'FETCH_USERS':
    case 'ADD_ADMIN':
      // case 'UPDATE_PROFILE':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'PROFILE_SUCCESS':
      const user = payload as User;
      return {
        ...state,
        ...user,
        loading: false,
        error: null
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload as UserResponse[]
      }
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      }
    case 'ADD_ADMIN_SUCCESS':
      let addedAdmin = action.payload as UserResponse;
      addedAdmin.admin = true;
      const users = state.users as UserResponse[];
      const index = users.findIndex(i => i.userName === addedAdmin.userName);
      const newUserArr = [...users.slice(0, index), addedAdmin, ...users.slice(index + 1)]
      return {
        ...state,
        error: null,
        loading: false,
        users: newUserArr
      }
    case 'USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: payload as string
      }
    case 'LOGOUT':
      return initUserState;
    default:
      return state
  }
}

export default userReducer;