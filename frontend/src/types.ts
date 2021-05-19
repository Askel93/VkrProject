import { Action, Reducer } from "redux";

/*-----------------USER-----------------*/
export interface NamePayload {
  name: string
}

export interface UserResponse extends NamePayload {
  email: string;
  firstName: string | null;
  secondName: string | null;
}

export type UserKeys = 
  | 'PROFILE'
  | 'PROFILE_SUCCESS'
  | 'PROFILE_FAILURE';

export interface UserActions extends Action<UserKeys> {
  payload?: UserResponse | string;
}

export interface UserState extends UserResponse {
  loading: boolean;
  error: string | null;
}

export type UserReducer = Reducer<UserState, UserActions>;

/*-----------------AUTH-----------------*/
export interface LoginUser {
  userName: string;
  password: string;
}

export interface User extends LoginUser {
  email: string;
  firstName?: string;
  secondName?: string;
}

export type AuthKeys =
  | 'LOGIN'
  | 'LOGIN_SUCCESS'
  | 'SIGN_UP'
  | 'SIGN_UP_SUCCESS'
  | 'LOGOUT'
  | 'LOGOUT_SUCCESS'
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
}

export type AuthReducer = Reducer<AuthState, AuthActions>;

export interface Principal {
  authorities: { authority: string }[]
}

export interface TokenObject extends Principal {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refreshId: string;
  accessExp: number;
}

/*-----------------JWT-----------------*/

export type JWTKeys =
  | 'REFRESH'
  | 'REFRESH_SUCCESS'
  | 'SET_TOKEN'
  | 'SET_TOKEN_SUCCESS'
  | 'REMOVE_TOKEN';

export interface JWTState {
  isAuth: boolean;
  isAdmin: boolean;
  access_token?: string;
  refresh_token?: string;
  accessExp?: number;
  loading: boolean;
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
}

export interface ListResponse {
  listId: number[] | string[];
}

export interface DeleteResponse extends ListResponse, FetchPayload {
}

export interface OwnOperator {
  name: string;
  address: string;
  phones: string[];
  email: string;
  fax: string[];
  shipsOwn?: Ship[];
  shipsOperator?: Ship[];
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
  | 'OWNOPERATOR_FAILURE';

export interface OwnOperatorAction extends Action<OwnOperatorKeys> {
  payload?: 
  | string 
  | OwnOperator
  | OwnOperator[]
  | FetchPayload
  | number;
}

export interface OwnOperatorState {
  ownOperator: OwnOperator | null;
  ownOperators: OwnOperator[] | null;
  error: string | null;
  loading: boolean;
  count: number;
}
export const initOwnOperatorState: OwnOperatorState = {
  ownOperator: null,
  ownOperators: null,
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

export interface Ship {
  id: number;
  type: string;
  subType?: string;
  name: string;
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
}

export type ShipKeys = 
  | 'FETCH_SHIPS'
  | 'FETCH_SHIPS_SUCCESS'
  | 'FETCH_SHIP'
  | 'FETCH_SHIP_SUCCESS'
  | 'GET_COUNT_PAGE'
  | 'GET_COUNT_PAGE_SUCCESS'
  | 'SAVE_SHIP'
  | 'SAVE_SHIP_SUCCESS'
  | 'UPDATE_SHIP'
  | 'UPDATE_SHIP_SUCCESS'
  | 'DELETE_SHIPS'
  | 'DELETE_SHIPS_SUCCESS'
  | 'SHIP_FAILURE';

export interface ShipAction extends Action<ShipKeys> {
  payload?: 
  | string
  | Ship 
  | Ship[]
  | FetchPayload
  | number
  | DeleteResponse;
}

export interface ShipState {
  ship: Ship | null;
  ships: Ship[],
  count: number;
  loading: boolean;
  error: string | null
}

export type ShipReducer = Reducer<ShipState, ShipAction>
export type OwnOperatorReducer = Reducer<OwnOperatorState, OwnOperatorAction>

/*----------EXCEL----------*/

export interface ExcelPayload {
  file: File;
}

export type ExcelKeys = 
  | 'SAVE_TO_DB'
  | 'SAVE_TO_DB_SUCCESS'
  | 'SAVE_TO_DB_FAILURE'
  | 'SAVE_TO_EXCEL'
  | 'SAVE_TO_EXCEL_SUCCESS'
  | 'SAVE_TO_EXCEL_FAILURE'
  | 'EXCEL_FAILURE';

export interface ExcelAction extends Action<ExcelKeys> {
  payload?: 
  | File 
  | string 
  | ListResponse
  | FormData;
}

export interface ExcelState {
  loading: boolean;
  error: string | null;
}

export type ExcelReducer = Reducer<ExcelState, ExcelAction>

/*----------STATE----------*/

export interface State {
  auth: AuthState;
  jwt: JWTState;
  user: UserState;
  ship: ShipState;
  ownOperator: OwnOperatorState;
  excel: ExcelState;
}

/*----------UTIL----------*/
export const errorType = {
  LOGIN_PRINCIPAL: "Account with ",
  LOGIN_PWD: "Bad password",
  SIGNUP_EMAIL: "Email ",
  SIGNUP_USERNAME: "UserName ",
  NO_AUTH: "No auth request"
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