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
  let excerpt = null;
  let author = null;
  let date = null;
  let icon = null;

  if(isActive) {
    classes.push("active");
  }

  if(!open) {
    excerpt = item.excerpt;
    author = item.author + ' ';
    date = ' ' + item.date;
  }

  if(open && isActive) {
    icon = props.menuComponent || null;

    return (
      <span key={item.id} className={classes.join(" ")}>
        <ListItem
          disabled
          key={item.id}
          primaryText={item.title}
          secondaryText={<p><span>{excerpt}</span></p>}
          rightIcon={icon} />
      </span>
    );
  } else {
    return (
      <Link key={item.id} to={item.link || `/${prefix}/${item.id}`} className={classes.join(" ")}>
        <ListItem
          key={item.id}
          primaryText={item.title}
          secondaryText={<div style={{display: excerpt ? 'block':'none'}}>
          <span style={{fontSize: '12px'}}>{author}|{date}</span><img
          src="http://lorempixel.com/60/60"
          style={{float: 'right', overflow: 'visible'}}
          /><br />
          {excerpt}
          </div>}
          secondaryTextLines={2}
          rightIcon={icon} />
      </Link>
    );
  }
};
