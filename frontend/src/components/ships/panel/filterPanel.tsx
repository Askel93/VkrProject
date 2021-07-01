import React, { forwardRef, FunctionComponent, useEffect, useState, CSSProperties, FormEvent, ForwardedRef, useImperativeHandle, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Badge, ButtonGroup, Form } from 'react-bootstrap';
import Range from 'rc-slider/lib/Range';
import { Typeahead } from 'react-bootstrap-typeahead';
import { OffCanvas, OffCanvasMenu } from 'react-offcanvas';

import { Input, FilterIcon, AccordionItem, Loading, SelectedFilters } from '../../util';
import { filterSelector } from '../../../selector';
import getFilters from '../../../services/filterService';

import { Filters, MinFilterKey, MaxFilterKey } from '../../../types';

import 'rc-slider/assets/index.css';
import './FilterPanel.css'
import { useSearchParam } from '../../hoc';
import { historyPush } from '../../../actions';

const FilterStyle: CSSProperties = {
  border: '1px solid rgba(0,0,0,.125)',
  padding: '10px'
}

const AccordionToggle = ({ toggle, isChanged, isFilterBtn }: { toggle: React.ReactNode, isChanged: boolean, isFilterBtn?: boolean }) => (
  <>
    {toggle}
    {isChanged && <Badge style={{ float: 'right', padding: isFilterBtn ? '0' : '', marginRight: '-10px' }} variant={isFilterBtn ? "outline-primary" : "secondary"}><SelectedFilters /></Badge>}
  </>
)

interface SearchSelectProps {
  initFilters: Filters;
  toggle: string;
  search: string;
  filterKey: 'ps' | 'ts'
}

const SelectWithSearch = forwardRef(({ 
  initFilters,
  toggle,
  search,
  filterKey
}: SearchSelectProps, ref: ForwardedRef<RangeRef>) => {
  const initState = new URLSearchParams(search).getAll(filterKey);
  const [selected, setSelected] = useState(initState)
  const options = initFilters[filterKey].filter(i => !selected.includes(i));

  useImperativeHandle(ref, () => ({ onSubmit }))
  const onSubmit = () => selected.map(i => [filterKey, i]);

  return (
    <AccordionItem ariaLabel="Type ship" toggle={<AccordionToggle toggle={toggle} isChanged={selected.length !== 0} />}>
      <div style={FilterStyle}>
        <Typeahead
          filterBy={(option) => options.includes(option)}
          id="basic-typeahead-multiple"
          options={options}
          clearButton
          multiple
          onChange={setSelected}
          placeholder="Choose type ship..."
          selected={selected} />
      </div>
    </AccordionItem>
  )
})
interface RangeInputProps {
  initFilters: Filters;
  toggle: string;
  step?: number;
  minKey: MinFilterKey;
  maxKey: MaxFilterKey;
  search: string;
}
interface RangeRef {
  onSubmit: () => string[][]
}

const RangeInput =  forwardRef(({
  initFilters,
  toggle,
  step = 1,
  maxKey,
  minKey,
  search
}: RangeInputProps, ref: ForwardedRef<RangeRef>) => {
  const initValue = { min: initFilters[minKey], max: initFilters[maxKey] }
  const [min, max] = useSearchParam(search, minKey, maxKey);
  let initState = initValue;
  if (min && max) initState = { min: parseFloat(min), max: parseFloat(max) }

  const [filter, setFilter] = useState(initState);
  useImperativeHandle(ref, () => ({ onSubmit }))
  const onSubmit = () => {
    if (filter.min === initValue.min && filter.max === initValue.max) return [];
    return [[minKey, filter.min.toString()], [maxKey, filter.max.toString()]];
  }
  const isInvalid = filter.min < initValue.min || filter.max > initValue.max;

  return (
    <>
      <AccordionItem
        toggle={<AccordionToggle toggle={toggle} isChanged={(initValue.min !== filter.min || initValue.max !== filter.max)} />}
        className={isInvalid ? "invalid" : ""}>
        <div style={FilterStyle}>
          <div style={{ display: 'flex' }}>
            <Input
              value={filter.min}
              key="minvalue"
              onChange={(val) => setFilter(prev => ({ ...prev, min: parseFloat(val) }))}
              type="number"
              label="Мин."
              min={initValue.min}
              isInvalid={filter.min < initValue.min}
              max={filter.max - step}
              style={{ width: '45%', margin: '0' }}
              feedback={`Мин. значение - ${initValue.min}`}
              step={step} />
            <Input
              value={filter.max}
              key="maxvalue"
              type="number"
              label="Макс."
              onChange={(val) => setFilter(prev => ({ ...prev, max: parseFloat(val) }))}
              min={filter.min + step}
              max={initValue.max}
              feedback={`Макс. значение - ${initValue.max}`}
              style={{ width: '45%', marginLeft: '10%', marginRight: '0' }}
              step={step} />
          </div>
          <Range
            min={initValue.min}
            max={initValue.max}
            step={step}
            value={[filter.min, filter.max]}
            onChange={(val) => setFilter({ min: val[0], max: val[1] })} />
        </div>
      </AccordionItem>
    </>
  )
})

/* eslint-disable */
const FilterPanel: FunctionComponent<{ search: string }> = ({ search }) => {

  const initFilters = useSelector(filterSelector);

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const speedRef = useRef<RangeRef>(null);
  const godPRef = useRef<RangeRef>(null);
  const dedvRef = useRef<RangeRef>(null);
  const passKRef = useRef<RangeRef>(null);
  const passPRef = useRef<RangeRef>(null);
  const ntRef = useRef<RangeRef>(null);
  const gtRef = useRef<RangeRef>(null);
  const dispRef = useRef<RangeRef>(null);
  const lengthRef = useRef<RangeRef>(null);
  const breadthRef = useRef<RangeRef>(null);
  const depthRef = useRef<RangeRef>(null);
  const draughtRef = useRef<RangeRef>(null);
  const typeRef = useRef<RangeRef>(null);
  const portRef = useRef<RangeRef>(null);
  const pwrRef = useRef<RangeRef>(null);

  useEffect(() => {
    if (initFilters === null && show) getFilters().then(res => dispatch({ type: "INIT_FILTERS", payload: res }));
  }, [show])

  const onCancel = () => {}

  const onSaveFilters = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true);
      return;
    }
    e.preventDefault()
    let params: string[][] = [];
    [speedRef, godPRef, dedvRef, passKRef, passPRef, ntRef, gtRef, portRef, typeRef,
      dispRef, lengthRef, breadthRef, depthRef, draughtRef].forEach(i => params.push(...i.current?.onSubmit() || []))
    
    const url = '/ships/1/20/id?' + new URLSearchParams(params).toString();
    historyPush(url);

    setShow(false);
  }
  const isChanged = false;
  
  return (
    <>
      {show && <div style={{ position: 'fixed', top: '0', left: '400px', right: '0', bottom: '0' }} onMouseDown={() => setShow(false)} />}
      <OffCanvas
        width={400}
        transitionDuration={300}
        effect="overlay"
        isMenuOpened={show}
        position={"left"}>
        <Button name="filterShipBtn" aria-label="filters ship" onClick={() => setShow(prev => !prev)}>
          <AccordionToggle toggle={<FilterIcon />} isChanged={isChanged} isFilterBtn />
        </Button>
        <OffCanvasMenu className="offcanvas-menu">
          {initFilters !== null && show
            ? (
              <Form className="filters-panel" onSubmit={onSaveFilters} noValidate validated={validated}>
                <Button
                  type="button"
                  variant="link"
                  className="close offcanvas-close-btn"
                  aria-label="Close"
                  onClick={() => setShow(false)}>
                  <span aria-hidden="true">&times;</span>
                </Button>
                <RangeInput
                  key="speedFilter"
                  ref={speedRef}
                  search={search}
                  minKey='ns'
                  maxKey='xs'
                  initFilters={initFilters}
                  toggle="Скорость" />
                <RangeInput
                  key="godPFilter"
                  ref={godPRef}
                  search={search}
                  minKey='ng'
                  maxKey='xg'
                  initFilters={initFilters}
                  toggle="Год постройки" />
                <SelectWithSearch
                  key="typeFilter"
                  toggle="Тип судна"
                  filterKey='ts'
                  search={search}
                  ref={typeRef}
                  initFilters={initFilters} />
                <SelectWithSearch
                  key="portFilter"
                  toggle="Порт"
                  filterKey='ps'
                  ref={portRef}
                  search={search}
                  initFilters={initFilters} />
                <RangeInput
                  key="dedvFilter"
                  minKey='nd'
                  maxKey='xd'
                  ref={dedvRef}
                  search={search}
                  initFilters={initFilters}
                  toggle="Дедвейт" />
                <RangeInput
                  key="passKFilter"
                  search={search}
                  minKey='npk'
                  maxKey='xpk'
                  ref={passKRef}
                  initFilters={initFilters}
                  toggle="Кол. кают" />
                <RangeInput
                  key="passPFilter"
                  search={search}
                  minKey='npp'
                  maxKey='xpp'
                  ref={passPRef}
                  initFilters={initFilters}
                  toggle="Пассажировместимость" />
                <RangeInput
                  key="ntFilter"
                  search={search}
                  minKey='nnt'
                  maxKey='xnt'
                  ref={ntRef}
                  initFilters={initFilters}
                  toggle="Чистая вместимость" />
                <RangeInput
                  key="gtFilter"
                  search={search}
                  minKey='ngt'
                  maxKey='xgt'
                  ref={gtRef}
                  initFilters={initFilters}
                  toggle="Валовая вместимость" />
                <RangeInput
                  key="dispFilter"
                  search={search}
                  minKey='ndp'
                  maxKey='xdp'
                  ref={dispRef}
                  initFilters={initFilters}
                  toggle="Водоизмещение" />
                <RangeInput
                  key="lengthFilter"
                  search={search}
                  minKey='nl'
                  maxKey='xl'
                  ref={lengthRef}
                  initFilters={initFilters}
                  step={0.01}
                  toggle="Длина" />
                <RangeInput
                  key="breadthFilter"
                  search={search}
                  minKey='nb'
                  maxKey='xb'
                  ref={breadthRef}
                  initFilters={initFilters}
                  step={0.01}
                  toggle="Ширина" />
                <RangeInput
                  key="depthFilter"
                  search={search}
                  minKey='ndh'
                  maxKey='xdh'
                  ref={depthRef}
                  initFilters={initFilters}
                  step={0.01}
                  toggle="Высота борта" />
                <RangeInput
                  key="draughtFilter"
                  search={search}
                  minKey='ndt'
                  maxKey='xdt'
                  ref={draughtRef}
                  initFilters={initFilters}
                  step={0.01}
                  toggle="Осадка" />
                <RangeInput
                  key="powerFilter"
                  search={search}
                  minKey='npwr'
                  maxKey='xpwr'
                  ref={pwrRef}
                  initFilters={initFilters}
                  toggle="Суммарная мощность" />
                <ButtonGroup className="offcanvas-btn-group">
                  <Button variant="outline-primary" onClick={onCancel}>Отменить</Button>
                  <Button type="submit">Применить</Button>
                </ButtonGroup>
              </Form>)
            : <Loading isLoad />}
        </OffCanvasMenu>
      </OffCanvas>
    </>
  )
}

export default FilterPanel;