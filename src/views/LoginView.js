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
  }
  render () {
    return (
      <div>
          <h1>Login view</h1>
          <div style={{maxWidth: 450, margin: '0 auto'}}>
            <LoginForm
              onSubmit={(model) => alert(JSON.stringify(model))}
              sendingRequest={() => alert("works")} />
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);