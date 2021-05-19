import { UserReducer, UserResponse, UserState } from '../types'

const init = (): UserState => {
  const userString = sessionStorage.getItem("user");
  let user: UserResponse;
  if (!userString) {
    user = {name: "", email: "", firstName: null, secondName: null };
  }
  else {
    user = JSON.parse(userString);
  }
  return { ...user, loading: false, error: null };
}

const userReducer: UserReducer = (state = init(), action) => {
  const { type, payload } = action;
  switch(type) {
    case 'PROFILE':
      return {
        ...state,
        loading: true
      }
    case 'PROFILE_SUCCESS':
      const user = payload as UserResponse;
      return {
        ...state,
        ...user,
        loading: false,
        error: null
      }
    case 'PROFILE_FAILURE':
      return {
        ...init(),
        loading: false,
        error: payload as string
      }
    default:
      return state
  }
}

export default userReducer;