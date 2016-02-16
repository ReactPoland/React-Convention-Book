import React from 'react';
import { ListItem } from 'material-ui';
import { Link } from 'react-router';

function isActiveLink(item) {
  const hash = window.location.hash;
  return hash.includes(item.id);
}

export default function SidenavListItem(props, item, prefix, open) {
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
    icon = props.menuComponent || null;

    return (
      <span key={item.id} className={classes.join(" ")}>
        <ListItem
          disabled
          key={item.id}
          primaryText={item.title}
          secondaryText={description}
          rightIcon={icon} />
      </span>
    );
  } else {
    return (
      <Link key={item.id} to={item.link || `/${prefix}/${item.id}`} className={classes.join(" ")}>
        <ListItem
          key={item.id}
          primaryText={item.title}
          secondaryText={description}
          rightIcon={icon} />
      </Link>
    );
  }
};
