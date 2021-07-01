import { FunctionComponent, CSSProperties, ReactNode } from 'react';
import { 
  Capacity,
  Dimensions,
  FetchPayload,
  OwnOperator,
  Ship, 
  ShipEngine,
  defaultShipEngine,
  User,
  errorType,
  urlConstants,
  Engine,
  defaultEngine,
  UserResponse,
  LoginUser,
  ChangePasswordPayload
} from '../types';

interface ListProps<T = {}, ID = number> {
  entities: T[];
  withChecked?: boolean;
  onChecked?: (i: ID) => void;
  isChecked?: (i: ID) => boolean;
  onAllClick?: (ids: ID[]) => void;
  isAllChecked?: (ids: ID[]) => boolean;
}

export interface ItemProps<T = {}, ID = number> {
  withChecked?: boolean;
  entity: T;
  onChecked: (i: ID) => void;
  checked: boolean;
}

interface PanelProps<T=number> extends FetchPayload {
  listId: T[];
  typeList: boolean;
  setTypeList: (type: boolean) => void;
  onSearch: (searchText: string) => void;
  search: string;
  onDeleteClick: () => void;
}

export interface EditModalProps<T> {
  entity: T;
  isCreate?: boolean;
}

export interface BtnGroupProps<T> extends EditModalProps<T> {
  fetchPayload?: FetchPayload
}

export interface ModalItemProps<T = {}> {
  className?: string;
  entity: T;
  style?: CSSProperties;
  disabled?: boolean;
  isCreate?: boolean;
  onClick?: (i: number) => void;
}

export interface RefModalItem<T> {
  saveEntity: () => T;
  isValid: () => boolean;
}

export interface InputProps {
  id?: string;
  hasValidation?: boolean;
  placeholder?: string;
  value?: string | number;
  type?: string;
  onChange?: (i: string) => void;
  pattern?: string;
  required?: boolean;
  label?: string | ReactNode;
  prepend?: string | ReactNode;
  feedback?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onSubmit?: () => void;
  isInvalid?: boolean;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  icon?: ReactNode;
  children?: ReactNode
  ref?: (instance: HTMLInputElement | null) => void | React.RefObject<HTMLInputElement> 
  name?: string;
  defaultValue?: string | number
}

export interface SelectProps {
  id?: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'lg';
  custom?: boolean;
  onChange: (i: string) => void;
  onSubmit?: (i: string) => void
  value?: string | number;
  options?: { text: string, value: string | number}[]
}

export interface OwnOperatorSelectProps {
  id?: string;
  className?: string;
  onSubmit: (i: OwnOperator) => void
  value?: string | number;
}

export interface PagePanelProps {
  count: number;
  page: number;
  onItemClick: (i: number) => void;
}

export interface SortPanelProps {
  size: number;
  sort: string;
  sortOptions: { text: string, value: string | number }[];
  onSortChange: (search: string, size: number) => (sort: string) => void;
  onSizeChange: (search: string, sort: string) => (size: string) => void;
  search: string;
}

export interface TypePanelProps {
  className?: string;
  active: boolean;
  setActive: (i: boolean) => void;
  style?: CSSProperties;
  isNotEmpty: boolean;
  onExcelSave: (fileName: string) => void
  onDeleteClick: () => void
  onSearch: (searchText: string) => void;
  searchText?: string;
  children?: ReactNode
}

export type numberDvigType = 0 | 1 | 2;

export interface EngineModalItemProps {
  numberDvig: numberDvigType
  entity?: Engine;
  disabled?: boolean;
}

export interface OwnOperatorModalProps extends ModalItemProps<OwnOperator> {
  isShip?: boolean;
  prevEntity?: OwnOperator;
  searchText?: string;
  onSearchChange?: (i: string) => void
  idPrefix?: string
}

export interface EntitiesListProps extends FetchPayload {
  search: string;
}

type EntitiesList<T, ID> = FunctionComponent<ListProps<T, ID>>
type List = FunctionComponent<EntitiesListProps>
export type ModalItem<T> = FunctionComponent<ModalItemProps<T>>
export type ProfileType = FunctionComponent

/*-----SHIP_TYPE-----*/
export type ShipItem = FunctionComponent<ItemProps<Ship>>;
export type ShipList = EntitiesList<Ship, number>;
export type ShipsType = List
export type ShipPanel = FunctionComponent<PanelProps>
export type ShipEditModal = FunctionComponent<EditModalProps<Ship>>
export type ShipBtnGroup = FunctionComponent<BtnGroupProps<Ship>>
export type ShipModalItem = ModalItem<Ship>
export type ShipProfileType = ProfileType

export type CapacityModalItem = ModalItem<Capacity>
export type DimensionsModalItem = ModalItem<Dimensions>
export type ShipEngineModalItem = ModalItem<ShipEngine>
export type EngineModalItem = FunctionComponent<EngineModalItemProps>

/*-----OWN_OPERATOR_TYPE-----*/
export type OwnOperatorList = EntitiesList<OwnOperator, string>
export type OwnOperatorItem = FunctionComponent<ItemProps<OwnOperator, string>>
export type OwnOperatorPanel = FunctionComponent<PanelProps<string>>
export type OwnOperatorEditModal = FunctionComponent<EditModalProps<OwnOperator>>
export type OwnOperatorBtnGroup = FunctionComponent<BtnGroupProps<OwnOperator>>
export type OwnOperatorModalItem = FunctionComponent<OwnOperatorModalProps>
export type OwnOperatorsType = List
export type OwnOperatorProfileType = ProfileType
export type OwnOperatorSelectType = FunctionComponent<OwnOperatorSelectProps>

/*-----USER_TYPE-----*/
export type UserEditModal = FunctionComponent<EditModalProps<User>>
export type UserList = FunctionComponent

/*-----FORM_TYPE-----*/
export type InputType = FunctionComponent<InputProps>
export type SelectType = FunctionComponent<SelectProps>
export type SortPanelType = FunctionComponent<SortPanelProps>
export type PagePanelType = FunctionComponent<PagePanelProps>
export type TypePanelType = FunctionComponent<TypePanelProps>

/*-----PATTERN-----*/
export const pwdPattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}";
export const userNamePattern = "(?!.*[;:])(?=^\\S*$).{4,}";
export const confirmPattern = (password: string) => `(?=^${password}$)${pwdPattern}`;
export const newValuePattern = (prev: string | number) => `^(?!${prev}$).*`;
export const newPasswordPattern = (prevPassword: string) => `${newValuePattern(prevPassword)}${pwdPattern}`
export const doublePattern = "^(0|[1-9]\\d*)([.,]\\d+)?";
export const intPattern = "^[1-9]\\d*$";
export const phonePattern = "^[+]?(\\d+[-]?)+$";
export const filePattern = ".{1,}(.xlsx|.xls|.csv)";
export const emailPattern = "^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$"

export type { 
  OwnOperator, 
  Ship, 
  User,
  Engine,
  UserResponse,
  LoginUser,
  Capacity,
  Dimensions,
  ShipEngine,
  ChangePasswordPayload
}
export {
  errorType,
  urlConstants,
  defaultEngine,
  defaultShipEngine
}