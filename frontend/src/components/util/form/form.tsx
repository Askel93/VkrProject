import React, { CSSProperties, FunctionComponent } from 'react';
import { Form, InputGroup, Breadcrumb, Button, ButtonGroup } from 'react-bootstrap';

import { TableIcon, CardIcon } from '../icon';

import './Form.css';

export interface InputProps {
  id?: string;
  hasValidation?: boolean;
  placeholder?: string;
  value?: string | number;
  type?: string;
  onChange?: (i: string) => void;
  pattern?: string;
  required?: boolean;
  label?: string;
  feedback?: string;
  disabled?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  id = "input",
  hasValidation = false,
  placeholder = "",
  value = "",
  onChange = (i: string) => {},
  label,
  feedback,
  ...other
}) => {
  return (
    <Form.Group controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
        <InputGroup hasValidation={hasValidation}>
          <Form.Control
            placeholder={placeholder}
            aria-describedby={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...other} />
          {feedback 
          ? <Form.Control.Feedback type="invalid">
            {feedback}
          </Form.Control.Feedback>
          : null}
        </InputGroup>
      </Form.Group>
  )
}

const ModalInput: FunctionComponent<InputProps> = ({
  id,
  label,
  value,
  onChange = (i: string) => {},
  children,
  ...other
}) => {
  const inputValue = value ? value : other.disabled ? 'Не указано' : '';
  return (
    <InputGroup id={id}>
      {label &&<InputGroup.Prepend>
        {label}
      </InputGroup.Prepend>}
      <Form.Control
        aria-describedby={id}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)} 
        {...other} />
      {children}
    </InputGroup>
  )
}

export interface SelectProps {
  id: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'lg';
  custom?: boolean;
  onChange: (i: string) => void;
  value: string | number;
}

const Select: FunctionComponent<SelectProps> = ({
  id,
  className = "",
  label,
  size = 'sm',
  children,
  value,
  onChange,
  custom
}) => {
  return (
    <Form.Group controlId={id} className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control as="select" size={size} custom={custom} onChange={(e) => onChange(e.target.value)} value={value}>
        {children}
      </Form.Control>
    </Form.Group>
  )
}

export interface PagePanelProps {
  count: number;
  page: number;
  onItemClick: (i: number) => void;
}

const PagePanel: FunctionComponent<PagePanelProps> = ({ count, page, onItemClick }) => {
  return (
    <Breadcrumb>
      {Array
        .from({ length: count }, (v, i) => i + 1)
        .map((i) => {
          if (i === 1 || i > count - 2 || (i <= page + 2 && i >= page - 2)) {
            return <Breadcrumb.Item key={i} onClick={() => onItemClick(i)}>{i}</Breadcrumb.Item>
          }
        })}
    </Breadcrumb>
  )
}

export interface TypePanelProps {
  active: boolean;
  setActive: (i: boolean) => void;
  style?: CSSProperties
}

const TypePanel: FunctionComponent<TypePanelProps> = ({ active, setActive, children, style = {} }) => {
  return (
    <ButtonGroup style={style}>
      {children}
      <Button variant="outline-secondary" active={active} onClick={() => setActive(true)}>
        <TableIcon />
      </Button>
      <Button variant="outline-secondary" active={!active} onClick={() => setActive(false)}>
        <CardIcon />
      </Button>
    </ButtonGroup>
  )
}

export interface PanelProps {
  sortOptions: { text: string, value: string | number }[];
  size: number;
  sort: string;
  onSizeChange: (size: string) => void;
  onSortChange: (sort: string) => void;
}

const SortPanel: FunctionComponent<PanelProps> = ({
  sortOptions,
  size,
  sort,
  onSizeChange,
  onSortChange
}) => {

  const sizeOptions = [
    { text: "20", value: 20 },
    { text: "40", value: 40 },
    { text: "80", value: 80 },
    { text: "120", value: 120 },
  ]

  return(
    <>
      <Select id="select-sort" className="select-sort" label="Сортировка" custom value={sort} onChange={onSortChange}>
        {sortOptions.map((i) => <option key={i.value} value={i.value}>{i.text}</option>)}
      </Select>
      <Select id="select-size" className="select-size" label="Size page" custom value={size} onChange={onSizeChange}>
        {sizeOptions.map((i) => <option key={i.value} value={i.value}>{i.text}</option>) }
      </Select>
    </>
  )
}

export {
  Input,
  ModalInput,
  Select,
  TypePanel,
  PagePanel,
  SortPanel
}