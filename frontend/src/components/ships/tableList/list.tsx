import React, { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap'

import Item from './item';

import { Ship } from '../../../types';

import './List.css'

export interface TableListProps {
  ships: Ship[];
  withChecked?: boolean;
  onChecked?: (i: number) => void;
  isChecked?: (i: number) => boolean;
}

const TableList: FunctionComponent<TableListProps> = ({ 
  onChecked = () => {},
  isChecked = () => false, 
  ships,
  withChecked = true,
}) => {

  return  (
    <Table className="table-list">
      <thead>
        <tr>
          {withChecked ? <th>#</th> : null}
          <th>Номер</th>
          <th>Название</th>
          <th>Тип</th>
        </tr>
      </thead>
      <tbody>
        {ships.map((ship) => <Item withChecked={withChecked} key={ship.id} ship={ship} onChecked={onChecked} checked={isChecked(ship.id)} />)}
      </tbody>
    </Table>
  );
}

export default TableList;