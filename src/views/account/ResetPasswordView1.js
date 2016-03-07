import React from 'react';
import { Link } from 'react-router';
import { Snackbar, Paper } from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { ResetPasswordForm1 } from 'components/forms/ResetPasswordForm1';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

class ResetPasswordView1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestError: null,
      requestSuccess: null,
      emailSent: false,
      sendingRequest: false
    };
    this._sendResetEmail = this._sendResetEmail.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  async _sendResetEmail(formData) {
    this.setState({
      requestError: null,
      requestSuccess: null,
      sendingRequest: true
    });


    console.log('\n#################\nCALL API: SEND PASSWORD EMAIL\n#################\n');

    setTimeout(() => {
      this.setState({
        sendingRequest: false,
        requestSuccess: 'We\'ve sent email to you'
      });
    }, 300);
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
    this.props.history.pushState(null, '/');
  }

  render() {
    const { requestSuccess, requestError } = this.state;

    return (
      <div id='resetPasswordView1' className="mt100">
        <Paper zDepth={2} className="text-center" style={Styles.paper.small}>
          <h2>Reset Password</h2>
          <ResetPasswordForm1 onSubmit={this._sendResetEmail} sendingRequest={this.state.sendingRequest} />
        </Paper>

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default ResetPasswordView1;
