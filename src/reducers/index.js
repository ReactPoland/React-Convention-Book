import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';

import dashboard  from './dashboard';
import menu       from './menu';
import menuItem   from './menuItem';
import post       from './post';
import recipe     from './recipe';
import restaurant from './restaurant';
import section    from './section';
import session    from './session';
import staff      from './staff';
import schedule   from './schedule';
import newsFeed   from './newsFeed';

export default combineReducers({
  routing: routeReducer,
  dashboard,
  menu,
  menuItem,
  post,
  recipe,
  restaurant,
  section,
  session,
  staff,
  schedule,
  newsFeed
});
