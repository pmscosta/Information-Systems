import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory} from 'history';

// route components
import Purchases from '../../ui/pages/Purchases';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/purchases" component={Purchases} />
    </Switch>
  </Router>
);