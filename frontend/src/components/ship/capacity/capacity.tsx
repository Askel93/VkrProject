import React, { FunctionComponent, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { ModalInput } from '../../util';
import { Capacity } from '../../../types';
import { ModalItem } from '../types';

const CapacityItem: FunctionComponent<ModalItem<Capacity>> = ({
  entity, 
  disabled = true,
  onClick = () => {},
  onSaving = () => {}
}) => {
  const [capacity, setCapacity] = useState(entity);

  const handleDedvChange = (val: string) => setCapacity(prev => ({...prev, dedv: parseFloat(val)}));
  const handlePassKChange = (val: string) => setCapacity(prev => ({...prev, passK: parseFloat(val)}));
  const handlePassPChange = (val: string) => setCapacity(prev => ({...prev, passP: parseFloat(val)}));
  const handleNtChange = (val: string) => setCapacity(prev => ({...prev, nt: parseFloat(val)}));
  const handleGtChange = (val: string) => setCapacity(prev => ({...prev, gt: parseFloat(val)}));

  const handleBtnClick = (i: number) => {
    onSaving(i);
    onClick(capacity);
  }
  
  return (
    <>
      <ModalInput 
        id="dedv"
        label="Дедвейт"
        value={capacity.dedv || ""}
        onChange={(i) => handleDedvChange(i)}
        placeholder="Type deadweight"
        disabled={disabled}  />
      <ModalInput 
        id="passk"
        placeholder="Type ..."
        value={capacity.passK || ""}
        onChange={(i) => handlePassKChange(i)}
        disabled={disabled}
      />
      <ModalInput 
        id="passp"
        placeholder="Type ..."
        value={capacity.passP || ""}
        onChange={(i) => handlePassPChange(i)}
        disabled={disabled}
      />
      <ModalInput 
        id="nettonnage"
        label="Чистая вместимость"
        placeholder="Type net tonnage"
        value={capacity.nt || ""}
        onChange={(i) => handleNtChange(i)}
        disabled={disabled}
      />
      <ModalInput 
        id="grosstonnage"
        label="Валовая вместимость"
        placeholder="Type gross tonnage"
        value={capacity.gt || ""}
        onChange={(i) => handleGtChange(i)}
        disabled={disabled}
      />
      {disabled ? null
      : <ButtonGroup>
        <Button onClick={() => handleBtnClick(-1)}>
          Назад
        </Button>
        <Button onClick={() => handleBtnClick(1)}>
          Дальше
        </Button>
      </ButtonGroup>}
    </>
  )
}

export default CapacityItem;