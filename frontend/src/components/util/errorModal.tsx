import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { errorSelector } from '../../selector';

const ErrorModal = () => {
  const err = useSelector(errorSelector);

  const [show, setShow] = useState(err !== null);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Ошибка</Modal.Header>
        <Modal.Body>
          {err}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} color="secondary">
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ErrorModal;