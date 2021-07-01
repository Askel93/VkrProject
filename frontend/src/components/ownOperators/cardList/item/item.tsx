import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { useBtnClickDbClick } from '../../../hoc/hoc';
import { OwnOperatorItem } from '../../../types';
import { historyPush } from '../../../../actions/util';

const CardItem: OwnOperatorItem = ({ 
  entity,
  onChecked,
  checked
}) => {
  const onOwnOperatorClick = () => historyPush(`/ownoperator?id=${entity.name}`, entity);
  const clickEvents = useBtnClickDbClick({ onClick: () => onChecked(entity.name), onDoubleClick: onOwnOperatorClick })
  const classNamePrefix = checked ? " checked-item" : "";
  
  return (
    <Card className={"card-item" + classNamePrefix} border="secondary" {...clickEvents}>
      <Card.Header>{entity.name}</Card.Header>
      <ListGroup style={{ minHeight: '120px' }}>
        <ListGroup.Item>{entity.address}</ListGroup.Item>
        {entity.email !== null && <ListGroup.Item>{entity.email}</ListGroup.Item>}
      </ListGroup>
    </Card>
  );
}

export default CardItem;