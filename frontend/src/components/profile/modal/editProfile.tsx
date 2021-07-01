import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

import { updateProfile } from '../../../actions/user';
import { PwdIcon, Input, PersonIcon, EmailIcon } from '../../util'
import { userSelector } from '../../../selector';

import { UserEditModal, errorType, pwdPattern, userNamePattern, User } from '../../types';
import { toObject } from '../../hoc';

const EditModal: UserEditModal = ({ entity }) => {

  const { loading, error } = useSelector(userSelector)

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [showPwd, PasswordIcon] = PwdIcon();
  
  const handleClose = () => {
    setShow(false);
    setValidated(false);
  }
  const handleOpen = () => setShow(true);

  const dispatch = useDispatch();

  const onSaving = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    const user = toObject(new FormData(form), entity) as User;
    dispatch(updateProfile(user));
  }

  useEffect(() => {
    if (!loading && error === null) handleClose();
  }, [loading, error])

  const isUserNameInvalid = error?.includes(errorType.SIGNUP_USERNAME);
  const userNameFeedBack = isUserNameInvalid ? error! : "Please provide a valid username";
  const isEmailInvalid = error?.includes(errorType.SIGNUP_EMAIL);
  const emailFeedback = isEmailInvalid ? error! : "Please provide a valid email";
  const isPwdInvalid = error?.includes(errorType.PWD_INVALID);
  const pwdFeedBack = isPwdInvalid ? error! : "Please provide a valid password";

  const inputProps = { hasValidation: true, className: 'mb-0' }

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">Редактирование</Button>
      <Modal show={show} onHide={handleClose} className="edit-modal">
        <Modal.Header closeButton>Редактирование</Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSaving} noValidate validated={validated}>
            <Input
              prepend="UserName"
              id="username"
              name="userName"
              defaultValue={entity.userName}
              feedback={userNameFeedBack}
              {...inputProps}
              icon={<PersonIcon />}
              required
              pattern={userNamePattern}
              isInvalid={isUserNameInvalid} />
            <Input
              prepend="Email"
              id="email"
              name="email"
              defaultValue={entity.email}
              feedback={emailFeedback}
              type="email"
              icon={<EmailIcon />}
              {...inputProps}
              required
              isInvalid={isEmailInvalid} />
            <Input
              prepend="FirstName"
              id="firstname"
              name="firstName"
              {...inputProps}
              defaultValue={entity.firstName || ""} />
            <Input
              prepend="SecondName"
              id="secondname"
              name="secondName"
              {...inputProps}
              defaultValue={entity.secondName || ""} />
            <Input
              prepend="Password"
              id="password"
              name="password"
              defaultValue={entity.password}
              type={showPwd ? "text" : "password"}
              required
              icon={<PasswordIcon />}
              {...inputProps}
              isInvalid={isPwdInvalid}
              feedback={pwdFeedBack}
              pattern={pwdPattern} />
            <Button type="submit" variant="secondary" className="float-left mt-2">Сохранить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal;