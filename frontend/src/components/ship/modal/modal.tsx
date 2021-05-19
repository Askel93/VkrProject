import React, { FunctionComponent, lazy, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { updateShipRequest } from '../../../actions/ship'
import { Ship, defaultCapacity, defaultDimensions } from '../../../types';

// import CapacityItem from '../capacity/capacity';
// import DimensionsItem from '../dimensions';
import ShipItem from '../ship/ship';

const CapacityItem = lazy(() => import('../capacity'))
const DimensionsItem = lazy(() => import('../dimensions'));

export interface EditModalProps extends Ship {
}

const EditModal: FunctionComponent<EditModalProps> = (props) => {
  const [show, setShow] = useState(false);

  let { shipCapacity = defaultCapacity, shipDimensions = defaultDimensions } = props;
  const [ship, setShip] = useState<Ship>(props);
  const [capacity, setCapacity] = useState(shipCapacity);
  const [dimensions, setDimensions] = useState(shipDimensions);
  const [showNum, setShowNum] = useState(0);

  const isFirst = showNum === 0;
  const isFinish = showNum === 2;

  const dispatch = useDispatch();
  
  const onShowNumClick = (i: number) => {
    if ((!isFirst || i===1) && (!isFinish || i === -1)) {
      setShowNum(showNum + i);
      return;
    }
    if (isFinish) {
      let newShip = ship;
      newShip.shipCapacity = capacity;
      newShip.shipDimensions = dimensions;
      dispatch(updateShipRequest(newShip));
      handleClose();
    }
  }
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setCapacity(shipCapacity);
    setDimensions(shipDimensions);
    setShip(props);
    setShowNum(0);
    setShow(false);
  }

  return (
    <>
      <Button onClick={handleOpen}>Редактировать</Button>
      <Modal show={show} onHide={handleClose} className="edit-modal">
        <Modal.Header closeButton>Редактирование</Modal.Header>
        <Modal.Body>
          {showNum === 0 
          ? <DimensionsItem 
              entity={dimensions} 
              disabled={false} 
              onClick={(newDimensions) => setDimensions(newDimensions)}
              onSaving={(i) => onShowNumClick(i)} />
          : showNum === 1 
            ? <CapacityItem
                entity={capacity} 
                disabled={false}
                onSaving={(i) => onShowNumClick(i)}
                onClick={(newCapacity) => setCapacity(newCapacity)} />
            : <ShipItem 
                entity={props}
                disabled={false}
                onSaving={(i) => onShowNumClick(i)}
                onClick={(ship) => setShip(ship)} />
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal;