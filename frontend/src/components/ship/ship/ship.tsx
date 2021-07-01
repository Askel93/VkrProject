import React, { useRef, useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react'
import { ButtonGroup, Button, Form } from 'react-bootstrap';

import { Input } from '../../util/form';
import toObject from '../../hoc/formDataToObject';

import { doublePattern, intPattern, newValuePattern, ModalItemProps, Ship, RefModalItem } from '../../types';

const ShipItem = forwardRef(({
  entity,
  disabled,
  isCreate,
  onClick = () => { },
  style,
}: ModalItemProps<Ship>, ref: ForwardedRef<RefModalItem<Ship>>) => {
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({ saveEntity: editShip, isValid }))

  const handleBtnClick = (i: number) => isValid() && onClick(i)
  const isValid = () => {
    if (formRef.current === null || !formRef.current.checkValidity()) {
      setValidated(true);
      return false
    }
    return true;
  }
  const editShip = () => {
    if (formRef.current !== null) {
      const formData = new FormData(formRef.current)
      const newShip = toObject(formData) as Ship;
      if (!isCreate) {
        newShip.id = entity.id;
      }
      return newShip;
    }
    return entity;
  }

  const initDefaultValue = (val?: string | number) => val || (disabled && 'Не указано') || '';
  const stringProps = { disabled, className: 'm-0' }
  const doubleProps = { ...stringProps, type: disabled ? "" : "number", hasValidation: true, pattern: doublePattern, feedback: "Please provide a valid value" }
  const intProps = { ...doubleProps, pattern: intPattern, step: 1, max: new Date().getFullYear() }
  return (
    <Form onSubmit={() => handleBtnClick(1)} noValidate validated={validated} style={style} ref={formRef}>
      <Input
        prepend="Региональный номер: "
        id="regnum"
        name="id"
        defaultValue={entity.id}
        {...stringProps}
        required={isCreate}
        pattern={!isCreate ? intPattern : newValuePattern(entity.id)}
        feedback={isCreate ? "Registration number must be unique" : undefined}
        disabled={!isCreate}
      />
      {!disabled &&
        <Input
          prepend="Название: "
          id="name"
          name="name"
          defaultValue={entity.name}
          {...stringProps}
          required={isCreate}
          pattern={isCreate ? newValuePattern(entity.name) : undefined}
          feedback={isCreate ? "Name of the ship must be unique" : undefined}
          placeholder="Type name ship"
        />}
      <Input
        prepend="Тип судна: "
        id="type"
        name="type"
        defaultValue={initDefaultValue(entity.type)}
        placeholder="Enter the ship type"
        {...stringProps}
      />
      <Input
        prepend="Подтип судна: "
        id="subtype"
        name="subType"
        defaultValue={initDefaultValue(entity.subType)}
        placeholder="Enter the ship subtype"
        {...stringProps}
      />
      <Input
        prepend="Позывной: "
        id="callsign"
        name="callSign"
        defaultValue={initDefaultValue(entity.callSign)}
        placeholder="Enter the ship callsign"
        {...stringProps}
      />
      <Input
        prepend="Порт: "
        id="port"
        name="port"
        defaultValue={initDefaultValue(entity.port)}
        placeholder="Type port ship"
        {...stringProps}
      />
      <Input
        prepend="Проект: "
        id="project"
        name="project"
        defaultValue={entity.project}
        placeholder="Type project ship"
        {...stringProps}
      // onChange={handleProjectChange}
      />
      <Input
        prepend="Скорость: "
        id="speed"
        name="speed"
        defaultValue={entity.speed}
        placeholder="Type speed ship"
        {...doubleProps} />
      <Input
        prepend="Год постройки: "
        id="godp"
        name="godP"
        defaultValue={entity.godP}
        placeholder="Type year of construction ship"
        {...intProps} />
      <Input
        prepend="IMO: "
        id="imo"
        name="imo"
        defaultValue={entity.imo}
        placeholder="Type imo ship"
        {...stringProps}
      />
      {!disabled &&
        <ButtonGroup className="float-left mt-2">
          <Button onClick={() => handleBtnClick(-1)} variant="secondary">Назад</Button>
          <Button type="submit" variant="secondary">Сохранить</Button>
        </ButtonGroup>}
    </Form>
  )
});

export default React.memo(ShipItem, (prev, next) => prev.entity === next.entity);