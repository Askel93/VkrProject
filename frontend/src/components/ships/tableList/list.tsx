import React from 'react';
import { Table } from 'react-bootstrap'

import { ShipList } from '../../types';
import Item from './item';

const TableList: ShipList = ({
  onChecked = () => { },
  isChecked = () => false,
  entities,
  withChecked = true,
  onAllClick = () => { },
  isAllChecked = () => false
}) => {
  const handleAllClick = () => onAllClick(entities.map(i => i.id));
  const allChecked = () => isAllChecked(entities.map(i => i.id));

  return (
    <div className="list">
      <Table className="table-list m-0">
        <thead>
          <tr>
            {withChecked
              ? <th className="check-ship">
                <input type="checkbox" onChange={handleAllClick} checked={allChecked()} />
              </th>
              : null}
            <th>Номер</th>
            <th>Название</th>
            <th>Тип</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {entities.map((ship) => <Item withChecked={withChecked} key={ship.id} entity={ship} onChecked={onChecked} checked={isChecked(ship.id)} />)}
        </tbody>
      </Table>
    </div>
  );
}

export default TableList;