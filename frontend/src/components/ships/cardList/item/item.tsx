import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { useBtnClickDbClick } from '../../../hoc/hoc';
import { historyPush } from '../../../../actions/util';
import { ShipItem } from '../../../types';

const Item: ShipItem = ({
  entity,
  onChecked,
  checked
}) => {
  const onShipClick = () => historyPush(`/ship?id=${entity.id}`, entity);
  const clickEvents = useBtnClickDbClick({ onClick: () => onChecked(entity.id), onDoubleClick: onShipClick });
  const classNamePrefix = checked ? " checked-item" : "";

  const { id, type, port, name } = entity;

  return (
    <Card className={"card-item" + classNamePrefix} border="secondary" {...clickEvents}>
      <Card.Header style={{ height: '50px'}}>{name}</Card.Header>
      <ListGroup style={{ height: '150px' }}>
        <ListGroup.Item>{id}</ListGroup.Item>
        {type !== "" && <ListGroup.Item>{type}</ListGroup.Item>}
        <ListGroup.Item>{port}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default React.memo(Item, (prev, next) => prev.entity === next.entity && prev.checked === next.checked);