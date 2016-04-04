"use strict";
import React from 'react';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from 'material-ui';

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

  render () {
    return (
      <div>
          <h1>Register</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);