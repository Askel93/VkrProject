import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCountPage, historyPush, fetchShipsRequest } from '../../actions';
import { shipSelector} from '../../selector';

import TableList from './tableList';
import CardList from './cardList';
import Panel from './sortpanel';
import { FetchPayload } from '../../types';
import { Loading, PagePanel } from '../util';

const Ships: FunctionComponent<FetchPayload> = ({page, size, sort = "id"}) => {

  let { count, ships, loading } = useSelector(shipSelector);

  const [shipList, setShipList] = useState<number[]>([]);

  //true - table, false - card
  const [typeList, setTypeList] = useState(true);

  const dispatch = useDispatch();
  
  const onChecked = (i: number) => {
    if (isChecked(i)) {
      const id = shipList.indexOf(i);
      const newShipList = [...shipList.slice(0, id), ...shipList.slice(id + 1)]
      setShipList(newShipList);
      return;
    }
    setShipList([...shipList, i])
  }

  const isChecked = (i: number) => {
    return shipList.includes(i);
  }

  useEffect(() => {
    dispatch(getCountPage(size));
  }, [size]);

  useEffect(() => {
    dispatch(fetchShipsRequest({page, size, sort}))
  }, [page, size, sort])

  const onItemClick = (i: number) => {
    historyPush(`/ship/${i}/${size}/${sort}`);
  }

  return (
    <>
      <Panel
        size={size}
        sort={sort}
        page={page}
        typeList={typeList}
        setTypeList={setTypeList}
        shipList={shipList} />
      {loading
      ? <Loading />
      : typeList 
        ? <TableList
            ships={ships}
            onChecked={onChecked}
            isChecked={isChecked} />
        : <CardList
            ships={ships} />}
      {count <= 1 ? null : <PagePanel count={count} page={page} onItemClick={onItemClick} />}
    </>
  );
}

export default Ships;