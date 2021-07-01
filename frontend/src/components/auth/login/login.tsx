import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Form } from 'react-bootstrap'

import { Input, PwdIcon, PersonIcon } from '../../util';

import { loginRequest, historyPush } from '../../../actions';
import { authSelector } from '../../../selector';
import toObject from '../../hoc/formDataToObject';
import { errorType, userNamePattern, pwdPattern, LoginUser } from '../../types';

/* eslint-disable */
const Login : FunctionComponent<{prevPath?: string}> = ({ prevPath }) => {

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<LoginUser | null>();
  
  const [showPwd, PasswordIcon] = PwdIcon();

  const { loading, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    const user = toObject(new FormData(form)) as LoginUser;
    setUser(user);
    dispatch(loginRequest(user, prevPath));
  };

  const onRegisterLink = () => historyPush("/auth/signup");

  const isUserNameInvalid = error?.includes(errorType.LOGIN_PRINCIPAL);
  const userNameFeedBack = isUserNameInvalid ? error! : "Please provide a valid username";
  const isPasswordInvalid = error?.includes(errorType.LOGIN_PWD);
  const pwdFeedBack = isPasswordInvalid ? error! : "Please provide a valid password";
  const otherProps = { hasValidation: true, required: true, className: 'mb-4' };
  return loading
      ? null
      : (
          <Form onSubmit={onSubmit} noValidate validated={validated}>
            <p className="h5 text-center mb-4">Sign in</p>
            <Input
                {...otherProps}
                placeholder="Type your username"
                label="Enter username"
                icon={<PersonIcon />}
                pattern={userNamePattern}
                id="username"
                name="userName"
                defaultValue={user?.userName}
                feedback={userNameFeedBack}
                isInvalid={isUserNameInvalid} />
            <Input
                {...otherProps}
                placeholder="Type your password"
                label="Enter password"
                icon={<PasswordIcon />}
                type={showPwd ? "" : "password"}
                id="password"
                name="password"
                defaultValue={user?.password}
                pattern={pwdPattern}
                feedback={pwdFeedBack}
                isInvalid={isPasswordInvalid} />
            <Form.Check
                type="checkbox"
                name="isRemember"
                className="mb-2"
                id="remember"
                defaultChecked={user?.isRemember}
                label="Remember me" />
            <ButtonGroup style={{ width: '100%', padding: '0 20%' }}>
              <Button type="submit" variant="secondary">
                Login
              </Button>
              <Button onClick={onRegisterLink} variant="secondary">
                Register
              </Button>
            </ButtonGroup>
          </Form>
      )
};

export default Login;