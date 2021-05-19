import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap'

import OwnOperatorItem from './ownOperatorItem';
import EditModal from './modal';
import { fetchOwnOperator } from '../../actions/ownOperator';
import { ownOperatorSelector } from '../../selector';
import { Loading, AccordionItem } from '../util';
import ShipTableList from '../ships/tableList';

export interface OwnOperatorProfileProps {
  name: string;
}

const OwnOperatorProfile: FunctionComponent<OwnOperatorProfileProps> = ({ name }) => {

  let { ownOperator, loading } = useSelector(ownOperatorSelector);
  // const ships = [
    // { id: 2, name: "second", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
    // { id: 1, name: "first", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
    // { id: 3, name: "third", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
    // { id: 4, name: "third", type: "qwerty", imo: 12, project: "qwr", port: "SPb", speed: 12, godP: 2019, ownName: "name", operatorName: "name" },
  // ]
  // ownOperator = { name: 'OwnOperator', address: 'address', email: 'email', phones: ['12141413', '12141'], fax: ['12142'], shipsOwn: ships }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnOperator(name));
  }, [name])

  return loading || ownOperator === null 
  ? <Loading />
  : (
    <Card className="profile">
      <Card.Header>
        Название: {ownOperator.name}
        <EditModal entity={ownOperator} />
      </Card.Header>
      <Card.Body className="read">
        <OwnOperatorItem entity={ownOperator} />
        <AccordionItem toggle="Владелец кораблей: ">
          <ShipTableList ships={ownOperator.shipsOwn || []} withChecked={false} />
        </AccordionItem>
        <AccordionItem toggle="Оператор кораблей: ">
          <ShipTableList ships={ownOperator.shipsOperator || []} withChecked={false} />
        </AccordionItem>
      </Card.Body>
    </Card>
  )
}

export default OwnOperatorProfile;