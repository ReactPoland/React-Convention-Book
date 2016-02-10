import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const TableRow = ({Id, FirstName, LastName, Email, CreatedAt, last_workout, next_workout}) => (
  <tr>
    <td><Link to={'/staff/' + Id}>{FirstName} {LastName}</Link></td>
    <td>{Email}</td>
    <td>{moment(CreatedAt).fromNow(true)}</td>
    <td className={last_workout.missed ? 'danger' : '' }>{last_workout.date}</td>
    <td>{next_workout.date}</td>
  </tr>
);

const TableBody = ({staff}) => (
  <tbody>
    {staff.map(client =>
      <TableRow key={client.Id} {...client} />
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
            <th>Email</th>
            <th>User since</th>
            <th>Last Workout</th>
            <th>Next Workout</th>
          </tr>
        </thead>
        <TableBody staff={this.props.staff} />
      </table>
    )
  }
}
