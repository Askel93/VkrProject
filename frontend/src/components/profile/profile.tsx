import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../util/spinner';
import { getProfileRequest } from '../../actions';
import { userSelector } from '../../selector'

const Profile = () => {

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  useEffect(() => {
    if (user.name === "") {
      dispatch(getProfileRequest());
    }
  }, [])

  return user.loading
  ? <Loading />
  : (
    <div>
      {user.name}
      {user.email}
      {user.firstName}
      {user.secondName}
    </div>
  );
}

export default Profile;