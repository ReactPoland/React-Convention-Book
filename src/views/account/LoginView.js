import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Paper, FlatButton, Snackbar } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

import API from 'utils/API';
import * as sessionActions from 'actions/session';
import Styles from 'styles/inlineStyles';

import { LoginForm } from 'components/forms/LoginForm';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

const onRequestClose = () => {};
const emptyString = ' ';
class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      sendingRequest: false
    };
    this.login = this.login.bind(this);
  }

  async login(credentials) {
    this.setState({
      error: null,
      sendingRequest: true
    });

    ///////////////////////// mock
    const {email, password} = credentials;
    if(email == 'admin' && password == 'test') {
      this.props.history.pushState(null, '/dashboard');
      const response = await API.get(
        ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']]
      );
      sessionStorage.setItem('magicToken', 'magic-login-token');
      return this.props.actions.login(response.v1.user.me);
    }
    ///////////////////////// endof mock
  }

  render() {
    return (
      <div id='loginView'>
        <div className='form'>
          <LoginForm
            onSubmit={this.login}
            sendingRequest={this.state.sendingRequest} />
          <div style={{textAlign: 'center'}}>
            <Link to='/reset-password' style={{display: 'inline-block', margin: '24px auto'}}>
              <FlatButton label="Forgot password" />
            </Link>
          </div>
        </div>
        <Snackbar
          autohideDuration={5000}
          bodyStyle={Styles.snackbar.error}
          onRequestClose={onRequestClose}
          open={!!this.state.error}
          message={this.state.error || emptyString} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
