import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';

import { saveToDbRequest } from '../../actions/excel';
import { WithAuthFunc } from '../hoc/with';

const Excel = () => {

  const [show, setShow] = useState(false)
  const [file, setFile] = useState<File | null>(null);

  const [handleOpen] = WithAuthFunc(() => setShow(true));
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const saveToDb = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    if (file === null) {
      return;
    }
    formData.append("file", file, file.name)
    dispatch(saveToDbRequest(formData));
    setFile(null);
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
      <Button onClick={handleOpen} variant="link" className="m-0 p-0">
        Загрузить файл
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Загрузка excel в базу данных</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveToDb}>
            <Form.File id="formcheck" onChange={handleFileChange} custom>
              <Form.File.Input onChange={handleFileChange} />
              <Form.File.Label data-browse="Browser">
                {file ? file.name : "Custom file input"}
              </Form.File.Label>
            </Form.File>
            <ButtonGroup className="mt-2">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Excel;