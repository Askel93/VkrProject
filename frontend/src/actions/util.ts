import { history } from '../store';
import { urlConstants } from '../types';
const LOGIN_URL = urlConstants.LOGIN_URL;

const noAuthRequest = () => {
  localStorage.clear();
  sessionStorage.clear();
  historyPush(LOGIN_URL)
}

const historyPush = (path: string, state?: any) => {
  const { pathname, search } = history.location;
  history.push(path, { ...state, prevPath: pathname + search });
}

const historyGoBack = () => {
  history.go(-1);
}

export {
  historyPush,
  historyGoBack,
  noAuthRequest
}