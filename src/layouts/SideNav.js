import React from 'react';
import { Link } from 'react-router';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions';

import rolesUtils from 'utils/roles';

import Loader from 'decorators/Loader';
import DashboardBox from 'components/dashboard/DashboardBox';

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
  { id: 'staff',      title: 'Staff',         link: '/staff' },
  { id: 'reports',    title: 'Reports',       link: '/reports' },
  { id: 'messaging',  title: 'Messaging',     link: '/message' },
  { id: 'video',      title: 'Video Library', link: '/video' },
  { id: 'suppliers',  title: 'Suppliers',     link: '/suppliers' },
  { id: 'inventory',  title: 'Inventory',     link: '/inventory'}
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

// function getMenus(props) {
//   return props ? props.menus || [] : [];
// }

function getSchedule(props) {
  const now = new Date();
  const threeDays = new Date(now).setDate(now.getDate() + 3);
  let tasks = props ? props.tasks || [] : [];

  tasks = tasks.filter((task) => task.date > now && task.date < threeDays);
  return tasks.sort(sortTasksByDate);
}

function getRecipes(props) {
  return props ? props.recipes || [] : [];
}

const routes = ['train', 'menu', 'recipe', 'manage', 'post'];
function hasMenu(route) {
  return routes.indexOf(route) !== -1;
}

async function getFromDB({url}) {
  const response = await axiosHttpRequest({
    url,
    method: 'get'
  });

  if(response.status === 200 && response.statusText === 'OK') {
    return response;
  } else {
    alert('TODO: get menus error');
  }
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

    this.state = {};
    this._fetchData();
  }

  componentDidMount() {
    this.loader(this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    this.loader(nextProps);
  }

  async _fetchData() {
    const { menu, menuItem, section, actions } = this.props;

    if(!menu.length) {
      const menus = await getFromDB({
        url: '/restaurant/restaurantID/menus'
      });

      actions.menu.menuList(menus.data);
    }

    if(!section.length) {
      const sections = await getFromDB({
        url: '/restaurant/restaurantID/sections'
      });

      actions.section.sectionList(sections.data);
    }

    if(!menuItem.length) {
      const menuItems = await getFromDB({
        url: '/restaurant/restaurantID/menuLibrary'
      });

      actions.menuItem.menuItemList(menuItems.data);
    }
  }

  loader(props) {
    this.props.__showLoaderUntil
      .bind(this, props, 'menu', 'menuItem', 'section')();
  }

  _getProps(route) {
    let props = {
      posts: this.props.post,//getPosts(this.props.post),
      menus: this.props.menu,//getMenus(this.props.menu),
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
    const showManageBox = rolesUtils.isAdminOrManager(this.props.session.user);
    const currentRoute = getCurrentRoute();
    const props = this._getProps(currentRoute);
    const manageBox = showManageBox ?
      <DashboardBox
        items={props.managing || []}
        label="Manage"
        open={props.open === 'managing'}
        visible={props.visible === 'all' || props.visible === 'managing'} />
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
        <DashboardBox
          prefix="post"
          items={props.posts || []}
          label="News Feed"
          {...openOrVisible(props, 'post')} />
        <DashboardBox
          prefix="menu"
          items={props.menus || []}
          label="Menus"
          {...openOrVisible(props, 'menu')} />
        <DashboardBox
          prefix="task"
          items={props.schedule || []}
          label="Schedule"
          {...openOrVisible(props, 'schedule')} />
        <DashboardBox
          prefix="train"
          items={props.train || []}
          label="Learn/Train"
          {...openOrVisible(props, 'train')} />
        <DashboardBox
          prefix="recipe"
          items={props.recipes || []}
          label="Recipes"
          {...openOrVisible(props, 'recipe')} />
        {manageBox}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
