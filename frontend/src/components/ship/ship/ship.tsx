import React, { FunctionComponent, useState } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap';

import { ModalInput } from '../../util';

import { Ship } from '../../../types'
import { ModalItem } from '../types'

const ShipItem: FunctionComponent<ModalItem<Ship>> = ({
  entity,
  disabled = true,
  onClick = () => {},
  onSaving = () => {}
}) => {
  const [ship, setShip] = useState(entity);
  
  const handleNameChange = (name: string) => setShip(prev => ({ ...prev, name }));
  const handleTypeChange = (type: string) => setShip(prev => ({ ...prev, type }));
  const handleSubTypeChange = (subType: string) => setShip(prev => ({ ...prev, subType }));
  const handlePortChange = (port: string) => setShip(prev => ({ ...prev, port }));
  const handleProjectChange = (project: string) => setShip(prev => ({ ...prev, project }));
  const handleSpeedChange = (speed: string) => setShip(prev => ({ ...prev, speed: parseFloat(speed) }));
  const handleGodPChange = (godP: string) => setShip(prev => ({ ...prev, godP: parseFloat(godP) }));
  const handleImoChange = (imo: string) => setShip(prev => ({ ...prev, imo: parseFloat(imo) }));

  const handleBtnClick = (i: number) => {
    onClick(ship);
    onSaving(i);
  }

  return (
    <>
      <ModalInput label="Региональный номер: " id="regnum" value={entity.id} disabled={true} />
      {!disabled && <ModalInput label="Название: " id="name" value={ship.name} placeholder="Type name ship" disabled={false} onChange={handleNameChange} />}
      <ModalInput label="Тип корабля: " id="type" value={ship.type} placeholder="Type type ship" disabled={disabled} onChange={handleTypeChange} />
      <ModalInput label="Подтип корабля: " id="subtype" value={ship.subType} placeholder="Type subtype ship" disabled={disabled} onChange={handleSubTypeChange} />
      <ModalInput label="Порт: " id="port" value={ship.port} placeholder="Type port ship" disabled={disabled} onChange={handlePortChange} />
      <ModalInput label="Проект: " id="project" value={ship.project} placeholder="Type project ship" disabled={disabled} onChange={handleProjectChange} />
      <ModalInput label="Скорость: " id="speed" value={ship.speed} placeholder="Type speed ship" disabled={disabled} onChange={handleSpeedChange} />
      <ModalInput label="Год постройки: " id="godp" value={ship.godP} placeholder="Type year of construction ship" disabled={disabled} onChange={handleGodPChange} />
      <ModalInput label="IMO: " id="imo" value={ship.imo} placeholder="Type imo ship" disabled={disabled} onChange={handleImoChange} />
      {disabled ? null
      : <ButtonGroup>
        <Button onClick={() => handleBtnClick(-1)}>
          Назад
        </Button>
        <Button onClick={() => handleBtnClick(1)}>
          Сохранить
        </Button>
      </ButtonGroup>}
    </>
  )
}

export default ShipItem;