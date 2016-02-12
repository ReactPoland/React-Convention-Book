import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from 'actions/dashboard';
import rolesUtils from 'utils/roles';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
  post: state.post,
  menu: state.menu,
  schedule: state.schedule,
  recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='dashboardView' />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
