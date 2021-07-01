import React from 'react';
import { useDispatch } from 'react-redux';

import { TypePanel, SortPanel } from '../../util/form';
import { WithAuthFunc, useSort, useSearchParam } from '../../hoc';
import { OwnOperatorPanel } from '../../types';
import { deleteOwnOperators, saveToExcelByOwn } from '../../../actions';

const Panel: OwnOperatorPanel = ({
  size,
  sort = 'name',
  typeList,
  setTypeList,
  listId,
  onSearch,
  page,
  onDeleteClick,
  search
}) => {

  const [initSearch] = useSearchParam(search, "search");

  const sortOptions = [{ text: "По названию", value: "name" }, { text: "По адресу", value: "address" }, { text: "По email", value: "email" }]

  const dispatch = useDispatch();

  const [onSizeChange, onSortChange] = useSort({ type: 'ownoperators' });

  const handleDelete = () => {
    dispatch(deleteOwnOperators({ listId, page, size, sort }))
    onDeleteClick();
  }

  const handleExcelSave = (fileName: string) => {
    dispatch(saveToExcelByOwn({ listId, fileName }));
    onDeleteClick()
  }
  
  const [onExcelSave] = WithAuthFunc(handleExcelSave);

  return (
    <div className="panel">
      <TypePanel
        active={typeList}
        setActive={setTypeList}
        isNotEmpty={listId.length !== 0}
        onExcelSave={onExcelSave}
        onDeleteClick={handleDelete}
        onSearch={onSearch}
        searchText={initSearch} />
      <SortPanel 
        size={size}
        sort={sort}
        search={search}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        onSizeChange={onSizeChange} />
    </div>
  )
}

export default Panel;