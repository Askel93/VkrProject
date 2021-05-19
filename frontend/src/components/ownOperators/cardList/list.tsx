import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { OwnOperator } from '../../../types';

import Item from './item';

const CardList: FunctionComponent<{ ownOperators: OwnOperator[] }> = ({ ownOperators }) => {
  return(
    <Row className="card-list">
      {ownOperators.map((ownOperator) => <Item key={ownOperator.name} ownOperator={ownOperator} />)}
    </Row>
  )
}

export default CardList;