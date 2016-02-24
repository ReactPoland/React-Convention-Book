import React from 'react';
import { Link } from 'react-router';
import { Snackbar, Paper, RaisedButton } from 'material-ui';

import Styles from 'styles/inlineStyles';
import API from 'utils/API';

import { ChangeConfirmationEmailForm } from 'components/forms/ChangeConfirmationEmailForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

class ChangeConfirmationEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSuccess: null,
      requestError: null,
      emailSent: false,
      sendingRequest: false
    };
    this._changeEmail = this._changeEmail.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  async _changeEmail(formData) {
    this.setState({
      requestSuccess: null,
      requestError: null,
      sendingRequest: true
    });

    console.log('\n#################\nCALL API: UPDATE USER EMAIL\n#################\n');

    setTimeout(() => {
      this.setState({
        sendingRequest: false,
        requestSuccess: "Email successfully changed"
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
      <div id='changeConfirmationEmailView' className="mt100">
        <Paper zDepth={2} style={Styles.paper.small}>
          <h2>Change confirmation email</h2>
          <ChangeConfirmationEmailForm
            onSubmit={this._changeEmail}
            sendingRequest={this.state.sendingRequest} />
        </Paper>

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default ChangeConfirmationEmailView;
