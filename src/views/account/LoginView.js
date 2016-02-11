import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { LoginForm } from 'components/forms/LoginForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

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

    let response = await axiosHttpRequest(requestObj);

    ///////////////////////// mock
    const {email, password} = credentials;
    if(email == 'admin' && password == 'test') {
      this.props.history.pushState(null, '/dashboard');
      return this.props.actions.login({
        first: 'test',
        last: 'admin',
        role: 'admin',
        token: 'magic-login-token'
      });
    }
    ///////////////////////// endof mock

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch login action
      this.props.actions.login(response.data);
      //Redirect to dashboard
      this.props.history.pushState(null, '/dashboard')
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
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;

    return (
      <div id='loginView'>
        <div className='form'>
          <h1>Log in</h1>
          <LoginForm
            onSubmit={this.login}
            sendingRequest={this.state.sendingRequest}
          />
          <Link to='/reset-password'>Forgot password</Link>
        </div>
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
