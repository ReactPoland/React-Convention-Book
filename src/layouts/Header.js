import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import * as dashboardActions from 'actions/dashboard';
import { Link } from 'react-router';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
  dashboardActions: bindActionCreators(dashboardActions, dispatch)
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      sendingRequest: false
    };
    this._handleLogOut = this._handleLogOut.bind(this);
  }

  static propTypes = {
    children : React.PropTypes.element
  }

  async _handleLogOut() {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'post',
      url: '/logout'
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch logout action
      this.props.sessionActions.logout();
      this.props.dashboardActions.resetDate();
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        error: errorMessage + ' (error while logging out)',
        sendingRequest: false
      });
    }
  }

  render () {
    let userIsLogged = this.props.session.loggedIn;
  	let emailIsConfirmed = this.props.session.user.verified;
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;
    //Show different links depending on user log in status
    let links = userIsLogged ?
      <ul className="nav nav-tabs">
        <li><a onClick={this._handleLogOut}>{this.state.sendingRequest ? 'Logging out...' : 'Log out'}</a></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="staff">Staff</Link></li>
        <li><Link to="account_settings">Account Settings</Link></li>
      </ul>
      :
      <ul className="nav nav-tabs">
        <li><Link to="login">Log in</Link></li>
        <li><Link to="register">Register</Link></li>
      </ul>;

    //Show message if user is logged in and didn't confirm email yet
    let isEmailConfirmed = (userIsLogged && !emailIsConfirmed) ?
      <p>
        Please verify your email address |
        <Link to="/resend_confirmation_email">Resend confirmation email</Link> |
        <Link to ="/change_confirmation_email">Change email address</Link>
      </p>
      :
      null;

    return (
      <div>
        <h1>The RestaurantReason Project</h1>
        {isEmailConfirmed}
        {links}
        {errorMessage}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
