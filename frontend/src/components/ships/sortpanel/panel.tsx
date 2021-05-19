import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { TypePanel, SortPanel } from '../../util';
import { deleteShips, historyPush, noAuthRequest, saveToExcelRequest } from '../../../actions';
import { jwtSelector } from '../../../selector'

export interface PanelProps {
  size: number;
  sort: string;
  page: number;
  shipList: number[];
  typeList: boolean;
  setTypeList: (type: boolean) => void;
}

const Panel: FunctionComponent<PanelProps> = ({
  size, 
  sort,
  page,
  shipList,
  typeList,
  setTypeList,
}) => {

  const { isAuth, isAdmin } = useSelector(jwtSelector);

  const dispatch = useDispatch();
  
  const sortOptions = [
    { text: "По id", value: "id" },
    { text: "По названию", value: "name" },
    { text: "По типу", value: "type" },
  ]

  const onSizeChange = (size: string) => {
    historyPush(`/ship/1/${size}/${sort}`);
  }

  const onSortChange = (sort: string) => {
    historyPush(`/ship/1/${size}/${sort}`);
  }

  const onExcelSave = () => {
    if (!isAuth) {
      noAuthRequest();
      return;
    }
    dispatch(saveToExcelRequest({ listId: shipList }))
  }

  const onDeleteClick = () => {
    dispatch(deleteShips({ listId: shipList, size, sort, page }));
  }
  
  return (
    <>
      <SortPanel onSizeChange={onSizeChange} onSortChange={onSortChange} size={size} sort={sort} sortOptions={sortOptions} />
      <TypePanel active={typeList} setActive={setTypeList} style={{margin: '20px', float: 'right'}}>
        {shipList.length !== 0 && isAdmin && <Button onClick={onDeleteClick} variant='danger'>Удалить</Button>}
        {shipList.length !== 0 && <Button onClick={onExcelSave}>Сохранить в excel</Button>}
      </TypePanel>
    </>
  );
}

export default Panel;