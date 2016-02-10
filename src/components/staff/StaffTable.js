import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const TableRow = ({Id, FirstName, LastName, Email, Position}) => (
  <tr>
    <td>{FirstName} {LastName}</td>
    <td>{Position}</td>
    <td><Link to={'/staff/' + Id}>profile</Link></td>
  </tr>
);

const TableBody = ({staff}) => (
  <tbody>
    {staff.map(staffMember =>
      <TableRow key={staffMember.Id} {...staffMember} />
    )}
  </tbody>
);

export default class StaffTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Profile</th>
          </tr>
        </thead>
        <TableBody staff={this.props.staff} />
      </table>
    )
  }
}
