import React from 'react';
import { Link } from 'react-router';
import { List, ListItem, IconMenu, MenuItem, Divider } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import {
  ActionSettings,
  EditorModeEdit,
  ContentAdd,
  ActionSwapVert,
  ActionBuild
} from 'material-ui/lib/svg-icons'

function isActiveLink(item) {
  const hash = window.location.hash;
  return hash.includes(item.id);
}

const Item = (item, prefix, open) => {
  const classes = ["DashboardBox-Item"];
  const isActive = isActiveLink(item);
  let description = null;
  let icon = null;

  if(isActive) {
    classes.push("active");
  }

  if(!open) {
    description = item.description;
  }

  if(open && isActive) {
    icon = (
      <IconMenu
        iconButtonElement={
          <ActionSettings color={Colors.cyan500} />
        }>
        <MenuItem
          primaryText="Edit Sections"
          rightIcon={<EditorModeEdit />} />
        <MenuItem
          primaryText="Reorder Items"
          rightIcon={<ActionSwapVert />} />
        <MenuItem
          primaryText="Add Item"
          rightIcon={<ContentAdd />} />
      </IconMenu>
    );

    return (
      <span className={classes.join(" ")}>
        <ListItem disabled key={item.id} primaryText={item.title} secondaryText={description} rightIcon={icon} />
      </span>
    );
  } else {
    return (
      <Link to={item.link || `/${prefix}/${item.id}`} className={classes.join(" ")}>
        <ListItem key={item.id} primaryText={item.title} secondaryText={description} rightIcon={icon} />
      </Link>
    );
  }
};

export default class DashboardBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { items } = this.props || {items: []};
    let classes = ['DashboardBox'];


    if(!this.props.open) {
      if(items instanceof Map) {
        const items2 = [];
        let limit = 6;

        for(let item of items.keys()) {
          if(limit--) {
            items2.push(items.get(item));
          } else {
            break;
          }
        }

        items = items2;
      } else {
        items = (items || []).slice(0, 6);
      }
    } else {
      classes.push('open');
    }

    if(!this.props.visible) {
      classes.push('display-none');
    }

    let menuItems = [];
    items.forEach((item) => {
      menuItems.push(Item(item, this.props.prefix, this.props.open));
    });

    let staticLink = null;
    if(this.props.prefix === 'menu') {
      staticLink = (
        Item({id: 'library', title: 'Library'}, this.props.prefix, this.props.open)
      );
      menuItems = menuItems.slice(0, 5);
    }

    return (
      <List className={classes.join(' ')}>
        <ListItem
          primaryText={this.props.label}
          disabled
          rightIcon={
            this.props.open
            ? <IconMenu
                menuStyle={{
                  width: 200
                }}
                iconButtonElement={
                  <ActionSettings color="#fff" />
                }>

                <MenuItem
                  primaryText="Create Menu"
                  rightIcon={<ContentAdd />} />
                <MenuItem
                  primaryText="Edit Menu"
                  rightIcon={<EditorModeEdit />} />
                <MenuItem
                  primaryText="Reorder Menus"
                  rightIcon={<ActionSwapVert />} />
                <MenuItem
                  primaryText="Manage Sections"
                  rightIcon={<ActionBuild />} />
              </IconMenu>
            : null
          }
          style={{backgroundColor: Colors.cyan800,  marginTop: -8, color: '#fff'}} />

        <Divider />

        { staticLink }
        { menuItems }
      </List>
    );
  }
}
