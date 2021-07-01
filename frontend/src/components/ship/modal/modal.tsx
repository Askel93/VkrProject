import React, { useState, lazy, useEffect, Suspense, useMemo, useRef } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateShipRequest, saveShipRequest, fetchShipRequest } from '../../../actions/ship'
import { Capacity, defaultCapacity, defaultDimensions, defaultOwnOperator, ShipEngine, Dimensions } from '../../../types';
import { Ship, ShipEditModal, RefModalItem, OwnOperator, defaultShipEngine } from '../../types';
import { WithAuthFunc } from '../../hoc/with';
import { EditIcon, CreateIcon, Loading } from '../../util';
import { shipEditSelector } from '../../../selector';

const ShipEngineItem = lazy(() => import('../shipEngine'));
const ShipItem = lazy(() => import('../ship/ship'));
const DimensionsItem = lazy(() => import('../dimensions'));
const CapacityItem = lazy(() => import('../capacity'));
const OwnOperatorItem = lazy(() => import('../../ownOperator/ownOperatorItem'));

const EditModal: ShipEditModal = ({ entity, isCreate }) => {

  const [show, setShow] = useState(false);

  const editShip = useSelector(shipEditSelector(entity, show));

  const [ship, setShip] = useState(entity);
  const [showNum, setShowNum] = useState(0);
  const shipRef = useRef<RefModalItem<Ship>>(null);
  const capacityRef = useRef<RefModalItem<Capacity>>(null);
  const dimensionsRef = useRef<RefModalItem<Dimensions>>(null);
  const shipEngineRef = useRef<RefModalItem<ShipEngine>>(null);
  const ownRef = useRef<RefModalItem<OwnOperator>>(null);
  const operatorRef = useRef<RefModalItem<OwnOperator>>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show && !editShip.shipCapacity) {
      dispatch(fetchShipRequest(entity.id));
    }
    // eslint-disable-next-line
  }, [show])

  useEffect(() => {
    if (editShip.shipCapacity) {
      setShip(editShip);
    }
    // eslint-disable-next-line
  }, [editShip])

  const onShowNumClick = (i: number) => {
    if (i >= 0) {
      setShowNum(i)
      return
    }
    if (i === 6) {
      if (isCreate) {
        dispatch(saveShipRequest(ship))
      } else {
        dispatch(updateShipRequest(ship));
      }
      handleClose();
    }
  }
  const handleClose = () => {
    setShow(false);
    setShowNum(0);
    setShip(entity);
  }

  const [handleOpen] = WithAuthFunc(() => setShow(true));

  const handleShowNumChange = (i: number) => {
    switch (showNum) {
      case 0:
        if (!dimensionsRef.current?.isValid()) return;
        setShip(prev => ({ ...prev, shipDimensions: dimensionsRef.current?.saveEntity() }))
        onShowNumClick(i);
        break;
      case 1:
        if (!capacityRef.current?.isValid()) break;
        let newCapacity = capacityRef.current.saveEntity();
        setShip(prev => ({ ...prev, shipCapacity: newCapacity }))
        onShowNumClick(i);
        break;
      case 2:
        if (!shipEngineRef.current?.isValid()) break;
        setShip(prev => ({ ...prev, shipEngine: shipEngineRef.current?.saveEntity() }))
        onShowNumClick(i);
        break;
      case 3:
        if (!ownRef.current?.isValid()) break;
        const own = ownRef.current.saveEntity();
        setShip(prev => ({ ...prev, own, ownName: own.name }))
        onShowNumClick(i);
        break;
      case 4:
        if (!operatorRef.current?.isValid()) break;
        const operator = operatorRef.current.saveEntity();
        setShip(prev => ({ ...prev, operator, operatorName: operator.name }))
        onShowNumClick(i);
        break;
      case 5:
        if (!shipRef.current?.isValid()) break;
        let newShip = shipRef.current?.saveEntity();
        setShip(prev => ({ ...prev, ...newShip }))
        onShowNumClick(i);
        break;
      default:
        break;
    }
  }

  const Item = () => {
    switch (showNum) {
      case 0: return <DimensionsItem
        entity={ship.shipDimensions || defaultDimensions}
        onClick={(i) => handleShowNumChange(showNum + i)}
        ref={dimensionsRef} />
      case 1: return (<CapacityItem
        entity={ship.shipCapacity || defaultCapacity}
        onClick={(i) => handleShowNumChange(showNum + i)}
        ref={capacityRef} />)
      case 2: return (<ShipEngineItem
        entity={ship.shipEngine || defaultShipEngine}
        onClick={(i) => handleShowNumChange(showNum + i)}
        ref={shipEngineRef} />)
      case 3: return (<OwnOperatorItem
        onClick={(i) => handleShowNumChange(showNum + i)}
        entity={ship.own || defaultOwnOperator}
        isShip
        idPrefix="own"
        prevEntity={entity.own}
        ref={ownRef} />)
      case 4: return (<OwnOperatorItem
        onClick={(i) => handleShowNumChange(showNum + i)}
        entity={ship.operator || defaultOwnOperator}
        isShip
        idPrefix="operator"
        prevEntity={entity.operator}
        ref={operatorRef} />)
      default: return (<ShipItem
        entity={ship}
        ref={shipRef}
        isCreate={isCreate}
        onClick={(i) => handleShowNumChange(showNum + i)} />)
    }
  }

  const Header = () => (
    <Nav variant="pills" activeKey={showNum} color="secondary">
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(0)} eventKey={0} style={{ height: '40px' }}>Dimensions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(1)} eventKey={1} style={{ height: '40px' }}>Capacity</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(2)} eventKey={2} style={{ height: '40px' }}>Двигатели</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(3)} eventKey={3} style={{ height: '40px' }}>Own</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(4)} eventKey={4} style={{ height: '40px' }}>Operator</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => handleShowNumChange(5)} eventKey={5} style={{ height: '40px' }}>Ship</Nav.Link>
      </Nav.Item>
    </Nav>
  )
  // eslint-disable-next-line
  const headerMemo = useMemo(Header, [showNum]);

  return (
    <>
      <Button
        aria-label={isCreate ? `create ship ${entity.id}` : `edit ship${entity.id}`}
        className="d-flex"
        variant={isCreate ? 'success' : 'secondary'}
        onClick={handleOpen}>
        {isCreate
          ? <CreateIcon />
          : <EditIcon />}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="edit-modal">
        <Modal.Header closeButton>
          {headerMemo}
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<Loading isLoad />}>
            <Item />
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default React.memo(EditModal, (prev, next) => prev.entity === next.entity);