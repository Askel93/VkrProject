import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { saveToDbRequest } from '../../actions/excel';

const Excel = () => {
  const [show, setShow] = useState(false)
  
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const saveToDb = () => {
    let formData = new FormData();
    if (file === null) {
      return;
    }
    formData.append("file", file, file.name)
    dispatch(saveToDbRequest(formData));
    handleClose();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let fileList = e.target.files;
    if (fileList === null) {
      return;
    }
    let file = fileList[0];
    setFile(file);
  }

  return (
    <>
      <Button onClick={handleOpen}>
        Загрузить файл
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Загрузка excel в базу данных</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.File id="form-excel">
              <Form.File.Input onChange={handleFileChange}/>
            </Form.File>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveToDb}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Excel;