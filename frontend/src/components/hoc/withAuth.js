import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { jwtSelector, authSelector } from '../../selector'
import { noAuthRequest } from '../../actions/util';

const useAuth = () => {
  const { isAuth, loading: jwtLoading } = useSelector(jwtSelector);
  const { loading } = useSelector(authSelector);
  useEffect(() => {
    if (loading || jwtLoading) return;
    if (!isAuth) {
      //noAuthRequest();
    }
  }, [isAuth, loading, jwtLoading]);
  return isAuth;
}

const WithAuth = ({children}) => useAuth() && children;

export default WithAuth;