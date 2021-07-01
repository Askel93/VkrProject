import React, { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { fetchShipsRequest, getCountPage } from '../../actions/ship';
import { historyPush } from '../../actions/util';
import { shipsOfflineSelector } from '../../selector';
import Panel from './panel';
import { PagePanel } from '../util/btn'

import { ShipsType } from '../types';
import { useListId } from '../hoc/hoc';

import Loading from '../util/spinner';
import { ShipSortParam } from '../../types';

const TableList = lazy(() => import('./tableList'));
const CardList = lazy(() => import('./cardList'));

const Ships: ShipsType = ({ page, size, sort = "id", search }) => {

  const { listId, ...other } = useListId();
  let { countPage, ships } = useSelector(shipsOfflineSelector({ page, size, sort: sort as ShipSortParam, search }));
  //true - table, false - card
  const [typeList, setTypeList] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountPage({ size, page, search }));
    // eslint-disable-next-line
  }, [size, search]);

  useEffect(() => {
    dispatch(fetchShipsRequest({ page, size, sort, search }))
    // eslint-disable-next-line
  }, [page, size, sort, search])

  const onPageClick = (i: number) => {
    const url = `/ships/${i}/${size}/${sort}` + search;
    historyPush(url);
  }
  const onSearch = (searchText: string) => {
    let param = search === "" ? "?" : search
    if (searchText.trim() === "") {
      param = param.replace(new RegExp("search=\\D*&?"), "")
    } else {
      if (param.includes("search=")) {
        param = param.replace(new RegExp("search=\\D*&?"), `search=${searchText}`)
      } else {
        param = param + "search=" + searchText;
      }
    }
    const url = `/ships/1/${size}/${sort}` + param;
    historyPush(url);
  }
  return (
    <>
      <Panel
        size={size}
        sort={sort}
        page={page}
        typeList={typeList}
        setTypeList={setTypeList}
        listId={listId}
        onSearch={onSearch}
        search={search}
        onDeleteClick={other.deleteAll} />
      <React.Suspense fallback={<Loading />}>
        {ships.length === 0
          ? <Alert className="list text-center" variant="secondary">Пусто</Alert>
          : typeList
            ? <TableList entities={ships} {...other} />
            : <CardList entities={ships} {...other} />}
      </React.Suspense>
      {countPage <= 1 ? null : <PagePanel count={countPage} page={page} onItemClick={onPageClick} />}
    </>
  );
}

export default React.memo(Ships, (prev, next) => prev.page === next.page && prev.size === next.size && prev.sort === next.sort && prev.search === next.search);