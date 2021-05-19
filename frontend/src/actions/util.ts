import { history } from '../store';
import { urlConstants } from '../types';
const LOGIN_URL = urlConstants.LOGIN_URL;

const historyPush = (path: string) => {
  history.push(path);
}

const noAuthRequest = () => {
  localStorage.removeItem("token");
  sessionStorage.clear();
  history.push(LOGIN_URL);
}

const historyGoBack = () => {
  history.go(-1);
}

export {
  historyPush,
  historyGoBack,
  noAuthRequest
}