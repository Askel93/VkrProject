import React, { useState, lazy, Suspense, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { updateOwnOperator, saveOwnOperator } from '../../../actions/ownOperator';

import { OwnOperator, OwnOperatorEditModal, RefModalItem } from '../../types';
import { WithAuthFunc } from '../../hoc/with';
import { EditIcon, CreateIcon, Loading } from '../../util';

import './Modal.css';

const OwnOperatorItem = lazy(() => import('../ownOperatorItem'));

const EditModal: OwnOperatorEditModal = ({ entity, isCreate }) => {

  const [show, setShow] = useState(false);
  const ownOperatorRef = useRef<RefModalItem<OwnOperator>>(null);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const [handleOpen] = WithAuthFunc(() => setShow(true));

  const onSaving = () => {
    if (!ownOperatorRef.current?.isValid()) return;
    const data = ownOperatorRef.current.saveEntity();
    if (isCreate) {
      dispatch(saveOwnOperator(data));
    } else {
      dispatch(updateOwnOperator(data));
    }
    handleClose();
  }

  return (
    <>
      <Button 
        aria-label={isCreate ? `create ownoperator${entity.name}` : `edit ownoperator${entity.name}`}
        onClick={handleOpen}
        className="d-flex"
        variant={isCreate ? "success" :"secondary"}>
        {isCreate ? <CreateIcon /> : <EditIcon />}
      </Button>
      <Modal 
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="edit-modal">
        <Modal.Header closeButton>{isCreate ? "Добавление" : "Редактирование"}</Modal.Header>
        <Modal.Body>
          <Suspense fallback={<Loading />}>
          <OwnOperatorItem
            isCreate={isCreate}
            entity={entity}
            ref={ownOperatorRef}
            onClick={onSaving} />
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default React.memo(EditModal, (prev, next) => prev.entity === next.entity);