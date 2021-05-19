import React, { FunctionComponent } from 'react';

import { historyPush } from '../../../../actions/util'
import { OwnOperator } from '../../../../types';

const TableItem: FunctionComponent<{ ownOperator: OwnOperator }> = ({ ownOperator }) => {

  const onItemClick = () => {
    historyPush(`/ownoperator/${ownOperator.name}`)
  }
  return (
    <tr onDoubleClick={onItemClick}>
      <td>{ownOperator.name}</td>
      <td>{ownOperator.address}</td>
      <td>{ownOperator.email}</td>
    </tr>
  )
}

export default TableItem;