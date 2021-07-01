import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PwdIcon, Input } from '../../util';

import { UserEditModal, pwdPattern, newPasswordPattern, confirmPattern, ChangePasswordPayload } from '../../types';
import { toObject } from '../../hoc';

const EditPassword: UserEditModal = ({ entity }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPwd, PasswordIcon] = PwdIcon();
  const [showNewPwd, NewPasswordIcon] = PwdIcon();
  const [showConfPwd, ConfPasswordIcon] = PwdIcon();
  const [changeUser, setChangeUser] = useState<ChangePasswordPayload>({ ...entity, newPassword: '', confirmPassword: ''})

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  }
  const handleOpen = () => setShow(true);

  const onSaving = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    e.preventDefault();
    const user = toObject(new FormData(form), entity) as ChangePasswordPayload;
    setChangeUser(user)
    handleClose();
  }

  const inputProps = { hasValidation: true, className: 'mb-0' }

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">Изменить пароль</Button>
      <Modal show={show} onHide={handleClose} className="edit-modal">
        <Modal.Header closeButton>Изменение пароля</Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSaving} noValidate validated={validated}>
            <Input
              prepend="Password"
              {...inputProps}
              id="prevpassword"
              icon={<PasswordIcon />}
              type={showPwd ? '' : 'password'}
              defaultValue={changeUser.password}
              pattern={pwdPattern}
              feedback="Please provide a valid password" />
            <Input 
              prepend="New password"
              {...inputProps}
              icon={<NewPasswordIcon />}
              id="newpassword"
              type={showNewPwd ? '' : 'password'}
              defaultValue={''}
              pattern={newPasswordPattern(changeUser.password)} />
            <Input 
              prepend="Confirm new password"
              {...inputProps}
              icon={<ConfPasswordIcon />}
              id="confpassword"
              type={showConfPwd ? '' : 'password'}
              defaultValue={changeUser.confirmPassword}
              pattern={confirmPattern(changeUser.newPassword)} />
            <Button type="submit" variant="secondary" className="float-left mt-2">Сохранить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditPassword;