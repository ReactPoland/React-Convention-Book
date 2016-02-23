import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
// import { axiosHttpRequest } from 'utils/axiosHttpRequest';
import API from 'utils/API';

import { FlatButton, AppBar } from 'material-ui';
import UserHeaderEntity from 'components/UserHeaderEntity';
import Colors from 'material-ui/lib/styles/colors';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
  // dashboardActions: bindActionCreators(dashboardActions, dispatch)
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

    let response = await API.post(requestObj);

    ////// mock
    this.props.sessionActions.logout();
    delete sessionStorage.magicToken;
    ////// endof mock

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch logout action
      this.props.sessionActions.logout();
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
    const {user} = this.props.session;
    let userIsLogged = this.props.session.loggedIn;
  	let emailIsConfirmed = this.props.session.user.verified;
    let errorMessage = this.state.error ? <h4 className="UserEntity-Error" style={{color: Colors.red300}}><strong>Error</strong> {this.state.error}</h4> : null;
    let link = '/';

    //Show different links depending on user log in status
    let userEntity = (
      <ul style={{listStyle: 'none'}} className="UserEntity-LoginBtns">
        <li style={{display: 'inline-block', marginTop: 9}}>
          <Link to="/login"><FlatButton label="Login" /></Link>
        </li>
        <li style={{display: 'inline-block', marginTop: 9}}>
          <Link to="/register"><FlatButton label="Sign Up" /></Link>
        </li>
      </ul>
    );

    if(userIsLogged) {
      link = '/dashboard';
      userEntity = (
        <UserHeaderEntity user={user} onLogout={this._handleLogOut} history={this.props.history} />
      );
    }


    return (
      <AppBar
        className="MainHeader"
        title={
          <h1 className="MainHeader-Title">
            <Link to={link}>The Restaurant Reason</Link>
          </h1>
        }
        iconClassNameLeft="display-none"
        iconElementRight={errorMessage || userEntity}>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
