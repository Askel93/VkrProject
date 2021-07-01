import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { deleteOwnOperators } from '../../../actions/ownOperator';
import { TrushIcon } from '../../util/icon'
import EditModal from '../modal';
import { jwtAuthSelector } from '../../../selector';
import { OwnOperatorBtnGroup } from '../../types';

const BtnGroup: OwnOperatorBtnGroup = ({
  entity,
  fetchPayload = { page: 1, size: 20, sort: 'name' },
}) => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(jwtAuthSelector);
  const onDeleteClick = () => dispatch(deleteOwnOperators({ listId: [entity.name], ...fetchPayload }))
  return (
    <ButtonGroup style={{ float: 'right', height: '40px' }}>
      {isAdmin && <Button onClick={onDeleteClick} name={`delete${entity.name}btn`} variant='danger' className="d-flex"><TrushIcon /></Button>}
      <EditModal entity={entity} isCreate key={`creteownmodal${entity.name}`} />
      <EditModal entity={entity} key={`editownmodal${entity.name}`} />
    </ButtonGroup>
  )
}

export default React.memo(BtnGroup, (prev, next) => prev.entity === next.entity && prev.fetchPayload === next.fetchPayload);