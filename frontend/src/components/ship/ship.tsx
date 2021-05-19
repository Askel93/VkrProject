import React, { FunctionComponent, useEffect, lazy } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { shipSelector } from '../../selector';
import { fetchShipRequest, historyPush } from '../../actions';

import { Loading, AccordionItem } from '../util';
import ShipItem from './ship/ship';
import OwnOperatorItem from '../ownOperator/ownOperatorItem';

import { Capacity, OwnOperator, defaultDimensions, defaultCapacity } from '../../types';

const DimensionsItem = lazy(() => import('./dimensions'));
const CapacityItem = lazy(() => import('./capacity'));
const EditModal = lazy(() => import('./modal'));

export interface ShipProps {
  id: number;
}

const ShipProfile: FunctionComponent<ShipProps> = ({ id }) => {

  let { ship, loading } = useSelector(shipSelector);

  // const own: OwnOperator = { name: "own", address: "address", email: "qwn@mail.ru", phones: ["120968594", "12116435"], fax: ["120968594", "12116435"]}
  // const operator: OwnOperator = { name: "own", address: "address", email: "qwn@mail.ru", phones: ["120968594", "12116435"], fax: ["120968594", "12116435"]}
  // const shipCapacity: Capacity = {dedv: 124, nt: 1241, passP: 1214, passK: 128753, gt: 12141}
  // ship = { id: 1, name: "first", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "own", operatorName: "name", own, operator, shipCapacity };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShipRequest(id));
  }, [id])

  const onOwnOperatorClick = (name: string) => {
    historyPush(`/ownoperator/${name}`);
  }

  return ship === null || loading 
  ? <Loading />
  : (
    <Card className="profile">
      <Card.Header>
        Название: {ship.name}
        <EditModal {...ship} />
      </Card.Header>
      <Card.Body className="read">
        <ShipItem entity={ship} />
        {ship.own
        ? <AccordionItem toggle={`Владелец: ${ship.ownName}`} onDoubleClick={() => onOwnOperatorClick(ship?.ownName || '')}>
            <OwnOperatorItem entity={ship.own} />
          </AccordionItem>
        : null}
        {ship.operator
        ? <AccordionItem toggle={`Оператор: ${ship.operatorName}`} onDoubleClick={() => onOwnOperatorClick(ship?.operatorName || '')}>
            <OwnOperatorItem entity={ship.operator} />
          </AccordionItem>
        : null}
        <AccordionItem toggle="Подробнее">
          <>
            <CapacityItem entity={ship.shipCapacity || defaultCapacity} />
            <DimensionsItem entity={ship.shipDimensions || defaultDimensions} />
          </>
        </AccordionItem>
      </Card.Body>
    </Card>
  )
}

export default ShipProfile;