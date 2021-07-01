import React, { useState, FunctionComponent } from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../util/form';
import { PwdIcon, PersonIcon, EmailIcon } from '../../util/icon'
import toObject from '../../hoc/formDataToObject';
import { signUpRequest } from '../../../actions/auth';
import { authSelector } from '../../../selector';
import { errorType, pwdPattern, userNamePattern, confirmPattern, emailPattern, User } from '../../types';

const SignUp: FunctionComponent<{ prevPath?: string}> = ({ prevPath }) => {

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<User | undefined>()

  const [showPwd, PasswordIcon] = PwdIcon();
  const [showConfPwd, ConfPwdIcon] = PwdIcon();

  const { loading, error } = useSelector(authSelector);

  const dispatch = useDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    const user = toObject(new FormData(form)) as User;
    setUser(user)
    if (!form.checkValidity() || user.confirmPassword !== user.password) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    dispatch(signUpRequest(user, prevPath))
  }

  const onLoginClick = () => import('../../../actions/util').then(util => util.historyPush("/auth/signin"));

  const isUserNameInvalid = (error && error.includes(errorType.SIGNUP_USERNAME)) || false;
  const userNameFeedBack = isUserNameInvalid ? error! : "Please provide a valid username";
  const isEmailInvalid = (error && error.includes(errorType.SIGNUP_EMAIL)) || false;
  const emailFeedback = isEmailInvalid ? error! : "Please provide a valid email";

  return loading
    ? null
    : (
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <p className="h5 text-center mb-4">Sign up</p>
        <Input
          id="username"
          label="Enter username"
          hasValidation
          className="mb-4"
          required
          name="userName"
          placeholder="Type your username"
          icon={<PersonIcon />}
          defaultValue={user?.userName}
          pattern={userNamePattern}
          isInvalid={isUserNameInvalid}
          feedback={userNameFeedBack} />
        <Input
          name="email"
          id="email"
          label="Enter email"
          type="email"
          icon={<EmailIcon />}
          defaultValue={user?.email}
          className="mb-4"
          required
          hasValidation
          pattern={emailPattern}
          feedback={emailFeedback}
          isInvalid={isEmailInvalid}
          placeholder="Type your email" />
        <Input
          name="firstName"
          id="firstname"
          label="Enter firstname"
          icon={<PersonIcon />}
          placeholder="Type your firstname"
          defaultValue={user?.firstName}
          className="mb-4" />
        <Input
          name="secondName"
          id="secondname"
          label="Enter secondname"
          icon={<PersonIcon />}
          placeholder="Type your secondname"
          defaultValue={user?.secondName}
          className="mb-4" />
        <Input
          name="password"
          id="password"
          label="Enter password"
          placeholder="Type your password"
          type={showPwd ? "" : "password"}
          defaultValue={user?.password}
          className="mb-4"
          hasValidation
          required
          pattern={pwdPattern}
          icon={<PasswordIcon />}
          feedback="Please provide a valid password" />
        <Input
          name="confirmPassword"
          id="confpassword"
          label="Enter confirm password"
          placeholder="Type your password"
          type={showConfPwd ? "" : "password"}
          className="mb-4"
          hasValidation
          required
          icon={<ConfPwdIcon />}
          pattern={confirmPattern(user?.password || "")}
          feedback="Confirmed password invalid" />
        <Form.Check
          name="isRemember"
          type="checkbox"
          checked={user?.isRemember}
          className="mb-2"
          id="remember"
          label="Remember me" />
        <ButtonGroup style={{ width: '100%', padding: '0 20%' }}>
          <Button type="submit" variant="secondary">
            Register
          </Button>
          <Button onClick={onLoginClick} variant="secondary">
            Login
          </Button>
        </ButtonGroup>
      </Form>
    )
}

export default SignUp;