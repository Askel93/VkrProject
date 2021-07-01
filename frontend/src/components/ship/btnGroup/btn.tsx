import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShip } from '../../../actions/ship'
import { TrushIcon } from '../../util/icon';
import EditModal from '../modal';

import { ShipBtnGroup } from '../../types';
import { jwtAuthSelector } from '../../../selector';

const BtnGroup: ShipBtnGroup = ({
  entity,
  fetchPayload = { page: 1, size: 20, sort: 'id' },
}) => {
  const { isAdmin } = useSelector(jwtAuthSelector);
  const dispatch = useDispatch();
  const onDeleteClick = () => dispatch(deleteShip({ listId: [entity.id], ...fetchPayload! }))

  return (
    <ButtonGroup style={{ float: 'right', height: '40px' }}>
      {isAdmin && <Button aria-label="delete ship" className="d-flex" onClick={onDeleteClick} variant='danger'><TrushIcon /></Button>}
      <EditModal key={`createship${entity.id}modal`} entity={entity} isCreate />
      <EditModal key={`editship${entity.id}modal`} entity={entity} />
    </ButtonGroup>
  )
}

export default React.memo(BtnGroup, (prev, next) => prev.entity === next.entity && prev.fetchPayload === next.fetchPayload);