import React, { forwardRef, useState, ForwardedRef, useImperativeHandle, useRef } from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';

import { Input } from '../../util/form';

import toObject from '../../hoc/formDataToObject';

import { doublePattern, ModalItemProps, Dimensions, RefModalItem } from '../../types';

const DimensionsItem = forwardRef(({
  entity,
  disabled,
  onClick = () => { },
  style
}: ModalItemProps<Dimensions>, ref: ForwardedRef<RefModalItem<Dimensions>>) => {
  const [validated, setValidated] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({ saveEntity: editDimensions, isValid }))

  const isValid = () => {
    if (formRef.current === null || !formRef.current.checkValidity()) {
      setValidated(true);
      return false
    }
    return true;
  }
  const editDimensions = () => {
    if (formRef.current !== null) {
      const formData = new FormData(formRef.current)
      const newDimensions = toObject(formData) as Dimensions;
      return newDimensions;
    }
    return entity;
  }

  const { breadth, depth, disp, draught, length, shipClass } = entity;

  const handleBtnClick = (i: number) => isValid() && onClick(i);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleBtnClick(1);
  }

  const doubleProps = { type: disabled ? "" : "number", hasValidation: true, pattern: doublePattern, disabled, feedback: "Please provide a valid value", className: 'm-0' }
  return (
    <Form onSubmit={onSubmit} noValidate validated={validated} style={style} ref={formRef}>
      <Input
        id="breadth"
        name="breadth"
        prepend="Ширина"
        placeholder="Type breadth"
        defaultValue={breadth || ""}
        {...doubleProps}
      />
      <Input
        id="depth"
        name="depth"
        prepend="Высота борта"
        placeholder="Type depth"
        defaultValue={depth || ""}
        {...doubleProps} />
      <Input
        id="draught"
        name="draught"
        prepend="Осадка"
        placeholder="Type draught"
        defaultValue={draught || ""}
        {...doubleProps} />
      <Input
        id="disp"
        name="disp"
        prepend="Водоизмещение"
        placeholder="Type displacement"
        defaultValue={disp || ""}
        {...doubleProps} />
      <Input
        id="length"
        name="length"
        prepend="Длина"
        placeholder="Type ..."
        defaultValue={length || ""}
        {...doubleProps} />
      <Input
        id="shipclass"
        name="shipClass"
        prepend="Класс: "
        placeholder="Type class"
        defaultValue={shipClass || ""}
        className="m-0"
        disabled={disabled} />
      {disabled ? null
        : <ButtonGroup className="float-left mt-2">
          <Button onClick={() => handleBtnClick(-1)} variant="secondary">
            Назад
          </Button>
          <Button type="submit" variant="secondary">
            Дальше
          </Button>
        </ButtonGroup>}
    </Form>
  )
})

export default React.memo(DimensionsItem, (prev, next) => prev.entity === next.entity);