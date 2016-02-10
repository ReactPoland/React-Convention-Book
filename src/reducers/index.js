import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';

import session    from './session';
import dashboard  from './dashboard';
import staff      from './staff';

export default combineReducers({
  routing: routeReducer,
  session,
  dashboard,
  staff
});
