import { useState } from 'react'

import { historyPush } from '../../actions/util';

interface useListIdRes<T> {
  listId: T[];
  deleteAll: () => void;
  onChecked: (i: T) => void;
  isChecked: (id: T) => boolean;
  onAllClick: (ids: T[]) => void
  isAllChecked: (ids: T[]) => boolean;
}

function useListId<T = number>(initState: T[] = []): useListIdRes<T> {
  const [listId, setListId] = useState<T[]>(initState);

  const onAllClick = (ids: T[]) => {
    ids.forEach(i => {
      if (isChecked(i)) return;
      setListId(prev => [...prev, i]);
    });
  }
  
  const onChecked = (i: T) => isChecked(i) ? deleteId(i) : setListId(prev => [...prev, i]);
  const deleteAll = () => setListId([]);

  const deleteId = (i: T) => {
    setListId(prev => [...prev.slice(0, prev.findIndex(id => id === i)), ...prev.slice(prev.findIndex(id => id === i) + 1)]);
  }

  const isChecked = (i: T) => listId.includes(i);
  const isAllChecked = (ids: T[]) => {
    let checked = true;
    ids.forEach(i => {
      if (!listId.includes(i)) {
        checked = false;
      }
    })
    return checked;
  }
  return { listId, deleteAll, onChecked, isChecked, onAllClick, isAllChecked }
}

export interface useBtnClickDbClickProps {
  onClick: () => void;
  onDoubleClick: () => void
}

const useBtnClickDbClick = ({ onClick, onDoubleClick }: useBtnClickDbClickProps): useBtnClickDbClickProps => {
  let timer: NodeJS.Timeout;
  let prevent = false;
  const handleClick = () => {
    timer = setTimeout(() => {
      if (!prevent) {
        onClick();
      }
      prevent = false;
    }, 50)
  }
  const handleDoubleClick = () => {
    clearTimeout(timer);
    prevent = true;
    onDoubleClick();
  }

  return { onClick: handleClick, onDoubleClick: handleDoubleClick };
}

export interface UseSortProps {
  type?: 'ships' | 'ownoperators';
}

function useSort({ type = 'ships' }: UseSortProps): 
  [(search: string, sort: string) => (size: string) => void, 
    (search: string, size: number) =>  (sort: string) => void] {

  const onSortChange = (search: string, size: number) => (sort: string) => {
    const url = `/${type}/1/${size}/${sort}` + search;
    historyPush(url)
  }
  const onSizeChange = (search: string, sort: string) => (size: string) => {
    const url = `/${type}/1/${size}/${sort}` + search;
    historyPush(url);
  }
  return [onSizeChange, onSortChange]
}

function useSearchParam(search: string = "", ...keys: string[]) {
  const searchParams = new URLSearchParams(search);
  let params: (string | undefined)[] = []
  keys.forEach(i => {
    const param = searchParams.get(i) || undefined;
    params.push(param);
  })
  return params;
}

export {
  useListId,
  useSort,
  useBtnClickDbClick,
  useSearchParam,
}