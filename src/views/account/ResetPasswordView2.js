import React from 'react';
import { Link } from 'react-router';
import { Snackbar, Paper } from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { ResetPasswordForm2 } from 'components/forms/ResetPasswordForm2';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

class ResetPasswordView2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSuccess: null,
      requestError: null,
      sendingRequest: false
    };
    this._changePassword = this._changePassword.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  async _changePassword(formData) {
    this.setState({
      success: null,
      error: null,
      sendingRequest: true
    });

    console.log('\n#################\nCALL API: SEND PASSWORD EMAIL\n#################\n');

    setTimeout(() => {
      this.setState({
        sendingRequest: false,
        requestSuccess: 'Password successfully changed'
      });
    }, 300);
  }

  nullifyRequestState() {
    this.setState({
      requestSuccess: null,
      requestError: null
    });
    this.props.history.pushState(null, '/');
  }

  render() {
    const { requestSuccess, requestError } = this.state;
    return (
      <div id='resetPasswordView2' className="mt100">
        <Paper zDepth={2} className="text-center" style={Styles.paper.small}>
          <h2>Type new password</h2>
          <ResetPasswordForm2 onSubmit={this._changePassword} sendingRequest={this.state.sendingRequest} />
        </Paper>

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default ResetPasswordView2;
