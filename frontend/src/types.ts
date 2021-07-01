import { Action, Reducer } from "redux";

/*-----------------USER-----------------*/

export type UserKeys =
  | 'PROFILE'
  | 'PROFILE_SUCCESS'
  | 'UPDATE_PROFILE'
  | 'UPDATE_PROFILE_SUCCESS'
  | 'FETCH_USERS'
  | 'FETCH_USERS_SUCCESS'
  | 'USER_FAILURE'
  | 'ADD_ADMIN'
  | 'ADD_ADMIN_SUCCESS'
  | 'LOGOUT';

export interface UserActions extends Action<UserKeys> {
  payload?:
  | User
  | string
  | UserResponse
  | UserResponse[];
  prevPath?: string;
}

export interface UserState {
  userName: string;
  email: string;
  firstName?: string;
  secondName?: string;
  loading: boolean;
  error: string | null;
  users: UserResponse[] | null;
}

export const initUserState: UserState = {
  userName: '',
  email: '',
  loading: false,
  error: null,
  users: null
}

export type UserReducer = Reducer<UserState, UserActions>;

/*-----------------AUTH-----------------*/
export interface LoginUser {
  userName: string;
  password: string;
  isRemember?: boolean;
}

export interface User extends LoginUser {
  email: string;
  firstName?: string;
  secondName?: string;
  confirmPassword?: string;
}

export interface ChangePasswordPayload extends User {
  newPassword: string;
}

export interface UserResponse {
  userName: string;
  email: string;
  admin: boolean;
}

export type AuthKeys =
  | 'LOGIN'
  | 'LOGIN_SUCCESS'
  | 'SIGN_UP'
  | 'SIGN_UP_SUCCESS'
  | 'AUTH_FAILURE'
  | 'NO_AUTH_REQUEST';


export interface AuthState {
  loading: boolean;
  error: string | null;
}

export interface AuthActions extends Action<AuthKeys> {
  payload?:
  | string
  | LoginUser
  | TokenObject
  | User;
  prevPath?: string;
}

export type AuthReducer = Reducer<AuthState, AuthActions>;

export interface Principal {
  authorities: { authority: string }[]
}

export interface TokenObject extends Principal {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  accessExp: number;
  isRemember?: boolean;
}

/*-----------------JWT-----------------*/

export type JWTKeys =
  | 'REFRESH'
  | 'REFRESH_SUCCESS'
  | 'SET_TOKEN'
  | 'SET_TOKEN_SUCCESS'
  | 'REMOVE_TOKEN'
  | 'REMOVE_TOKEN_SUCCESS';

export interface JWTState {
  isAuth: boolean;
  isAdmin: boolean;
  access_token?: string;
  refresh_token?: string;
  accessExp?: number;
  loading: boolean;
  isRemember?: boolean;
}

export interface JWTActions extends Action<JWTKeys> {
  payload?: TokenObject
}

export type JWTReducer = Reducer<JWTState, JWTActions>

/*----------SHIP----------*/

export interface FetchPayload {
  page: number;
  size: number;
  sort?: string;
  search?: string;
}

export interface ListResponse {
  listId: number[] | string[];
}
export interface SaveToExcelPayload extends ListResponse {
  fileName: string;
}

export interface DeleteResponse extends ListResponse, FetchPayload { }

export interface OwnOperator {
  name: string;
  address: string;
  phones: string[];
  email: string;
  fax: string[];
  shipsOwn?: Ship[];
  shipsOperator?: Ship[];
}
export const defaultOwnOperator: OwnOperator = {
  name: '',
  address: '',
  email: '',
  phones: [],
  fax: []
}

export type OwnOperatorKeys =
  | 'FETCH_OWNOPERATOR'
  | 'FETCH_OWNOPERATOR_SUCCESS'
  | 'FETCH_OWNOPERATORS'
  | 'FETCH_OWNOPERATORS_SUCCESS'
  | 'UPDATE_OWNOPERATOR'
  | 'UPDATE_OWNOPERATOR_SUCCESS'
  | 'GET_COUNT_PAGE_OWN'
  | 'GET_COUNT_PAGE_OWN_SUCCESS'
  | 'DELETE_OWNOPERATORS'
  | 'DELETE_OWNOPERATORS_SUCCESS'
  | 'SAVE_OWNOPERATOR'
  | 'SAVE_OWNOPERATOR_SUCCESS'
  | 'OWNOPERATOR_FAILURE';

export interface OwnOperatorAction extends Action<OwnOperatorKeys> {
  payload?:
  | string
  | OwnOperator
  | OwnOperator[]
  | FetchPayload
  | number
  | DeleteResponse;
  prevPath?: string;
}

export interface OwnOperatorState {
  ownOperator: OwnOperator | null;
  ownOperators: OwnOperator[];
  error: string | null;
  loading: boolean;
  count: number;
  fetchPayload?: FetchPayload;
}
export const initOwnOperatorState: OwnOperatorState = {
  ownOperator: null,
  ownOperators: [],
  loading: false,
  error: null,
  count: 0,
}

export interface Capacity {
  dedv: number | null;
  passK: number | null;
  passP: number | null;
  gt: number | null;
  nt: number | null;
}
export const defaultCapacity: Capacity = {
  dedv: null,
  passK: null,
  passP: null,
  gt: null,
  nt: null
}

export interface Dimensions {
  disp: number | null;
  length: number | null;
  breadth: number | null;
  draught: number | null;
  depth: number | null;
  shipClass: string | null;
}
export const defaultDimensions: Dimensions = {
  disp: null,
  length: null,
  breadth: null,
  draught: null,
  depth: null,
  shipClass: null
}

export interface Engine {
  count: number;
  pwr: number;
  dvig: string;
}

export const defaultEngine: Engine = {
  count: 0,
  pwr: 0,
  dvig: ''
}

export interface ShipEngine {
  engines: Engine[];
  // engine1?: Engine;
  // engine2?: Engine;
  // engine3?: Engine;
  sumPwr: number;
}
export const defaultShipEngine: ShipEngine = {
  sumPwr: 0,
  engines: []
}

export interface Ship {
  id: number;
  type: string;
  name: string;
  subType?: string;
  callSign?: string;
  imo: number;
  project: string;
  port: string;
  speed: number;
  godP: number;
  ownName: string;
  own?: OwnOperator;
  operatorName: string;
  operator?: OwnOperator;
  shipCapacity?: Capacity;
  shipDimensions?: Dimensions;
  shipEngine?: ShipEngine;
}

export type ShipSortParam =
  | 'id'
  | 'type'
  | 'name'

export type ShipListParams =
  | 'ts'
  | 'ps'

export const defaultShip: Ship = {
  id: 0,
  type: '',
  name: '',
  imo: 0,
  project: '',
  port: '',
  speed: 0,
  godP: 0,
  ownName: '',
  operatorName: '',
}

export type ShipKeys =
  | 'FETCH_SHIPS'
  | 'FETCH_SHIPS_SUCCESS'
  | 'FETCH_SHIPS_2'
  | 'FETCH_SHIPS_2_SUCCESS'
  | 'FETCH_SHIP'
  | 'FETCH_SHIP_SUCCESS'
  | 'GET_COUNT_PAGE'
  | 'GET_COUNT_PAGE_SUCCESS'
  | 'SAVE_SHIP'
  | 'SAVE_SHIP_SUCCESS'
  | 'UPDATE_SHIP'
  | 'UPDATE_SHIP_SUCCESS'
  | 'DELETE_SHIPS'
  | 'DELETE_SHIP'
  | 'DELETE_SHIP_SUCCESS'
  | 'SHIP_FAILURE';

export interface ShipAction extends Action<ShipKeys> {
  payload?:
  | string
  | Ship
  | Ship[]
  | FetchPayload
  | number
  | ListResponse
  | DeleteResponse;
  prevPath?: string
}

export interface ShipState {
  ship: Ship | null;
  ships: Ship[];
  count: number;
  loading: boolean;
  error: string | null
  fetchPayload?: FetchPayload;
}

export const initShipState: ShipState = {
  ship: null,
  error: null,
  ships: [],
  count: 0,
  loading: false,
}

export type ShipReducer = Reducer<ShipState, ShipAction>
export type OwnOperatorReducer = Reducer<OwnOperatorState, OwnOperatorAction>

/*----------EXCEL----------*/

export type ExcelKeys =
  | 'SAVE_TO_DB'
  | 'SAVE_TO_DB_SUCCESS'
  | 'SAVE_TO_DB_FAILURE'
  | 'SAVE_TO_EXCEL'
  | 'SAVE_TO_EXCEL_SUCCESS'
  | 'SAVE_TO_EXCEL_FAILURE'
  | 'SAVE_TO_EXCEL_BY_OWN'
  | 'EXCEL_FAILURE';

export interface ExcelAction extends Action<ExcelKeys> {
  payload?:
  | string
  | SaveToExcelPayload
  | FormData;
}

export interface ExcelState {
  loading: boolean;
  error: string | null;
}

export type ExcelReducer = Reducer<ExcelState, ExcelAction>

/*----------FILTERS----------*/

export interface MinMaxFilter {
  min: number;
  max: number;
}

export interface ShipFilter {
  ns: number;
  xs: number;
  ng: number;
  xg: number;
  ts: string[];
  ps: string[];
}

export interface CapacityFilter {
  nd: number;
  xd: number;
  npk: number;
  xpk: number;
  npp: number;
  xpp: number;
  nnt: number;
  xnt: number;
  ngt: number;
  xgt: number;
}

export interface DimensionsFilter {
  ndp: number;
  xdp: number;
  nl: number;
  xl: number;
  nb: number;
  xb: number;
  ndt: number;
  xdt: number;
  ndh: number;
  xdh: number;
}

export interface Filters extends ShipFilter, CapacityFilter, DimensionsFilter {
  npwr: number;
  xpwr: number;
}


export type FilterState = Filters | null

export type MinFilterKey =
  | 'ns'
  | 'ng'
  | 'nd'
  | 'npk'
  | 'npp'
  | 'nnt'
  | 'ngt'
  | 'nb'
  | 'ndh'
  | 'ndp'
  | 'ndt'
  | 'nl'
  | 'npwr';

export type MaxFilterKey =
  | 'xs'
  | 'xg'
  | 'xd'
  | 'xpk'
  | 'xpp'
  | 'xnt'
  | 'xgt'
  | 'xb'
  | 'xdh'
  | 'xdp'
  | 'xdt'
  | 'xl'
  | 'xpwr';

export interface FilterActions extends Action<'SET_FILTERS' | 'INIT_FILTERS'> {
  payload: Filters
}

export type FilterReducer = Reducer<FilterState, FilterActions>

/*----------STATE----------*/

export interface State {
  auth: AuthState;
  jwt: JWTState;
  user: UserState;
  ship: ShipState;
  ownOperator: OwnOperatorState;
  excel: ExcelState;
  filter: FilterState;
}

export const testState: State = {
  auth: {
    loading: false,
    error: null
  },
  jwt: {
    isAdmin: true,
    isAuth: true,
    loading: false,
  },
  user: {
    email: "email@mail.ru",
    userName: "nikname",
    firstName: "firstName",
    secondName: 'secondName',
    error: null,
    loading: false,
    users: [
      { userName: "nikita", email: "qwerty@mail.ru", admin: true },
      { userName: "mitinikitos", email: "qwerty@mail.ru", admin: false },
      { userName: "nikitos", email: "qwerty@mail.ru", admin: false },
      { userName: "first", email: "qwerty@mail.ru", admin: false },
      { userName: "second", email: "qwerty@mail.ru", admin: false },
      { userName: "third", email: "qwerty@mail.ru", admin: false },
      { userName: "fourth", email: "qwerty@mail.ru", admin: false },
      { userName: "fifth", email: "qwerty@mail.ru", admin: false },
      { userName: "six", email: "qwerty@mail.ru", admin: false },
      { userName: "seven", email: "qwerty@mail.ru", admin: false },
      { userName: "eight", email: "qwerty@mail.ru", admin: false },
    ],
  },
  ship: {
    ship: {
      id: 1,
      name: "first",
      type: "qwerty",
      imo: 12,
      project: "qwr",
      port: "SPb",
      speed: 12,
      godP: 2019,
      ownName: "own",
      operatorName: "name",
      own: { name: "own", address: "address", email: "qwn@mail.ru", phones: ["120968594", "12116435"], fax: ["120968594", "12116435"] },
      operator: { name: "own", address: "address", email: "qwn@mail.ru", phones: ["120968594", "12116435"], fax: ["120968594", "12116435"] },
      shipCapacity: { dedv: 124, nt: 1241, passP: 1214, passK: 128753, gt: 12141 },
      shipDimensions: { breadth: 12, depth: 124, disp: 5445, draught: 232, length: 132, shipClass: "sdosd" },
      shipEngine: defaultShipEngine
    },
    loading: false,
    error: null,
    count: 20,
    ships: [
      { id: 1, godP: 2010, imo: 12, name: "second", speed: 2, ownName: "own", operatorName: "operator", port: "SPb", project: "pr", type: "" },
      { id: 2, godP: 1940, imo: 12, name: "first", speed: 10, ownName: "own", operatorName: "operator", port: "SPb", project: "pr", type: "" },
      { id: 3, godP: 2020, imo: 12, name: "third", speed: 22, ownName: "own", operatorName: "operator", port: "SPb", project: "pr", type: "" },
    ]
  },
  ownOperator: {
    ownOperator: {
      name: 'first',
      address: 'address',
      email: 'email',
      phones: ['12141413', '12141'],
      fax: ['12142'],
      shipsOwn: [
        { id: 2, name: "second", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
        { id: 1, name: "first", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
        { id: 3, name: "third", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
        { id: 4, name: "third", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
      ]
    },
    count: 7,
    error: null,
    loading: false,
    ownOperators: [
      { name: "first", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "second", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "third", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "fourth", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "fifth", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "first1", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "first2", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "first3", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "first4", address: "address", email: 'email', fax: ['12414'], phones: ['124141'] },
      { name: "first5", address: "address", email: 'emailemailemailemailemailemail emailemailemail emailemailemail', fax: ['12414'], phones: ['124141'] },
    ]
  },
  excel: {
    loading: false,
    error: null
  },
  filter: {
    ts: ["буксир", "ледокол"],
    ps: ['Новороссийск', 'Архангельск'],
    ns: 0, 
    xs: 42,
    ng: 1931, 
    xg: 2021,
    nd: 0, 
    xd: 1000,
    ngt: 0, 
    xgt: 1000,
    nnt: 0, 
    xnt: 1000,
    npk: 0, 
    xpk: 1000,
    npp: 0, 
    xpp: 1000,
    nb: 0, 
    xb: 1000,
    ndh: 0, 
    xdh: 1000,
    ndp: 0, 
    xdp: 1000,
    ndt: 0, 
    xdt: 1000,
    nl: 0, 
    xl: 1000,
    npwr: 0,
    xpwr: 1000
  }
}

/*----------UTIL----------*/
export const errorType = {
  LOGIN_PRINCIPAL: "Account with username",
  LOGIN_PWD: "Bad credentials",
  PWD_INVALID: "Bad password",
  SIGNUP_EMAIL: "User with email",
  SIGNUP_USERNAME: "User with username",
  NO_AUTH: "No auth request",
  SERVER_ERROR: "Error server",
  NOT_FOUND: "NOT_FOUND",
  FAILED_FETCH: "Failed to fetch",
}

export const urlConstants = {
  LOGIN_URL: "/auth/signin",
  SIGNUP_URL: "/auth/signup",

  //backend service url
  USER_SERVICE: "/api/accounts",
  AUTH_SERVICE: "/api/uaa",
  SHIP_SERVICE: "/api/ship",
  EXCEL_SERVICE: "/api/excel"
}