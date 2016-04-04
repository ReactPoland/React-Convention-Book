import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';

/* wrappers */
import CoreLayout                   from '../layouts/CoreLayout';

/* home view */
import PublishingApp                    from '../layouts/PublishingApp';

/* auth views */
import LoginView                    from '../views/LoginView';
import RegisterView                    from '../views/RegisterView';

import DashboardView                    from '../views/DashboardView';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={PublishingApp} name='home' />
    <Route component={LoginView} path='login' name='login' />
    <Route component={RegisterView} path='register' name='register' />
    <Route component={DashboardView} path='dashboard' name='dashboard' />
  </Route>
);