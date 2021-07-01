import React from 'react';
import { useDispatch } from 'react-redux';

import FilterPanel from './filterPanel'

import { TypePanel, SortPanel } from '../../util/form';
import { WithAuthFunc, useSort, useSearchParam } from '../../hoc';
import { deleteShips, saveToExcelRequest } from '../../../actions';

import { ShipPanel } from '../../types';

const Panel: ShipPanel = ({
  size,
  sort = 'id',
  listId,
  typeList,
  setTypeList,
  onSearch,
  page,
  onDeleteClick,
  search
}) => {

  const [initSearch] = useSearchParam(search, "search");

  const dispatch = useDispatch();

  const [onExcelSave] = WithAuthFunc((fileName) => { dispatch(saveToExcelRequest({ listId, fileName })); onDeleteClick() })
  const [onSizeChange, onSortChange] = useSort({});

  const sortOptions = [{ text: "По id", value: "id" }, { text: "По названию", value: "name" }, { text: "По типу", value: "type" }]

  const handleDelete = () => {
    dispatch(deleteShips({ listId, size, sort, page }));
    onDeleteClick();
  }

  return (
    <div className="panel">
      <TypePanel
        active={typeList}
        setActive={setTypeList}
        isNotEmpty={listId.length !== 0}
        onExcelSave={onExcelSave}
        onDeleteClick={handleDelete}
        searchText={initSearch}
        onSearch={onSearch}>
        <FilterPanel search={search} />
      </TypePanel>
      <SortPanel
        size={size}
        sort={sort}
        search={search}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        onSizeChange={onSizeChange} />
    </div>
  );
}

export default Panel;