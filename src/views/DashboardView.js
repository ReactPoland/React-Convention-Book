import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from 'actions/dashboard';

import NewsFeed from 'components/dashboard/NewsFeed';
import MenusBox from 'components/dashboard/MenusBox';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
  post: state.post,
  menu: state.menu
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
      <div id='dashboardView'>
        <div className='row'>
          <h2> Dashboard View </h2>
          <div className="col-md-4">
            <NewsFeed posts={this.props.post.posts} />
          </div>
          <div className="col-md-4">
            <MenusBox menus={this.props.menu.menus} />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
