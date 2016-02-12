import React from 'react';
import { Link } from 'react-router';
import { MobileTearSheet, List, ListItem } from 'material-ui';

const Item = (item, prefix) => {
  return (
    <Link to={item.link || `/${prefix}/${item.id}`}>
      <ListItem key={item.id} className="DashboardBox-Item" primaryText={item.title} />
    </Link>
  );
};

export default class DashboardBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { items } = this.props || {items: []};
    let classes = ['DashboardBox'];

    if(!this.props.open) {
      items = (items || []).slice(0, 6);
    } else {
      classes.push('open');
    }

    if(!this.props.visible) {
      classes.push('display-none');
    }

    return (
      <List subheader={this.props.label} className={classes.join(' ')}>
        {
          items.map((item) => {
            return Item(item, this.props.prefix);
          })
        }
      </List>
    );
  }
}
