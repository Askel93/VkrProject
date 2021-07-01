import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Loading from '../util/spinner'
import ErrorModal from '../util/errorModal';

import './App.css'

const Auth = lazy(() => import('../auth'));
const Ships = lazy(() => import('../ships'));
const Ship = lazy(() => import('../ship'));
const Profile = lazy(() => import('../profile'));
const OwnOperator = lazy(() => import('../ownOperator'))
const OwnOperators = lazy(() => import('../ownOperators'));
const NotFoundPage = lazy(() => import('../util/notFoundPage'));
const Header = lazy(() => import('../header'));

const App = () => {
  return (
      <>
        <Suspense fallback={"..."}>
          <Header />
        </Suspense>
        <Switch>
          <React.StrictMode>
            <Suspense fallback={<Loading isLoad />}>
              <Route path="/" exact render={() => <Redirect to="/ships" />} />

              <Route path="/auth" render={() => <Auth />} />

              <Route path="/ships" exact render={() => <Redirect to="/ships/1/20/id" />} />
              <Route
                  path="/ships/:page/:size/:sort"
                  render={({ match: { params }, location: { search } }) =>
                      <Ships page={parseInt(params.page)} size={parseInt(params.size)} sort={params.sort} search={search} />} />
              <Route path="/ship" component={Ship} />

              <Route path="/ownoperators" exact render={() => <Redirect to="/ownoperators/1/20/name" />} />
              <Route
                  path="/ownoperators/:page/:size/:sort"
                  render={({ match: { params }, location: { search } }) =>
                      <OwnOperators page={parseInt(params.page)} size={parseInt(params.size)} sort={params.sort} search={search} />} />
              <Route path="/ownoperator" component={OwnOperator} />

              <Route path="/profile" exact component={Profile}  />

              <Route path="/notFound" exact component={NotFoundPage} />
            </Suspense>
          </React.StrictMode>
        </Switch>
        <ErrorModal />
        <Loading />
      </>
  );
};

export default App;