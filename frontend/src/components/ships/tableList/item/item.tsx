import React, { FunctionComponent } from 'react';

import { historyPush } from '../../../../actions/util';

import { Ship } from '../../../../types'

import './Item.css'

export interface ItemProps {
  withChecked?: boolean;
  ship: Ship;
  onChecked: (i: number) => void;
  checked: boolean;
}

const Item: FunctionComponent<ItemProps> = ({
  ship, 
  onChecked,
  checked,
  withChecked = true,
}) => {
  const onItemClick = () => {
    historyPush(`/ship/${ship.id}`)
  }
  return(
    <tr className={checked ? 'checked-tr' : ''} onDoubleClick={onItemClick} onClick={() => onChecked(ship.id)}>
      {withChecked ? <td className="check-ship">
        <input type="checkbox" onChange={() => onChecked(ship.id)} checked={checked} />
      </td> : null}
      <td>{ship.id}</td>
      <td>{ship.name}</td>
      <td>{ship.type}</td>
    </tr>
  )
}

export default Item;