import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';

import dashboard  from './dashboard';
import menu       from './menu';
import post       from './post';
import restaurant from './restaurant';
import session    from './session';
import staff      from './staff';

export default combineReducers({
  routing: routeReducer,
  dashboard,
  menu,
  post,
  restaurant,
  session,
  staff
});
