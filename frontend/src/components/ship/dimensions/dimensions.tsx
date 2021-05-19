import React, { FunctionComponent, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { ModalInput } from '../../util';

import { Dimensions } from '../../../types';
import { ModalItem } from '../types';

export interface DimensionsItemProps {
  dimensions: Dimensions;
  disabled?: boolean;
  onClick?: (dimensions: Dimensions) => void
}

const DimensionsItem: FunctionComponent<ModalItem<Dimensions>> = ({
  entity,
  disabled = true,
  onClick = () => {},
  onSaving = () => {}
}) => {
  const [breadth, setBreadth] = useState<number | null>(entity.breadth);
  const [depth, setDepth] = useState<number | null>(entity.depth);
  const [disp, setDisp] = useState<number | null>(entity.disp);
  const [draught, setDraught] = useState<number | null>(entity.draught);
  const [length, setLength] = useState<number | null>(entity.length);
  const [shipClass, setShipClass] = useState<string | null>(entity.shipClass);

  const handleBtnClick = (i: number) => {
    const dimensions: Dimensions = { breadth, depth, disp, draught, length, shipClass };
    onClick(dimensions);
    onSaving(i);
  }

  return (
    <>
      <ModalInput 
        id="breadth"
        label="Ширина"
        placeholder="Type breadth"
        value={breadth || ""}
        onChange={(i) => setBreadth(parseFloat(i))}
        disabled={disabled}
      />
      <ModalInput 
        id="depth"
        label=""
        placeholder="Type ..."
        value={depth || ""}
        onChange={(i) => setDepth(parseFloat(i))}
        disabled={disabled} />
      <ModalInput 
        id="draught"
        label=""
        placeholder="Type ..."
        value={draught || ""}
        onChange={(i) => setDraught(parseFloat(i))}
        disabled={disabled} />
      <ModalInput 
        id="disp"
        label=""
        placeholder="Type ..."
        value={disp || ""}
        onChange={(i) => setDisp(parseFloat(i))}
        disabled={disabled} />
      <ModalInput 
        id="length"
        label=""
        placeholder="Type ..."
        value={length || ""}
        onChange={(i) => setLength(parseFloat(i))}
        disabled={disabled} />
      <ModalInput 
        id="shipclass"
        label="Класс: "
        placeholder="Type class"
        value={shipClass || ""}
        onChange={setShipClass}
        disabled={disabled} />  
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

export default DimensionsItem;