import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import API from 'utils/API';
import { Paper, FlatButton, Snackbar } from 'material-ui';
import { LoginForm } from 'components/forms/LoginForm';
import Colors from 'material-ui/lib/styles/colors';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

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

    let requestObj = {
      method: 'post',
      url: '/auth/login',
      data: credentials
    }

    let response = await API.post(requestObj);

    ///////////////////////// mock
    const {email, password} = credentials;
    if(email == 'admin' && password == 'test') {
      this.props.history.pushState(null, '/dashboard');
      sessionStorage.setItem('magicToken', 'magic-login-token');
      return this.props.actions.login({
        firstName: 'test',
        lastName: 'admin',
        role: 'admin',
        token: 'magic-login-token'
      });
    }
    ///////////////////////// endof mock

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch login action
      this.props.actions.login(response.data);
      //Redirect to dashboard
      this.props.history.pushState(null, '/dashboard');
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        error: errorMessage,
        sendingRequest: false
      });
    }
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
          bodyStyle={{
            background: Colors.red800
          }}
          onRequestClose={() => {}}
          open={!!this.state.error}
          message={this.state.error} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
