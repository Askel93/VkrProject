import React from 'react';
import { Row } from 'react-bootstrap';

import { OwnOperatorList } from '../../types';

import Item from './item';

const CardList: OwnOperatorList = ({
  entities,
  isChecked = () => false,
  onChecked = () => { },
}) => {
  return (
    <Row className="card-list">
      {entities.map((ownOperator) => <Item key={ownOperator.name} entity={ownOperator} checked={isChecked(ownOperator.name)} onChecked={onChecked} />)}
    </Row>
  )
}

export default CardList;