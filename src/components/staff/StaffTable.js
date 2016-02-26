import React from 'react';
import { List, Avatar, ListItem, Paper } from 'material-ui';
import { Link } from 'react-router';
import moment from 'moment';

export default class StaffTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <List subheader="Staff members">
          {
            this.props.staff.map((member) => {
              return [
                <ListItem
                  key={member.id}
                  leftAvatar={<Avatar src={member.imageUrl} />}
                  primaryText={member.firstName + ' ' + member.lastName}
                  secondaryText={member.position} />
              ];
            })
          }
        </List>
      </Paper>
    );
  }
}
