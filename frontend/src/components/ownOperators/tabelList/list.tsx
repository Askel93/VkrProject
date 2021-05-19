import React, { FunctionComponent} from 'react';
import { Table } from 'react-bootstrap';

import Item from './item';

import { OwnOperator } from '../../../types';

const TableList: FunctionComponent<{ ownOperators: OwnOperator[]}> = ({ ownOperators }) => {
  return(
    <Table className="table-list">
      <thead>
        <tr>
          <th>Название</th>
          <th>Адрес</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {ownOperators.map((ownOperator) => <Item key={ownOperator.name} ownOperator={ownOperator} />)}
      </tbody>
    </Table>
  )
}

export default TableList;