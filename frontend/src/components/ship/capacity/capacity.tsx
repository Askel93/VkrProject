import React, { forwardRef, useState, ForwardedRef, useRef, useImperativeHandle } from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';

import { Input } from '../../util';
import toObject from '../../hoc/formDataToObject';
import { intPattern, ModalItemProps, Capacity, RefModalItem } from '../../types';

const CapacityItem = forwardRef(({
  entity, 
  disabled,
  onClick = () => {},
  style
}: ModalItemProps<Capacity>, ref: ForwardedRef<RefModalItem<Capacity>>) => {

  const [validated, setValidated] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({ saveEntity: editCapacity, isValid }))
  const isValid = () => {
    if (formRef.current === null || !formRef.current.checkValidity()) {
      setValidated(true);
      return false
    }
    return true;
  }
  const editCapacity = () => {
    if (formRef.current !== null) {
      const formData = new FormData(formRef.current)
      return toObject(formData) as Capacity;
    }
    return entity;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    handleBtnClick(1);
  }
  const handleBtnClick = (i: number) => isValid() && onClick(i);
  
  const intProps = { type: disabled ? "" : "number", pattern: intPattern, hasValidation: true, step: 1, disabled, feedback: "Please provide a valid value", className: 'm-0' };

  return (
    <Form onSubmit={onSubmit} noValidate validated={validated} style={style} ref={formRef}>
      <Input
        id="dedv"
        name="dedv"
        prepend="Дедвейт"
        defaultValue={entity.dedv || ""}
        {...intProps}
        placeholder="Type deadweight"  />
      <Input
        id="passk"
        name="passK"
        placeholder="Type passenger capacity"
        prepend="Количество кают"
        {...intProps}
        defaultValue={entity.passK || ""} />
      <Input
        id="passp"
        name="passP"
        placeholder="Type number of cabins"
        prepend="Пассажировместимость"
        defaultValue={entity.passP || ""}
        {...intProps} />
      <Input
        id="nettonnage"
        name="nt"
        prepend="Чистая вместимость"
        placeholder="Type net tonnage"
        defaultValue={entity.nt || ""}
        {...intProps} />
      <Input
        id="grosstonnage"
        name="gt"
        prepend="Валовая вместимость"
        placeholder="Type gross tonnage"
        defaultValue={entity.gt || ""}
        {...intProps} />
      {!disabled && <ButtonGroup className="float-left mt-2">
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

export default React.memo(CapacityItem, (prev, next) => prev.entity === next.entity);