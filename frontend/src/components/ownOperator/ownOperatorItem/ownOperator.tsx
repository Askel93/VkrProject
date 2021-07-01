import React, { ForwardedRef, forwardRef, FunctionComponent, useImperativeHandle, useRef, useState } from 'react';
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { Input } from '../../util/form';
import { TrushIcon, CreateIcon } from '../../util/icon';
import AccordionItem from '../../util/accordion';
import toObject from '../../hoc/formDataToObject';
import { fetchOwnOperators } from '../../../services/ownOperatorService'
import { newValuePattern, phonePattern, emailPattern, OwnOperator, OwnOperatorSelectType, OwnOperatorModalProps, RefModalItem } from '../../types';

const OwnOperatorSelect: OwnOperatorSelectType = ({
  id = "selectsearch",
  onSubmit,
}) => {
  const [isLoad, setLoad] = useState(false);

  const [options, setOptions] = useState<OwnOperator[]>([])

  const onSelectChange = (val: OwnOperator[]) => onSubmit(val[0])

  const onSearch = (search: string) => {
    setLoad(true);
    fetchOwnOperators({ search, page: 1, size: 10 })
      .then(res => {
        setOptions(res)
      })
      .catch();
    setLoad(false);
  }

  return (
    <Form.Group>
      <AsyncTypeahead
        id={id}
        delay={1000}
        minLength={3}
        filterBy={() => true}
        labelKey={(option) => option.name}
        onChange={onSelectChange}
        multiple
        isLoading={isLoad}
        options={options}
        onSearch={onSearch}
        renderMenuItemChildren={option => <span key={option.name}>{option.name}</span>} />
    </Form.Group>
  )
}

const OwnOperatorItem = forwardRef(({
  entity,
  disabled,
  onClick = () => { },
  prevEntity = entity,
  isShip,
  style,
  isCreate,
  idPrefix = ""
}: OwnOperatorModalProps, ref: ForwardedRef<RefModalItem<OwnOperator>>) => {
  const [validated, setValidated] = useState(false);
  const [ownOperator, setOwnOperator] = useState(entity);
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({ isValid, saveEntity: editOwnOperator }))

  const addPhonesFax = (key: 'phones' | 'fax') => setOwnOperator(prev => ({
    ...prev,
    [key]: [...prev[key], '']
  }));
  const deletePhonesFax = (key: 'phones' | 'fax') => (index: number) => setOwnOperator(prev => ({
    ...prev,
    [key]: [...prev[key].slice(0, index), ...prev[key].slice(index + 1)]
  }));
  const handleBtnClick = (i: number) => isValid() && onClick(i);

  const editOwnOperator = () => {
    if (formRef.current !== null) {
      const formData = new FormData(formRef.current)
      let newOwnOperator = toObject(formData) as OwnOperator;
      const phones = phonesFaxArr('phone');
      const fax = phonesFaxArr('fax');
      if (!isCreate) newOwnOperator.name = entity.name
      newOwnOperator.phones = phones;
      newOwnOperator.fax = fax;
      return newOwnOperator;
    }
    return entity;
  }
  const isValid = () => {
    if (!formRef.current?.checkValidity()) {
      setValidated(true)
      return false;
    }
    return true;
  }
  const isArray = (obj: any): obj is Array<HTMLInputElement> => obj.length;
  const phonesFaxArr = (key: 'phone' | 'fax') => {
    let phones: string[] = [];
    if (formRef.current !== null) {
      let phoneArr: Array<HTMLInputElement> | HTMLInputElement = formRef.current[key];
      if (!phoneArr) return [];
      if (isArray(phoneArr)) {
        phoneArr.forEach(i => {
          if (i.value !== null) phones.push(i.value);
        })
      } else {
        phones.push(phoneArr.value)
      }
    }
    return phones;
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleBtnClick(1);
  }

  return (
    <Form onSubmit={onSubmit} noValidate validated={validated} style={style} ref={formRef}>
      {isShip &&
        <OwnOperatorSelect onSubmit={(ownOperator) => setOwnOperator(prev => ({ ...prev, ...ownOperator as OwnOperator }))} />
      }
      {!disabled
        && <Input
          id={`${idPrefix}name`}
          prepend="Название"
          name="name"
          placeholder="Type name"
          defaultValue={ownOperator.name}
          pattern={isCreate ? newValuePattern(entity.name) : undefined}
          disabled={!isCreate}
          className="mb-0"
          feedback={isCreate ? "Name of company must be unique" : undefined} />}
      <Input
        id={`${idPrefix}email`}
        prepend="Email: "
        name="email"
        type="email"
        placeholder="Type email"
        pattern={emailPattern}
        defaultValue={ownOperator.email}
        className="mb-0"
        feedback="Please provide a valid email"
        disabled={disabled || isShip} />
      <Input
        id={`${idPrefix}address`}
        defaultValue={ownOperator.address}
        prepend="Адрес: "
        name="address"
        placeholder="Type address"
        disabled={disabled || isShip}
        className="mb-0" />
      <PhonesFax
        key={`${idPrefix}phones`}
        entities={ownOperator.phones}
        type='phone'
        idPrefix={idPrefix}
        addEntity={() => addPhonesFax('phones')}
        deleteEntity={deletePhonesFax('phones')}
        disabled={disabled || isShip} />
      <PhonesFax
        key={`${idPrefix}fax`}
        entities={ownOperator.fax}
        disabled={disabled || isShip}
        type='fax'
        idPrefix={idPrefix}
        addEntity={() => addPhonesFax('fax')}
        deleteEntity={deletePhonesFax('fax')} />
      {!disabled &&
        <ButtonGroup className="float-left mt-2">
          {isShip &&
            <>
              <Button onClick={() => handleBtnClick(-1)} variant="secondary">Назад</Button>
              <Button onClick={() => setOwnOperator(prevEntity)} variant="secondary">Отменить</Button>
            </>}
          <Button type="submit" variant="secondary">{isShip ? "Дальше" : "Сохранить изменения"}</Button>
        </ButtonGroup>}
    </Form>
  )
})

interface PhoneFaxProps {
  entities: string[];
  deleteEntity: (index: number) => void;
  addEntity: () => void;
  type: 'phone' | 'fax';
  disabled?: boolean;
  idPrefix: string;
}

const PhonesFaxItem: FunctionComponent<PhoneFaxProps> = ({
  entities,
  deleteEntity,
  addEntity,
  type,
  disabled,
  idPrefix
}) => {
  const otherProps = { disabled, hasValidation: !disabled, pattern: disabled ? "" : phonePattern, className: "mb-0" }
  const toggle = type === 'phone' ? "Телефоны" : "Факс";
  const togglePostfix = entities.length === 0 ? " Не указаны" : "";
  return (
    <AccordionItem toggle={`${toggle}${togglePostfix}`}>
      <div className="phones-fax">
        {entities.map((value, i) =>
          <Input
            key={`${idPrefix}${type + i}`}
            id={`${idPrefix}${type + i}`}
            defaultValue={value}
            name={type}
            placeholder={`Type ${type}`}
            feedback={`Please provide a valid ${type}`}
            {...otherProps}>
            {!disabled ? <Button onClick={() => deleteEntity(i)} variant="danger"><TrushIcon /></Button> : null}
          </Input>)}
        {!disabled && <Button onClick={addEntity} variant="ligth" className="accordion-btn text-center"><CreateIcon /></Button>}
      </div>
    </AccordionItem>
  )
}

const PhonesFax = React.memo(PhonesFaxItem, (prev, next) => prev.entities === next.entities);

export default React.memo(OwnOperatorItem, (prev, next) => prev.entity === next.entity);