import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

const mapStateToProps = (state) => ({
  session: state.session
});

class ResendConfirmationEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      emailResend: false,
      sendingRequest: false
    };
    this._onResend = this._onResend.bind(this);
  }

  async _onResend() {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'get',
      url: '/v1/user/resend-verification'
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      this.setState({
        emailResend: true,
        sendingRequest: false
      });
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        error: errorMessage,
        sendingRequest: false
      });
    }
  }

  render() {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;
    return (
      <div>
        {
          !this.state.emailResend ?
            <div className='text-center'>
              <h1>Last verification email has been sent to: <strong>{this.props.session.user.email}</strong></h1>
              <h3>Do you want to re-send it?</h3>
              <button className='btn btn-default' onClick={this._onResend}>{this.state.sendingRequest ? 'Sending email...' : 'Yes, re-send'}</button>
            </div>
          :
            <h4 className='alert alert-success'>New verification email sent</h4>
        }
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResendConfirmationEmailView);
