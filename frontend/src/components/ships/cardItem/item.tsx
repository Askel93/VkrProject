import React, { FunctionComponent } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { historyPush } from '../../../actions';

import { Ship } from '../../../types';

import './Item.css'

export interface ItemProps {
  ship: Ship;
}

const Item: FunctionComponent<ItemProps> = ({ ship }) => {

  const onCardClick = (id: number) => {
    historyPush(`/ship/${id}`)
  }
  
  return (
    <Card className="card-item" border="secondary" onClick={() => onCardClick(ship.id)}>
      <Card.Header>{ship.name}</Card.Header>
      <ListGroup>
        <ListGroup.Item>{ship.id}</ListGroup.Item>
        <ListGroup.Item>{ship.type}</ListGroup.Item>
        <ListGroup.Item>{ship.port}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Item;