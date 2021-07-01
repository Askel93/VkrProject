import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Card, ListGroup } from 'react-bootstrap';
import classNames from 'classnames';

import { getProfileRequest } from '../../actions/user';
import { userSelector, jwtAuthSelector } from '../../selector';

import UserList from './list';
import { EditProfile, EditPassword } from './modal';

export interface ProfileProps {
  className?: string;
}

const Profile: FunctionComponent<ProfileProps> = ({ className = "" }) => {

  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const { isAdmin } = useSelector(jwtAuthSelector);


  const { userName, email, firstName, secondName, loading } = user;

  useEffect(() => {
    if (userName === "" && !loading) {
      dispatch(getProfileRequest());
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Card className={classNames(className, "user-profile")}>
      <Card.Header>
        {userName}
        {!loading && userName !== "" &&
        <ButtonGroup style={{ float: 'right' }}>
          {/* <EditPassword entity={{ ...user, password: "" }} /> */}
          <EditProfile entity={{ ...user, password: "" }} />
        </ButtonGroup>}
      </Card.Header>
      <ListGroup>
        {email !== undefined && email !== "" && <ListGroup.Item>{email}</ListGroup.Item>}
        {firstName !== null && firstName !== "" && <ListGroup.Item>{firstName}</ListGroup.Item>}
        {secondName !== null && secondName !== "" && <ListGroup.Item>{secondName}</ListGroup.Item>}
      </ListGroup>
      {isAdmin && <UserList />}
    </Card >
  )
}

export default Profile;