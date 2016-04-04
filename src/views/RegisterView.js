"use strict";
import React from 'react';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from 'material-ui';
import { RegisterForm } from '../components/RegisterForm.js';

const mapStateToProps = (state) => ({ 
	...state 
});

const mapDispatchToProps = (dispatch) => ({
});

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  register (model) {
  	alert(JSON.stringify(model));

  }

  render () {
    return (
      <div>
          <h1>Register</h1>
          <div style={{maxWidth: 450, margin: '0 auto'}}>
	          <RegisterForm 
	          	onSubmit={this.register} />
	        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);