import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../header';
import { Loading, ErrorModal } from '../util'

import './App.css'

const Auth = lazy(() => import('../auth'));
const Ships = lazy(() => import('../ships'));
const Ship = lazy(() => import('../ship'));
const Profile = lazy(() => import('../profile'));
const Excel = lazy(() => import('../excel'));
const OwnOperator = lazy(() => import('../ownOperator'))
const OwnOperators = lazy(() => import('../ownOperators'));

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/auth" render={() => <Auth />}/>
          
          <Route path="/ship" exact render={() => <Redirect to="/ship/1/20/id" />} />
          <Route path="/ship/:page/:size/:sort" render={({match:{params}}) => <Ships page={parseInt(params.page)} size={parseInt(params.size)} sort={params.sort} />} />
          <Route path="/ship/:id" exact render={({ match }) => <Ship id={parseInt(match.params.id)} />} />

          <Route path="/ownoperator" exact render={() => <Redirect to="/ownoperator/1/20/name" />} />
          <Route path="/ownoperator/:page/:size/:sort" render={({ match: { params } }) => <OwnOperators page={parseInt(params.page)} size={parseInt(params.size)} sort={params.sort} />} />
          <Route path="/ownoperator/:name" exact render={({ match }) => <OwnOperator name={match.params.name} />} />
          
          <Route path="/excel" render={() => <Excel />} />
          
          <Route path="/profile" render={() => <Profile />} />
        </Suspense>
      </Switch>
      <ErrorModal />
    </>
  );
}

export default App;