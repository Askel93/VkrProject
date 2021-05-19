import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ownOperatorSelector } from '../../selector';

import { FetchPayload } from '../../types';
import TableList from './tabelList';
import CardList from './cardList';
import Panel from './panel';
import { Loading, PagePanel } from '../util';
import { fetchOwnOperators, getCountPageOwn, historyPush } from '../../actions';

const OwnOperatorList: FunctionComponent<FetchPayload> = ({ page, size, sort }) => {

  //true - table, false - card
  const [typeList, setTypeList] = useState(true);

  const { loading, ownOperators, count } = useSelector(ownOperatorSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountPageOwn(size));
  }, [size])

  useEffect(() => {
    dispatch(fetchOwnOperators({ size, sort, page }))
  }, [page, size, sort]);

  const onItemClick = (page: number) => {
    historyPush(`/ownoperator/${page}/${size}/${sort}`);
  }

  return (
    <>
      <Panel
        size={size}
        sort={sort || 'name'}
        setTypeList={setTypeList}
        typeList={typeList} />
      {loading 
      ? <Loading /> 
      : ownOperators 
        ? typeList 
          ? <TableList ownOperators={ownOperators}/>
          : <CardList ownOperators={ownOperators} />
        : null}
      {count <= 1 ? null : <PagePanel count={count} page={page} onItemClick={onItemClick} />}
    </>
  );
}

export default OwnOperatorList;