import React, { FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';

import { ModalInput, AccordionItem } from '../../util';

import { OwnOperator } from '../../../types';

import './OwnOperatorItem.css'

export interface OwnOperatorItemProps {
  entity: OwnOperator;
  disabled?: boolean;
  onClick?: (data: OwnOperator) => void;
}

const OwnOperatorItem: FunctionComponent<OwnOperatorItemProps> = ({
  entity,
  disabled = true,
  onClick = (data) => {}
}) => {
  const [ownOperator, setOwnOperator] = useState(entity);

  const handleNameChange = (name: string) => setOwnOperator(prev => ({ ...prev, name }));
  const handleEmailChange = (email: string) => setOwnOperator(prev => ({ ...prev, email }));
  const handleAddressChange = (address: string) => setOwnOperator(prev => ({ ...prev, address }));

  const handlePhonesChange = (index: number, phone: string) => setOwnOperator(prev => ({ 
    ...prev,
    phones: [...prev.phones.slice(0, index), phone, ...prev.phones.slice(index + 1)] 
  }));
  const addPhone = () => setOwnOperator(prev => ({
    ...prev, 
    phones: [...prev.phones, '']
  }));
  const deletePhones = (index: number) => setOwnOperator(prev => ({ 
    ...prev, 
    phones: [...prev.phones.slice(0, index), ...prev.phones.slice(index + 1)] 
  }));

  const handleFaxChange = (index: number, fax: string) => setOwnOperator(prev => ({ 
    ...prev,
    fax: [...prev.fax.slice(0, index), fax, ...prev.fax.slice(index + 1)] 
  }));
  const addFax = () => setOwnOperator(prev => ({
    ...prev,
    fax: [...prev.fax, '']
  }));
  const deleteFax = (index: number) => setOwnOperator(prev => ({ 
    ...prev, 
    fax: [...prev.fax.slice(0, index), ...prev.fax.slice(index + 1)] 
  }));

  return (
    <>
      {!disabled 
      && <ModalInput 
          id="name"
          label="Название"
          placeholder="Type name"
          value={ownOperator.name}
          disabled
          onChange={handleNameChange} />}
      <ModalInput 
        id="email"
        label="Email: "
        placeholder="Type email"
        value={ownOperator.email}
        onChange={handleEmailChange}
        disabled={disabled} />
      <ModalInput 
        id="address"
        value={ownOperator.address}
        label="Адрес: "
        placeholder="Type address"
        disabled={disabled}
        onChange={handleAddressChange} />
      <AccordionItem toggle="Телефон">
        <PhonesFax 
          key="phones"
          entities={ownOperator.phones}
          type='phone'
          onChange={handlePhonesChange}
          addEntity={addPhone}
          deleteEntity={deletePhones}
          disabled={disabled} />
      </AccordionItem>
      <AccordionItem toggle="Факс">
        <PhonesFax 
          key="fax"
          entities={ownOperator.fax}
          disabled={disabled}
          type='fax'
          onChange={handleFaxChange}
          addEntity={addFax}
          deleteEntity={deleteFax} />
      </AccordionItem>
      {!disabled && <Button onClick={() => onClick(ownOperator)} className="save-btn">Сохранить изменения</Button>}
    </>
  )
}

interface PhoneFaxProps {
  entities: string[];
  deleteEntity: (index: number) => void;
  addEntity: () => void;
  onChange: (index: number, value: string) => void;
  type: 'phone' | 'fax';
  disabled?: boolean;
}

const PhonesFax: FunctionComponent<PhoneFaxProps> = ({ 
  entities, 
  deleteEntity,
  addEntity,
  type,
  onChange,
  disabled = true
}) => {
  return (
    <div className="phones-fax">
      {entities.map((value, i) => 
      <ModalInput
        key={`${type + i}`}
        id={`${type + i}`}
        value={value}
        disabled={disabled}
        onChange={(phone) => onChange(i, phone)} 
        placeholder={`Type ${type}`}>
        {!disabled && <Button onClick={() => deleteEntity(i)} variant="danger">Delete</Button>}
      </ModalInput>)}
      {!disabled && <Button onClick={addEntity} variant="ligth" className="add-btn">Add</Button>}
    </div>
  )
}

export default OwnOperatorItem;