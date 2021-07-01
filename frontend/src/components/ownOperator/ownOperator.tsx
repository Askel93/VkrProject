import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap'

import Loading from '../util/spinner';
import AccordionItem from '../util/accordion';
import OwnOperatorItem from './ownOperatorItem';
import BtnGroup from './btnGroup';

import { fetchOwnOperator } from '../../actions/ownOperator';
import { ownOperatorProfileSelector } from '../../selector';
import { useSearchParam } from '../hoc/hoc';

import { OwnOperatorProfileType, OwnOperator } from '../types';

import './OwnOperator.css'

const isOwnOperator = (obj: any): obj is OwnOperator => {
  return obj !== undefined && obj.name !== undefined && obj.email !== undefined;
}

const ShipTableList = lazy(() => import('../ships/tableList'));

const OwnOperatorProfile: OwnOperatorProfileType = () => {

  const { search, state } = useLocation();

  const [id] = useSearchParam(search, "id")

  let ownOperator: OwnOperator| null = useSelector(ownOperatorProfileSelector(id));

  if (ownOperator === null && isOwnOperator(state)) {
    ownOperator = state;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && (ownOperator === null || !ownOperator.shipsOperator)) dispatch(fetchOwnOperator(id));
    // eslint-disable-next-line
  }, [])

  return ownOperator === null
    ? null
    : (
      <Card className="profile">
        <Card.Header>
          Название: {id}
          <BtnGroup entity={ownOperator} />
        </Card.Header>
        <Card.Body className="read">
          <OwnOperatorItem entity={ownOperator} disabled />
          <Suspense fallback={<Loading isLoad />}>
            {ownOperator.shipsOwn && ownOperator.shipsOwn.length !== 0 &&
              <AccordionItem toggle="Владелец кораблей: ">
                <ShipTableList entities={ownOperator.shipsOwn || []} withChecked={false} />
              </AccordionItem>}
            {ownOperator.shipsOperator && ownOperator.shipsOperator.length !== 0 &&
              <AccordionItem toggle="Оператор кораблей: ">
                <ShipTableList entities={ownOperator.shipsOperator || []} withChecked={false} />
              </AccordionItem>}
          </Suspense>
        </Card.Body>
      </Card>
    )
}

export default OwnOperatorProfile;