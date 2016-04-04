import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';

/* wrappers */
import CoreLayout                   from '../layouts/CoreLayout';

/* home view */
import PublishingApp                    from '../layouts/PublishingApp';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={PublishingApp} name='home' />
    <Route component={PublishingApp} path="test" name="test" />
  </Route>
);