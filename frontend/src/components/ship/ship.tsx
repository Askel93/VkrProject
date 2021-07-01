import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { shipProfileSelector } from '../../selector';
import { fetchShipRequest, historyPush } from '../../actions';
import { useSearchParam } from '../hoc/hoc';

import Loading from '../util/spinner';
import AccordionItem from '../util/accordion';
import ShipItem from './ship/ship';
import ShipEngineItem from './shipEngine';
import DimensionsItem from './dimensions';
import CapacityItem from './capacity';

import { ShipProfileType, Ship } from '../types';
import { useLocation } from 'react-router-dom';

const BtnGroup = lazy(() => import('./btnGroup'));
const OwnOperatorItem = lazy(() => import('../ownOperator/ownOperatorItem'));

const isShip = (obj: any): obj is Ship => {
  return obj !== undefined && obj.id !== undefined && obj.name !== undefined && obj.type !== undefined;
}

const ShipProfile: ShipProfileType = () => {

  const { state, search } = useLocation();

  const id = parseFloat(useSearchParam(search, "id")[0] || "");

  const [activeKey, setActiveKey] = useState("");

  let ship: Ship | null = useSelector(shipProfileSelector(id));

  if (ship === null && isShip(state)) {
    ship = state;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (ship === null || !ship.shipCapacity) dispatch(fetchShipRequest(id));
    // eslint-disable-next-line
  }, [])

  const onOwnOperatorClick = (name: string) => historyPush(`/ownoperator?id=${name}`);

  return (ship === null)
    ? null
    : (
      <Card className="profile">
        <Card.Header>
          Название: {ship.name}
          <Suspense fallback={<Loading isLoad />}>
            <BtnGroup entity={ship} />
          </Suspense>
        </Card.Header>
        <Card.Body className="read">
          <ShipItem entity={ship} disabled />
          <Suspense fallback={<Loading isLoad />}>
            {ship.own &&
              <AccordionItem
                toggle={`Владелец: ${ship.ownName}`}
                onDoubleClick={() => onOwnOperatorClick(ship!.ownName)}
                ariaLabel="own"
                activeKey={activeKey}
                onToggleClick={(key) => setActiveKey(typeof key === 'string' ? key : "")}
                eventKey="own">
                <OwnOperatorItem key="own" idPrefix="operator" entity={ship.own} disabled />
              </AccordionItem>}
            {ship.operator &&
              <AccordionItem
                toggle={`Оператор: ${ship.operatorName}`}
                onDoubleClick={() => onOwnOperatorClick(ship!.operatorName)}
                ariaLabel="operator"
                activeKey={activeKey}
                onToggleClick={(key) => setActiveKey(typeof key === 'string' ? key : "")}
                eventKey="operator">
                <OwnOperatorItem key="operator" idPrefix="own" entity={ship.operator} disabled />
              </AccordionItem>}
          </Suspense>
          {ship.shipCapacity && ship.shipDimensions && ship.shipEngine &&
            <AccordionItem
              toggle="Подробнее"
              ariaLabel="other"
              activeKey={activeKey}
              onToggleClick={(key) => setActiveKey(key || "")}
              eventKey="other">
              <CapacityItem entity={ship.shipCapacity} disabled />
              <DimensionsItem entity={ship.shipDimensions} disabled />
              <ShipEngineItem entity={ship.shipEngine} disabled />
            </AccordionItem>}
        </Card.Body>
      </Card>
    )
}

export default ShipProfile;