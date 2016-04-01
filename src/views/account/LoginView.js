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

import falcorModel from '../../falcorModel.js';

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

  componentDidMount() {
    if(localStorage.token) {
      this.props.history.pushState(null, '/dashboard');
    }
    // ///////////////////////// mock
    // if(localStorage.token) {
    //   this.props.history.pushState(null, '/dashboard');
    //   // API.get(
    //   //   ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']]
    //   // ).then((result) => {
    //   //   this.props.actions.login(response.v1.user.me);
    //     ///////////////////////// endof mock
    //   // });
    // }
  }

  async login(credentials) {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let loginResult = await falcorModel
      .call(
            ['login'],
            [credentials]
          ).
      then((result) => {
        return loginResult;
      });

    let tokenRes = await falcorModel.getValue('login.token');

    console.info("tokenRes", tokenRes);
    console.info("tokenRes", tokenRes);
    console.info("tokenRes", tokenRes);


    if(tokenRes === "INVALID") {
      // login failed, get error msg
      let errorRes = await falcorModel.getValue('login.error');
      this.setState({error: errorRes, sendingRequest: false});
      setTimeout(() => this.setState({error: null}), 3000);
      return;
    }

    if(tokenRes) {
      let username = await falcorModel.getValue('login.username');
      let role = await falcorModel.getValue('login.role');

      this.setState({error: "Logged in as "+role});
      localStorage.setItem("token", tokenRes);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      sessionStorage.setItem('magicToken', 'magic-login-token');
      // window.location.href = "/#/dashboard";
      location.reload();
      setTimeout(() => this.setState({error: null, sendingRequest: false}), 3000);
      return;
      // ///////////////////////// mock
      // this.props.history.pushState(null, '/dashboard');
      // const response = await API.get(
      //   ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']]
      // );
      // sessionStorage.setItem('magicToken', 'magic-login-token');
      // this.props.actions.login(response.v1.user.me);
      // ///////////////////////// endof mock

    } else {
      alert("Fatal login error, please contact an admin");
    }

    return; 
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
            <Link to='/dashboard' style={{display: 'inline-block', margin: '24px auto'}}>
              <FlatButton label="Dashboard" />
            </Link>
          </div>
        </div>
        <Snackbar
          autoHideDuration={50}
          bodyStyle={Styles.snackbar.error}
          onRequestClose={onRequestClose}
          open={!!this.state.error}
          message={this.state.error || emptyString} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
