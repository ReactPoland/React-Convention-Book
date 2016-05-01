import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';
import HomeView                     from 'views/HomeView';
/* wrappers */
import CoreLayout                   from 'layouts/CoreLayout';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} name='home' />
  </Route>


);
