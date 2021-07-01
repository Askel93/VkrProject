import React, { KeyboardEvent, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux'
import { Form, InputGroup, FormGroup, FormControl, Button, ButtonGroup, Modal } from 'react-bootstrap';

import { SearchIcon, TableIcon, CardIcon, TrushIcon, DownloadIcon } from '../icon';
import { jwtAuthSelector } from '../../../selector';
import { InputType, SelectType, SortPanelType, TypePanelType, filePattern } from '../../types';

const ExcelModal = ({ onClick }: { onClick: (fileName: string) => void }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [filename, setFilename] = useState("filename.xlsx");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    e.preventDefault();
    onClick(filename);
    setShow(false);
  }
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        className="d-flex" variant="success"><DownloadIcon /></Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Выгрузка в excel</Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Input
              value={filename}
              onChange={setFilename}
              required
              hasValidation
              id="filenameinput"
              className="file-input"
              pattern={filePattern}
              feedback="Please provide a valid value" />
            <Button type="submit" variant="secondary">Сохранить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

const InputControl: InputType = ({
  id = "input",
  hasValidation = false,
  placeholder = "",
  value,
  children,
  onChange = () => { },
  label,
  feedback,
  prepend,
  className,
  onSubmit = () => { },
  min,
  max,
  step,
  icon,
  style,
  ...other
}) => {
  const inputValue = value ? value : other.disabled ? 'Не указано' : '';
  const onEnterPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }
  let otherProps: { step?: typeof step, min?: typeof min, max?: typeof max } = { min, max };
  if (other.type === 'number') {
    otherProps.step = step || "0.01";
  }
  const [active, setActive] = useState(false);
  const classNamePrefix = active ? " focus-input" : "";

  return (
    <FormGroup controlId={id} className={className} style={style}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <InputGroup hasValidation={hasValidation} className={classNamePrefix} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
        {prepend && <InputGroup.Prepend as="label" htmlFor={id} style={{ margin: 'auto' }}>{prepend}</InputGroup.Prepend>}
        {icon && <InputGroup.Prepend className="icon">{icon}</InputGroup.Prepend>}
        <FormControl
          aria-label={id}
          placeholder={placeholder}
          aria-describedby={id}
          value={value}
          defaultValue={inputValue}
          onKeyPress={onEnterPress}
          onChange={(e) => onChange(e.target.value)}
          {...other}
          {...otherProps} />
        {children}
        {feedback
          ? <FormControl.Feedback type="invalid">
            {feedback}
          </FormControl.Feedback>
          : null}
      </InputGroup>
    </FormGroup>
  )
}

const SelectInput: SelectType = ({
  id,
  className = "",
  label,
  size,
  value,
  onChange,
  custom,
  options = []
}) => {
  return (
    <Form.Group controlId={id} className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control as="select" size={size} custom={custom} onChange={(e) => onChange(e.target.value)} value={value}>
        {options.map(i => <option key={i.value} value={i.value}>{i.text}</option>)}
      </Form.Control>
    </Form.Group>
  )
}

const Panel: TypePanelType = ({
  active,
  setActive,
  style,
  className = "type-list",
  isNotEmpty,
  onExcelSave,
  onDeleteClick,
  onSearch,
  searchText: initText = "",
  children
}) => {
  const { isAdmin } = useSelector(jwtAuthSelector);
  const [searchText, setSearchText] = useState(initText);
  const excelModal = useMemo(() => <ExcelModal onClick={onExcelSave} />, [onExcelSave]);

  return (
    <div className="panel child p-0">
      <Input 
        placeholder="Search"
        prepend={<SearchIcon />}
        className="search-panel mb-0 mt-auto"
        id="searchpanel"
        onChange={setSearchText}
        value={searchText} 
        onSubmit={() => onSearch(searchText)} />
      <ButtonGroup style={style} className={classNames("mt-auto ml-auto", className)}>
        {isNotEmpty
          ?
          <>
            {isAdmin && <Button aria-label="delete btn" onClick={onDeleteClick} className="d-flex" variant='danger'><TrushIcon /></Button>}
            {excelModal}
          </>
          : null}
        <Button variant="outline-secondary" active={active} onClick={() => setActive(true)} aria-label="table-type-btn">
          <TableIcon />
        </Button>
        <Button variant="outline-secondary" active={!active} onClick={() => setActive(false)} aria-label="card-type-btn">
          <CardIcon />
        </Button>
        {children}
      </ButtonGroup>
    </div>
  )
}

const SortPanel: SortPanelType = ({
  sortOptions,
  size,
  sort,
  onSizeChange,
  onSortChange,
  search
}) => {
  const sizeOptions = [
    { text: "20", value: 20 },
    { text: "40", value: 40 },
    { text: "80", value: 80 },
    { text: "120", value: 120 },
  ]
  return (
    <div className="d-flex p-0 panel child sort ml-auto">
      <Select 
        id="select-sort"
        className="ml-auto mr-0 p-0 select-sort"
        label="Сортировка"
        custom
        value={sort}
        onChange={onSortChange(search, size)}
        options={sortOptions} />
      <Select 
        id="select-size"
        className="mr-0 select-size"
        label="Size page"
        custom
        value={size}
        options={sizeOptions}
        onChange={onSizeChange(search, sort)} />
    </div>
  )
}

const Select = React.memo(SelectInput, (prev, next) => prev.value === next.value && prev.onChange === next.onChange)
const Input = React.memo(InputControl, (prev, next) => 
  prev.value === next.value && prev.type === next.type
  && prev.min === next.min && prev.max === next.max
  && prev.step === next.step);
const TypePanel = React.memo(Panel, (prev, next) => 
  prev.isNotEmpty === next.isNotEmpty && prev.active === next.active 
  && prev.onDeleteClick === next.onDeleteClick && prev.onExcelSave === next.onExcelSave)

export {
  Input,
  Select,
  SortPanel,
  TypePanel
}