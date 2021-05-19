import { NamePayload, State } from '../types';

const isIncludes = (contacts: NamePayload[] = [], name: string) => {
  return contacts.findIndex(i => i.name === name) === -1;
}

const isLike = (first = "", second = "") => {
  return first.toLowerCase().includes(second.toLowerCase())
}

/*jwt*/
const jwtSelector = (state: State) => {
  return state.jwt;
}
/*auth*/
const authSelector = (state: State) => state.auth;

/*user*/
const userSelector = (state: State) => state.user;

/*ship*/
const shipSelector = (state: State) => state.ship;

const ownOperatorSelector = (state: State) => state.ownOperator;

const errorSelector = (state: State) => state.excel.error || state.ship.error;

export {
  jwtSelector,
  authSelector,
  userSelector,
  shipSelector,
  ownOperatorSelector,
  errorSelector
}