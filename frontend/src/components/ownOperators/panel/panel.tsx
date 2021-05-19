import React, { FunctionComponent } from 'react';

import { historyPush } from '../../../actions/util';
import { TypePanel, SortPanel } from '../../util';

export interface PanelProps {
  size: number;
  sort?: string;
  typeList: boolean;
  setTypeList: (type: boolean) => void;
}

const Panel: FunctionComponent<PanelProps> = ({ size, sort = "name", typeList, setTypeList }) => {

  const sortOptions = [ { text: "По названию", value: "name" }, { text: "По адресу", value: "address" }, { text: "По email", value: "email" } ]

  const onSizeChange = (size: string) => {
    historyPush(`/ownoperator/1/${size}/${sort}`);
  }

  const onSortChange = (sort: string) => {
    historyPush(`/ownoperator/1/${size}/${sort}`);
  }

  return (
    <>
      <SortPanel size={size} sort={sort} sortOptions={sortOptions} onSizeChange={onSizeChange} onSortChange={onSortChange} />
      <TypePanel active={typeList} setActive={setTypeList} style={{margin: '20px', float: 'right'}} />
    </>
  )
}

export default Panel;