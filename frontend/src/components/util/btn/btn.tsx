import React from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { Select } from '../form';
import { NextIcon, PrevIcon } from '../icon';
import { PagePanelType } from '../../types';

import './Btn.css'

const PagePanel: PagePanelType = ({ count, page, onItemClick }) => {
  const arrPages = Array.from({ length: count }, (v, i) => i + 1);
  let firstArr: number[] = [];
  let secondArr: number[] = [];
  let thirdArr: number[] = [];
  arrPages.forEach(i => {
    switch (true) {
      case count <= 7:
      case i <= 3:
      case page < 6 && i <= page + 2:
        firstArr.push(i)
        break;
      case page >= 6 && page < count - 4 && i >= page - 2 && i <= page + 2:
        secondArr.push(i);
        break;
      case i >= count - 2:
      case page >= count - 4 && i >= page - 2:
        thirdArr.push(i)
    }
  })

  const onPageClick = (i: string | number) => {
    onItemClick(parseFloat(i.toString()));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <ButtonToolbar className="pb-2 pt-1 page-panel" aria-label="Toolbar with Button groups">
        <Select
          value={page}
          id="page-select"
          className="page-panel-select m-1 ml-2"
          custom
          key="page-panel-select"
          onChange={onPageClick} options={[...firstArr, ...secondArr, ...thirdArr].map(i => ({ text: i.toString(), value: i }))} />
        <ButtonGroup className="m-1 ml-2 page-panel-btn" aria-label="First group">
          {firstArr.map(i =>
            <Button variant="secondary" key={`page${i}`} active={page === i} onClick={() => onPageClick(i)}>{i}</Button>
          )}
        </ButtonGroup>
        <ButtonGroup className="m-1 page-panel-btn">
          {secondArr.map(i =>
            <Button variant="secondary" key={`page${i}`} active={page === i} onClick={() => onPageClick(i)}>{i}</Button>
          )}
        </ButtonGroup>
        <ButtonGroup className="m-1 page-panel-btn">
          {thirdArr.map(i =>
            <Button variant="secondary" key={`page${i}`} active={page === i} onClick={() => onPageClick(i)}>{i}</Button>
          )}
        </ButtonGroup>
        <ButtonGroup className="m-1 ml-auto">
          {page > 1 && <Button variant="secondary" onClick={() => onPageClick(page - 1)}><span className="page">Предыдущая</span><PrevIcon /></Button>}
          {page < count && <Button variant="secondary" onClick={() => onPageClick(page + 1)}><span className="page">Следующая</span><NextIcon /></Button>}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  )
}

const Panel = React.memo(PagePanel, (prev, next) => prev.count === next.count && prev.page === next.page)

export default Panel;