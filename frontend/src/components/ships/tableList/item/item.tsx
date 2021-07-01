import React, { lazy, memo, Suspense } from 'react';

import { useBtnClickDbClick } from '../../../hoc/hoc';

import { historyPush } from '../../../../actions/util';

import { ShipItem } from '../../../types';

const BtnGroup = lazy(() => import('../../../ship/btnGroup'));

const Item: ShipItem = ({ entity, onChecked, checked, withChecked = true }) => {

  const onShipClick = () => historyPush(`/ship?id=${entity.id}`, entity)
  const clickEvents = useBtnClickDbClick({ onClick: () => onChecked(entity.id), onDoubleClick: onShipClick })

  return (
    <tr className={checked ? 'checked-item' : ''}>
      {withChecked &&
      <td onClick={clickEvents.onClick}>
          <input type="checkbox" id={`checkbox${entity.id}`} alt={`checkbox${entity.id}`} onChange={() => onChecked(entity.id)} checked={checked} />
      </td>}
      <td {...clickEvents}>{entity.id}</td>
      <td {...clickEvents}>{entity.name}</td>
      <td {...clickEvents}>{entity.type}</td>
      <td width="150px">
        <Suspense fallback={"..."}>
          <BtnGroup key={`btnship${entity.id}`} entity={entity} />
        </Suspense>
      </td>
    </tr>
  )
}

export default memo(Item, (prev, next) => prev.entity === next.entity && prev.checked === next.checked);