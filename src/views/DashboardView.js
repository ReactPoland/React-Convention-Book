import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from 'actions/dashboard';
import DashboardCalendar from 'components/dashboard/DashboardCalendar';
import DashboardClientNotes from 'components/dashboard/DashboardClientNotes';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
  clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this._onCalendarDayClick = this._onCalendarDayClick.bind(this);
  }

  _onCalendarDayClick(day) {
    //Dispatch action - save active day into state
    this.props.actions.setDate(day);
  }

  render() {
    return (
      <div id='dashboardView'>
        <div className='row'>
          <h2> Dashboard View </h2>
        </div>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
