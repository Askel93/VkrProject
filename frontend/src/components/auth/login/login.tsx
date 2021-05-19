import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form } from 'react-bootstrap'

import { Loading, Input } from '../../util';


import { historyPush, loginRequest } from '../../../actions';
import { authSelector } from '../../../selector';
import { urlConstants, errorType } from '../../../types';

const Login : FunctionComponent = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const { loading, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    dispatch(loginRequest({ userName, password }));
  }

  const onRegisterLink = () => {
    const { SIGNUP_URL } = urlConstants;
    historyPush(SIGNUP_URL);
  }

  return loading 
  ? <Loading />
  : (
    <Form onSubmit={onSubmit} noValidate validated={validated}>
      <p className="h5 text-center mb-4">Sign in</p>
      <Input
        value={userName}
        hasValidation
        required
        placeholder="Type your username"
        label="Enter username"
        pattern=".{4,}"
        onChange={setUserName}
        id="username"
        feedback="Please provide a valid username" />
      {error && error.includes(errorType.LOGIN_PRINCIPAL) ? <Alert color="error">{error}</Alert> : null}
      <Input 
        value={password}
        hasValidation
        required
        placeholder="Type your password"
        label="Enter password"
        type="password"
        id="password"
        pattern=".{8,}"
        feedback="Please provide a valid password"
        onChange={setPassword} />
      {error && error.includes(errorType.LOGIN_PWD) ? <Alert color="error">{error}</Alert> : null}
      <div className="text-center">
        <Button type="submit">
          Login
        </Button>
        <Button 
          onClick={onRegisterLink}>
          Register
        </Button>
      </div>
    </Form>
  )
}

export default Login;