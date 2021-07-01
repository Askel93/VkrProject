import React, { ForwardedRef, forwardRef, useState, useImperativeHandle, useRef } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import { intPattern, Engine, ModalItemProps, ShipEngine, RefModalItem, EngineModalItemProps } from '../../types';
import { Input } from '../../util/form';
import { TrushIcon } from '../../util/icon'
import AccordionItem from '../../util/accordion';

const ShipEngineItem = forwardRef(({
  entity,
  disabled,
  onClick = () => { },
}: ModalItemProps<ShipEngine>, ref: ForwardedRef<RefModalItem<ShipEngine>>) => {
  const [validated, setValidated] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const engine1Ref = useRef<HTMLDivElement>(null);
  const engine2Ref = useRef<HTMLDivElement>(null);
  const engine3Ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({ saveEntity: editShipEngine, isValid }))

  const isValid = () => {
    if (formRef.current === null || !formRef.current.checkValidity()) {
      setValidated(true);
      return false
    }
    return true;
  }
  const editShipEngine = () => {
    if (formRef.current !== null) {
      let newShipEngine: ShipEngine = { sumPwr: 0, engines: [] };
      if (engine1Ref.current !== null) {
        const engine1: Engine = {
          count: parseFloat(formRef.current['count'].value),
          dvig: formRef.current['dvig'].value,
          pwr: parseFloat(formRef.current['pwr'].value)
        }
        newShipEngine.engines = [...newShipEngine.engines, engine1];
      }
      if (engine2Ref.current !== null) {
        const engine2: Engine = {
          count: parseFloat(formRef.current['count'].value),
          dvig: formRef.current['dvig'].value,
          pwr: parseFloat(formRef.current['pwr'].value)
        }
        newShipEngine.engines = [...newShipEngine.engines, engine2];
      }
      if (engine3Ref.current !== null) {
        const engine3: Engine = {
          count: parseFloat(formRef.current['count'].value),
          dvig: formRef.current['dvig'].value,
          pwr: parseFloat(formRef.current['pwr'].value)
        }
        newShipEngine.engines = [...newShipEngine.engines, engine3];
      }
      let newSumPwr = 0;
      newShipEngine.engines.forEach(engine => newSumPwr += engine.count * engine.pwr)
      newShipEngine.sumPwr = newSumPwr;
      return newShipEngine;
    }
    return entity;
  }

  const handleBtnClick = (i: number) => isValid() && onClick(i);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleBtnClick(1);
  }

  return (
    <Form onSubmit={onSubmit} noValidate validated={validated} ref={formRef}>
      <EngineItem
        numberDvig={0}
        entity={entity.engines[0]}
        ref={engine1Ref}
        disabled={disabled} />
      <EngineItem
        numberDvig={1}
        entity={entity.engines[1]}
        ref={engine2Ref}
        disabled={disabled} />
      <EngineItem
        numberDvig={2}
        entity={entity.engines[2]}
        ref={engine3Ref}
        disabled={disabled} />
      {disabled && <Input value={entity.sumPwr} disabled className="mb-0" prepend="Мощность" />}
      {!disabled && <ButtonGroup className="float-left mt-2">
          <Button onClick={() => handleBtnClick(-1)} variant="secondary">Назад</Button>
          <Button type="submit" variant="secondary">Дальше</Button>
      </ButtonGroup>}
    </Form>
  )
})

const EngineItem = forwardRef(({
  entity,
  numberDvig,
  disabled,
}: EngineModalItemProps, ref: ForwardedRef<HTMLDivElement>) => {

  const [isAdded, setIsAdded] = useState<boolean>(entity !== undefined)

  const stringProps = { hasValidation: true, disabled, required: true, feedback: 'Please provide a valid value', className: 'm-0' }
  const intProps = { ...stringProps, pattern: intPattern }
  const Toggle = () => (<>{numberDvig + 1} двигатель {!disabled && <Button className="ml-auto " onClick={() => setIsAdded(false)} variant="danger"><TrushIcon /></Button>}</>)

  return !isAdded
    ? (
      disabled ? null : <Button onClick={() => setIsAdded(true)} variant="link" style={{ width: '100%' }} className="accordion-btn text-center">Добавить</Button>
    )
    : (
      <AccordionItem toggleClassName="d-flex" eventKey={`engine${numberDvig}`} toggle={<Toggle />}>
        <Form.Group ref={ref}>
          <Input
            {...intProps}
            id={`count${numberDvig}`}
            name="count"
            prepend="Количество"
            defaultValue={entity !== undefined ? entity.count : 0} />
          <Input
            {...intProps}
            prepend="Мощность"
            id={`pwr${numberDvig}`}
            name="pwr"
            defaultValue={entity !== undefined ? entity.pwr : 0} />
          <Input
            {...stringProps}
            prepend="Название"
            id={`dvig${numberDvig}`}
            name="dvig"
            defaultValue={entity !== undefined ? entity.dvig : ""} />
        </Form.Group>
      </AccordionItem>
    )
})

export default ShipEngineItem;