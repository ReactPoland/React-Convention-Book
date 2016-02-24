import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Snackbar, Paper, RaisedButton } from 'material-ui';

import Styles from 'styles/inlineStyles';
import API from 'utils/API';

import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

const mapStateToProps = (state) => ({
  session: state.session
});

const paperStyles = {
  margin: '0 auto',
  maxWidth: 400,
  padding: 32
};

class ResendConfirmationEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailResend: false,
      sendingRequest: false
    };

    this._onResend = this._onResend.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  async _onResend() {
    this.setState({
      requestError: null,
      sendingRequest: true
    });

    console.log('\n#################\nCALL API: RESEND EMAIL\n#################\n');

    setTimeout(() => {
      this.setState({
        sendingRequest: false,
        requestSuccess: 'Email sent'
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
    let currentEmail = '';

    try {
      currentEmail = this.props.session.user.email;
    } catch(e) {};

    return (
      <div id="resendConfirmationEmailView" className="mt100">
        <Paper zDepth={2} className="text-center" style={Styles.paper.small}>
          <h2>Resend confirmation email</h2>
          <p>Last verification email has been sent to: <strong>{currentEmail}</strong></p>
          <p>Do you want to re-send it?</p>
          <RaisedButton primary={true} onClick={this._onResend} label={btnText} />
        </Paper>

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResendConfirmationEmailView);
