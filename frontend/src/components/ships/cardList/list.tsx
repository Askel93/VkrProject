import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';

import Item from '../cardItem';
import { Ship } from '../../../types';

import './List.css'

export interface CardListProps {
  ships: Ship[];
}


const CardList: FunctionComponent<CardListProps> = ({ ships }) => {
  return (
    <Row className="card-list">
      {ships.map((ship) => <Item key={ship.id} ship={ship} />)}
    </Row>
  )
}

export default CardList;