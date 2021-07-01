import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Col } from 'react-bootstrap'

import Loading from '../util/spinner';

const SignIn = lazy(() => import('./login'));
const SignUp = lazy(() => import('./register'));

function hasPrevPath(obj: any): obj is ({ prevPath: string }) {
  return obj && obj.prevPath;
}

const Auth = () => {
  const { state } = useLocation();
  let prevPath: string | undefined;
  if (hasPrevPath(state)) {
    prevPath = state.prevPath;
  }
  return (
      <Col xl="4" md="6" xs="auto" className="auth" style={{margin: "auto", marginTop: "10%"}}>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/auth/signin" exact render={() => <SignIn prevPath={prevPath} />} />
            <Route path="/auth/signup" exact render={() => <SignUp prevPath={prevPath} />} />
          </Suspense>
        </Switch>
      </Col>
  )
};

export default Auth;