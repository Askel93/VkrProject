import React from 'react';
import { Table } from 'react-bootstrap';

import { OwnOperatorList } from '../../types';

import Item from './item';

const TableList: OwnOperatorList = ({
  entities,
  onChecked = () => { },
  isChecked = () => false,
  onAllClick = () => { },
  isAllChecked = () => false
}) => {
  const handleAllClick = () => onAllClick(entities.map(i => i.name));
  const allChecked = () => isAllChecked(entities.map(i => i.name));
  return (
    <div className="list">
      <Table className="table-list m-0">
        <thead>
          <tr>
            <th className="check-ship">
              <input type="checkbox" onChange={handleAllClick} checked={allChecked()} />
            </th>
            <th>Название</th>
            <th>Адрес</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entities.map((ownOperator) => <Item key={ownOperator.name} entity={ownOperator} checked={isChecked(ownOperator.name)} onChecked={onChecked} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default TableList;