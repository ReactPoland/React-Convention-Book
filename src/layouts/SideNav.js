import React from 'react';
import { Link } from 'react-router';

import rolesUtils from 'utils/roles';

import DashboardBox from 'components/dashboard/DashboardBox';

function getCurrentRoute() {
  const location = window.location.hash;
  const noHash = location.substring(2);
  const firstSlashIndex = noHash.indexOf('/');
  const currentRoute = firstSlashIndex !== -1 ? noHash.substring(0, firstSlashIndex) : noHash;

  return currentRoute;
}

const managing = [{
  id: 'staff',
  title: 'Staff',
  link: '/staff'
}, {
  id: 'reports',
  title: 'Reports',
  link: '/reports'
}, {
  id: 'messaging',
  title: 'Messaging',
  link: '/message'
}, {
  id: 'video',
  title: 'Video Library',
  link: '/video'
}, {
  id: 'suppliers',
  title: 'Suppliers',
  link: '/suppliers'
}, {
  id: 'inventory',
  title: 'Inventory',
  link: '/inventory'
}];

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

function getPosts(props) {
  const items = props ? props.posts || [] : [];
  return items.sort(sortPostsByDate);
}

function getMenus(props) {
  return props ? props.menus || [] : [];
}

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

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this._getProps = this._getProps.bind(this);
  }

  _getProps(route) {
    let props = {
      posts: getPosts(this.props.post),
      menus: getMenus(this.props.menu),
      schedule: getSchedule(this.props.schedule),
      recipes: getRecipes(this.props.recipe),
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

    return (
      <div className={classes.join(" ")}>
        <DashboardBox
          prefix="post"
          items={props.posts || []}
          label="News Feed"
          open={props.open === 'post'}
          visible={props.visible === 'post' || props.visible === 'all'} />
        <DashboardBox
          prefix="menu"
          items={props.menus || []}
          label="Menus"
          open={props.open === 'menu'}
          visible={props.visible === 'menu' || props.visible === 'all'} />
        <DashboardBox
          prefix="task"
          items={props.schedule || []}
          label="Schedule"
          open={props.open === 'schedule'}
          visible={props.visible === 'schedule' || props.visible === 'all'} />
        <DashboardBox
          prefix="train"
          items={props.train || []}
          label="Learn/Train"
          open={props.open === 'train'}
          visible={props.visible === 'train' || props.visible === 'all'} />
        <DashboardBox
          prefix="recipe"
          items={props.recipes || []}
          label="Recipes"
          open={props.open === 'recipe'}
          visible={props.visible === 'all' || props.visible === 'recipe'} />
        {manageBox}
      </div>
    );
  }
}
