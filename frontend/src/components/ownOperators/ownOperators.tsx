import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { ownOperatorSelector } from '../../selector';

import { OwnOperatorsType, errorType } from '../types';
import { fetchOwnOperators, getCountPageOwn } from '../../actions/ownOperator';
import { historyPush } from '../../actions/util';
import { useListId } from '../hoc/hoc';
import Panel from './panel';
import { PagePanel } from '../util/btn'
import Loading from '../util/spinner';

const TableList = lazy(() => import('./tabelList'));
const CardList = lazy(() => import('./cardList'));

const OwnOperators: OwnOperatorsType = ({ page, size, sort, search }) => {

  const { listId, ...other } = useListId<string>();
  let { ownOperators, count, fetchPayload, error } = useSelector(ownOperatorSelector);
  //true - table, false - card
  const [typeList, setTypeList] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchPayload 
      && page === fetchPayload.page 
      && size === fetchPayload.size 
      && search === fetchPayload.search
      && count !== 0) return;
    dispatch(getCountPageOwn({ size, page, search, sort }));
    // eslint-disable-next-line
  }, [size, search])

  useEffect(() => {
    if (fetchPayload
      && page === fetchPayload.page
      && size === fetchPayload.size
      && search === fetchPayload.search
      && sort === fetchPayload.sort) return;
    dispatch(fetchOwnOperators({ size, sort, page, search}))
    // eslint-disable-next-line
  }, [page, size, sort, search]);

  const onPageClick = (page: number) => {
    const url = `/ownoperators/${page}/${size}/${sort}` + search;
    historyPush(url);
  }

  const onSearch = (searchText: string) => {
    const urlPrefix = searchText.trim() !== "" ? `?search=${searchText}` : ""
    const url = `/ownoperators/1/${size}/${sort}` + urlPrefix;
    historyPush(url);
  }

  return (
    <>
      <Panel
        size={size}
        sort={sort}
        page={page}
        setTypeList={setTypeList}
        listId={listId}
        typeList={typeList}
        onSearch={onSearch}
        search={search!}
        onDeleteClick={other.deleteAll} />
      <React.Suspense fallback={<Loading isLoad />}>
        {ownOperators.length === 0
          ? <Alert className="list text-center" variant="secondary">{error?.includes(errorType.FAILED_FETCH) ? "Отсутствует соединение с сервером" : "Пусто"}</Alert>
          : typeList
            ? <TableList entities={ownOperators} {...other} />
            : <CardList entities={ownOperators} {...other} />}
      </React.Suspense>
      {count <= 1 ? null : <PagePanel count={count} page={page} onItemClick={onPageClick} />}
    </>
  );
}

export default React.memo(OwnOperators, (prev, next) => prev.page === next.page && prev.size === next.size && prev.sort === next.sort && prev.search === next.search);