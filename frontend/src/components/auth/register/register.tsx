import React, { useState, FunctionComponent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loading, Input } from '../../util';

import { signUpRequest } from '../../../actions/auth';
import { authSelector } from '../../../selector';
import { errorType } from '../../../types';

const SignUp: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("");
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false);

  const { loading, error } = useSelector(authSelector);

  const dispatch = useDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    dispatch(signUpRequest({ userName, email, password, secondName, firstName }))
  }

  return loading 
  ? <Loading />
  : (
    <Form onSubmit={onSubmit} noValidate validated={validated}>
      <p className="h5 text-center mb-4">Sign up</p>
      <Input 
        id="username"
        label="Enter username"
        hasValidation
        required
        placeholder="Type your username"
        value={userName}
        onChange={setUserName}
        pattern=".{4,}"
        feedback="Please provide a valid username" />
      {error && error.includes(errorType.SIGNUP_USERNAME) ? <Alert color="error">{error}</Alert> : null}
      <Input 
        id="email"
        label="Enter email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        hasValidation
        feedback="Please provide a valid email"
        placeholder="Type your email"
      />
      {error && error.includes(errorType.SIGNUP_EMAIL) ? <Alert color="error">{error}</Alert> : null}
      <Input 
        id="firstname"
        label="Enter firstname"
        placeholder="Type your firstname"
        value={firstName}
        onChange={setFirstName}
      />
      <Input 
        id="secondname"
        label="Enter secondname"
        placeholder="Type your secondname"
        value={secondName}
        onChange={setSecondName}
      />
      <Input 
        id="password"
        label="Enter password"
        placeholder="Type your password"
        type="password"
        value={password}
        onChange={setPassword}
        hasValidation
        required
        pattern=".{8,}"
        feedback="Please provide a valid password"
      />
      <Button type="submit">
        Register
      </Button>
    </Form>
  )
}

export default SignUp;