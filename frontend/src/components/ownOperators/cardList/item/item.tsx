import React, { FunctionComponent } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { historyPush } from '../../../../actions/util';
import { OwnOperator } from '../../../../types';

const CardItem: FunctionComponent<{ ownOperator: OwnOperator }> = ({ ownOperator }) => {
  
  const onCardClick = (name: string) => {
    historyPush(`/ownoperator/${name}`);
  }
  
  return (
    <Card className="card-item" border="secondary" onClick={() => onCardClick(ownOperator.name)}>
      <Card.Header>{ownOperator.name}</Card.Header>
      <ListGroup>
        <ListGroup.Item>{ownOperator.address}</ListGroup.Item>
        <ListGroup.Item>{ownOperator.email}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default CardItem;