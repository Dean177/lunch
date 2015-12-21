import React from 'react';
import { Route } from 'react-router';
import ChooseLunch from './ChooseLunch/index';
import Landing from './Landing';
import RouteContainer from './RouteContainer';
import UserConfig from './UserConfig';

const routes = (
  <Route path='' component={RouteContainer}>
    <Route path='/' component={Landing} />
    <Route path='lunch' component={ChooseLunch} />
    <Route path='user' component={UserConfig} />
  </Route>
);

export default routes;
