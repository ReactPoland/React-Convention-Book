import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

import falcorUtils from 'utils/falcorUtils';
import * as actions from 'actions';
import API from 'utils/API';

import rolesUtils from 'utils/roles';

import Loader from 'decorators/Loader';
import SidenavList from 'components/sidenav/SidenavList';
import MenuEntity from 'layouts/SidenavEntities/MenuEntity';

import falcorModel from '../falcorModel.js';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    menu: bindActionCreators(actions.menu, dispatch),
    section: bindActionCreators(actions.section, dispatch),
    menuItem: bindActionCreators(actions.menuItem, dispatch)
  }
});

function getCurrentRoute() {
  const location = window.location.hash;
  const noHash = location.substring(2);
  const firstSlashIndex = noHash.indexOf('/');
  const currentRoute = firstSlashIndex !== -1 ? noHash.substring(0, firstSlashIndex) : noHash;

  return currentRoute;
}

const managing = [
  { id: 'staff',      title: 'Staff',         link: '/manage/staff' },
  { id: 'reports',    title: 'Email Templates',       link: '/manage/emailTemplates' },
  { id: 'reports',    title: 'Reports',       link: '/manage/reports' },
  { id: 'messaging',  title: 'Messaging',     link: '/manage/message' },
  { id: 'video',      title: 'Video Library', link: '/manage/video' },
  { id: 'suppliers',  title: 'Suppliers',     link: '/manage/suppliers' },
  { id: 'inventory',  title: 'Inventory',     link: '/manage/inventory'}
];

const train = [{
  id: 'basic',
  title: 'Basics'
}, {
  id: 'menu',
  title: 'Menus'
}, {
  id: 'service',
  title: 'Services'
}];

function sortPostsByDate(a, b) {
  if(a.publicationDate < b.publicationDate) return 1;
  if(a.publicationDate > b.publicationDate) return -1;
  return 0;
}

function sortTasksByDate(a, b) {
  if(a.date < b.date) return -1;
  if(a.date > b.date) return 1;
  return 0;
}

// function getPosts(props) {
//   const items = props ? props.posts || [] : [];
//   return items.sort(sortPostsByDate);
// }

// function getSchedule(props) {
//   const now = new Date();
//   const threeDays = new Date(now).setDate(now.getDate() + 3);
//   let tasks = props ? props.tasks || [] : [];

//   tasks = tasks.filter((task) => task.date > now && task.date < threeDays);
//   return tasks.sort(sortTasksByDate);
// }

// function getRecipes(props) {
//   return props ? props.recipes || [] : [];
// }

const routes = ['train', 'menu', 'recipe', 'manage', 'post'];
function hasMenu(route) {
  return routes.indexOf(route) !== -1;
}

function openOrVisible(props, name) {
  return {
    open: props.open === name,
    visible: props.visible === 'all' || props.visible === name
  };
}

@Loader()
class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this._getProps = this._getProps.bind(this);

    this.state = {
      menusLengthPath: null
    };

    if(localStorage.restaurantID && localStorage.token) {
      this._fetchData();
    }
  }

  componentDidMount() {
    this.loader(this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    this.loader(nextProps);
  }

  async _fetchData() {
    const { menu, menuItem, section, actions } = this.props;
    let menusLengthPath = ['restaurants', localStorage.restaurantID, 'menus', 'length'];

    console.info("lengthPath");
    console.info("lengthPath");
    console.info(menusLengthPath);
    console.info("lengthPath");
    console.info("lengthPath");
    const menusLength = await falcorModel.getValue(
      menusLengthPath
    );
    if(typeof menusLength === 'undefined') {
      console.info('NOT FETCHING');
      console.info('NOT FETCHING');
      console.info('NOT FETCHING');
      return;
    }
    console.debug("menusLength");
    console.debug("menusLength");
    console.debug("menusLength");
    console.debug(menusLength);
    console.debug("menusLength");
    console.debug("menusLength");
    console.debug("menusLength");


    if(!menu.length) {
      console.info("IMPLEMENTED #2");
      const response = await API.get(
        ['restaurants', localStorage.restaurantID, 'menus', {from: 0, to: menusLength}, ['title', 'id', 'description', 'showAllergensInMenu']]
      );

      console.info("\n\n\n 1111debug \n\n\n", response, "\n\n\n debug \n\n\n");

      console.info("RESULT #2", response);
      const menus = falcorUtils.makeArray({object: response.restaurants[localStorage.restaurantID], name: 'menus'});
      
      actions.menu.menuList(menus);
    }
  }

  loader(props) {
    this.props.__showLoaderUntil
      .bind(this, props, 'menu')();
  }

  _getProps(route) {
    let props = {
      posts: this.props.post,//getPosts(this.props.post),
      menus: this.props.menu,
      schedule: this.props.schedule,//getSchedule(this.props.schedule),
      recipes: this.props.recipe,//getRecipes(this.props.recipe),
      train: train,
      managing: managing
    }

    if(route === 'dashboard') {
      props.open = null;
      props.visible = 'all';
    } else if(hasMenu(route)) {
      props.open = route;
      props.visible = route;
    } else {
      props.open = null;
      props.visible = null;
    }

    return props;
  }

  render() {
    const headerStyle = {backgroundColor: Colors.cyan800,  marginTop: -8, color: '#fff'};
    const showManageBox = rolesUtils.isAdminOrManager(this.props.session.user);
    const currentRoute = getCurrentRoute();
    const props = this._getProps(currentRoute);
    const manageBox = showManageBox ?
      <SidenavList
        items={props.managing || []}
        label="Manage"
        headerComponent={<ListItem primaryText='Manage' disabled style={headerStyle} />}
        {...openOrVisible(props, 'manage')} />
      : null;

    let classes = ['SideNav'];
    if(props.visible !== 'all' && props.visible !== null) {
      classes.push('open');
    }

    if(props.visible === null && props.open === null) {
      classes.push('display-none');
    }

    if(!this.state.loaded) {
      return this.props.__getLoaderMarkup();
    }

    return (
      <div className={classes.join(" ")}>
        <SidenavList
          prefix="post"
          items={props.posts || []}
          label="News Feed"
          headerComponent={<ListItem primaryText='News Feed' disabled style={headerStyle} />}
          {...openOrVisible(props, 'post')} />
        <MenuEntity
          {...this.props}
          prefix="menu"
          items={props.menus || []}
          label="Menus"
          {...openOrVisible(props, 'menu')} />
        <SidenavList
          prefix="task"
          items={props.schedule || []}
          label="Schedule"
          headerComponent={<ListItem primaryText='Schedule' disabled style={headerStyle} />}
          {...openOrVisible(props, 'schedule')} />
        <SidenavList
          prefix="train"
          items={props.train || []}
          label="Learn/Train"
          headerComponent={<ListItem primaryText='Learn/Train' disabled style={headerStyle} />}
          {...openOrVisible(props, 'train')} />
        <SidenavList
          prefix="recipe"
          items={props.recipes || []}
          label="Recipes"
          headerComponent={<ListItem primaryText='Recipes' disabled style={headerStyle} />}
          {...openOrVisible(props, 'recipe')} />
        {manageBox}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
