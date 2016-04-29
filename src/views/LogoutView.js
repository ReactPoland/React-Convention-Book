"use strict";

import React from 'react';
import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({

});

class LogoutView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(typeof localStorage !== 'undefined' && localStorage.token) {
      delete localStorage.token;
      delete localStorage.username;
      delete localStorage.role;
    }
  }

  render () {
    return (
      <div style={{width: 400, margin: "auto"}}>
        <Paper zDepth={3} style={{padding: 32, margin: 32}}>
          Logout successful.
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);