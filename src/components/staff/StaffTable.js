import React from 'react';
import { List, Avatar, ListItem, Paper } from 'material-ui';
import { Link } from 'react-router';
import moment from 'moment';

export default class StaffTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // return (
    //   <Paper zDepth={1}>
    //     <List subheader="Staff members">
    //       {
    //         this.props.staff.map((member, index) => {
    //           return [
    //             <ListItem
    //               key={member.id}
    //               leftAvatar={<Avatar src={member.imageUrl} />}
    //               primaryText={member.firstName + ' ' + member.lastName}
    //               secondaryText={member.role} 
    //               onClick={this.props.onStaffMemberClick.bind(this, member)}/>
    //           ];
    //         })
    //       }
    //     </List>
    //   </Paper>
    // );

    return (
      <Paper zDepth={1}>
        <List subheader="Staff members">
          {
            this.props.staff.map((member, index) => {
              // if (member.ownedByRestaurantID == localStorage.restaurantID)//{
              //   console.log(member.firstName + member.lastName)
              // //}
              if (member.ownedByRestaurantID == localStorage.restaurantID)
                return [
                  <ListItem
                    key={member.id}
                    leftAvatar={<Avatar src={member.imageUrl} />}
                    primaryText={member.firstName + ' ' + member.lastName}
                    secondaryText={member.role} 
                    onClick={this.props.onStaffMemberClick.bind(this, member)}/>
                ];
            })
          }
        </List>
      </Paper>
    );
  }
}
