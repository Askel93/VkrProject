import React, { useState, FunctionComponent } from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateOwnOperator } from '../../../actions/ownOperator';

import { OwnOperator } from '../../../types';

import OwnOperatorItem from '../ownOperatorItem';

import './Modal.css';

export interface EditModalProps {
  entity: OwnOperator;
}

const EditModal: FunctionComponent<EditModalProps> = ({ entity }) => {
  
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const onSaving = (data: OwnOperator) => {
    dispatch(updateOwnOperator(data));
    handleClose();
  }

  return (
    <>
      <Button onClick={handleOpen}>Редактировать</Button>
      <Modal show={show} onHide={handleClose} className="edit-modal">
        <Modal.Header closeButton>Редактирование</Modal.Header>
        <Modal.Body>
          <OwnOperatorItem 
            entity={entity}
            onClick={onSaving}
            disabled={false} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal;