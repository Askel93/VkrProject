import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Col } from 'react-bootstrap'

import { Loading } from '../util';

const SignIn = lazy(() => import('./login'));
const SignUp = lazy(() => import('./register'));

const Auth = () => {
  return (
    <Col xl="4" md="6" xs="auto" style={{margin: "auto", marginTop: "10%"}}>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/auth/signin" render={() => <SignIn />} />
          <Route path="/auth/signup" render={() => <SignUp />} />
        </Suspense>
      </Switch>
    </Col>
  )
}

export default Auth;