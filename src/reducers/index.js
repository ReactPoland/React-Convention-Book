import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';

import dashboard  from './dashboard';
import menu       from './menu';
import post       from './post';
import recipe     from './recipe';
import restaurant from './restaurant';
import session    from './session';
import staff      from './staff';
import schedule   from './schedule';

export default combineReducers({
  routing: routeReducer,
  dashboard,
  menu,
  post,
  recipe,
  restaurant,
  session,
  staff,
  schedule
});
