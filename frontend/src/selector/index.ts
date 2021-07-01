import { Ship } from '../components/types';
import { errorType, State, ShipSortParam } from '../types';
import { createSelector } from 'reselect';

const filterSelector = (state: State) => state.filter;
/*jwt*/
const jwtSelector = (state: State) => state.jwt;
const jwtAuthSelector = createSelector(
  jwtSelector,
  jwt => ({ isAdmin: jwt.isAdmin, isAuth: jwt.isAuth })
)
/*auth*/
const authSelector = (state: State) => state.auth;

/*user*/
const userSelector = (state: State) => state.user;
const userListSelector = (searchText: string, page: number) => createSelector(
  userSelector,
  (user) => {
    const users = user.users !== null
      ? user.users.filter(i => (i.userName.includes(searchText) || i.email.includes(searchText)) && i.userName !== user.userName)
      : [];
    return {
      users: users.slice(0, page * 10),
      isEnd: users.length <= page * 10
    }
  }
)

/*ship*/
const shipSelector = (state: State) => state.ship;
const shipProfileSelector = (id: number) => createSelector(
  shipSelector,
  ({ ship, ships }) => ship !== null && ship.id === id
    ? ship
    : ships.find(i => i.id === id) || null
)
const shipsSelector = createSelector(
  shipSelector,
  ship => ({ ships: ship.ships, loading: ship.loading, count: ship.count, error: ship.error })
)

const shipsOfflineSelector = ({ page, size, sort, search }: { page: number, size: number, sort: ShipSortParam, search?: string }) => createSelector(
  shipSelector,
  ({ ships, fetchPayload, count }) => ({ countPage: count, ships, fetchPayload })
)


const shipEditSelector = (entity: Ship, show: boolean = false) => createSelector(
  shipSelector,
  ({ ship }) => {
    const editShip = (ship !== null && entity.id === ship.id) ? ship : entity;
    return show ? editShip : entity
  }
)

const ownOperatorSelector = (state: State) => state.ownOperator;
const ownOperatorProfileSelector = (name?: string) => createSelector(
  ownOperatorSelector,
  ({ ownOperator, ownOperators }) => ownOperator !== null && ownOperator.name === name
    ? ownOperator
    : ownOperators.find(i => i.name === name) || null
)
const ownOperatorWithSearch = (searchText: string) => createSelector(
  ownOperatorSelector,
  ({ ownOperators, loading }) => {
    const res = { ownOperators, loading };
    if (searchText.trim() === "") return res;
    return { ...res, ownOperators: ownOperators.filter(val => val.name.toLowerCase().includes(searchText.toLowerCase())) }
  }
)

const errorSelector = (state: State) => {
  const err = state.excel.error || state.ownOperator.error || state.ship.error;

  return err?.includes(errorType.NOT_FOUND)
    ? null
    : err?.includes(errorType.FAILED_FETCH)
      ? "Отстутствует соединение с интернетом"
      : err;
}

const loadingSelector = (state: State) => state.auth.loading || state.excel.loading || state.ownOperator.loading || state.user.loading || state.ship.loading;

export {
  jwtSelector,
  authSelector,
  userSelector,
  userListSelector,
  shipSelector,
  shipsSelector,
  shipsOfflineSelector,
  shipEditSelector,
  shipProfileSelector,
  ownOperatorSelector,
  ownOperatorWithSearch,
  ownOperatorProfileSelector,
  errorSelector,
  jwtAuthSelector,
  loadingSelector,
  filterSelector,
}