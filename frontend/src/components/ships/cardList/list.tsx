import React from 'react';
import { Row } from 'react-bootstrap';

import { ShipList } from '../../types';
import Item from './item';

const CardList: ShipList = ({
  entities,
  isChecked = () => false,
  onChecked = () => { }
}) => {
  return (
    <Row className="card-list">
      {entities.map((ship) => <Item key={ship.id} entity={ship} checked={isChecked(ship.id)} onChecked={onChecked} />)}
    </Row>
  )
}

export default CardList;