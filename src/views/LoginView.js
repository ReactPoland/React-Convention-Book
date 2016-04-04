"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginForm } from '../components/LoginForm.js';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.login = this.login.bind(this);
  }


  async login(credentials) {
    console.info("credentials", credentials);

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


    return;

    // if(tokenRes === "INVALID") {
    //   // login failed, get error msg
    //   let errorRes = await falcorModel.getValue('login.error');
    //   this.setState({error: errorRes, sendingRequest: false});
    //   return;
    // }

    // if(tokenRes) {
    //   let username = await falcorModel.getValue('login.username');
    //   let role = await falcorModel.getValue('login.role');

    //   this.setState({error: "Logged in as "+role});
    //   localStorage.setItem("token", tokenRes);
    //   localStorage.setItem("username", username);
    //   localStorage.setItem("role", role);
    //   sessionStorage.setItem('magicToken', 'magic-login-token');
    //   return;
    // } else {
    //   alert("Fatal login error, please contact an admin");
    // }

    // return; 
  }

  render () {
    return (
      <div>
          <h1>Login view</h1>
          <div style={{maxWidth: 450, margin: '0 auto'}}>
            <LoginForm
              onSubmit={this.login} />
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);