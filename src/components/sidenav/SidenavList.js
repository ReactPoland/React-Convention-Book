import React from 'react';
import { List, Divider } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

import SidenavListItem from './SidenavListItem';

export default class SidenavList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { items, prefix, open } = this.props || {items: []};
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
      menuItems.push(
        SidenavListItem(this.props, item, prefix, open)
      );
    });

    return (
      <List className={classes.join(' ')}>
        {this.props.headerComponent}

        <Divider />

        { this.props.staticItems }
        { menuItems }
        { this.props.children }
      </List>
    );
  }
}
