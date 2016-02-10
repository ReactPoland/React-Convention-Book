import React from 'react';
import { Link } from 'react-router';
import { ResetPasswordForm1 } from 'components/forms/ResetPasswordForm1';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

class ResetPasswordView1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      emailSent: false,
      sendingRequest: false
    };
    this._sendResetEmail = this._sendResetEmail.bind(this);
  }

  async _sendResetEmail(formData) {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'post',
      url: '/auth/reset-password',
      data: formData
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      //Display success message
      this.setState({
        emailSent: true,
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
      <div id='resetPasswordView1'>
        {
          !this.state.emailSent ?
            <div className='form'>
              <h1>Reset Password View</h1>
              <ResetPasswordForm1 onSubmit={this._sendResetEmail} sendingRequest={this.state.sendingRequest} />
            </div>
          :
            <h4 className='alert alert-success'>Check your email for reset password link</h4>
        }
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default ResetPasswordView1;
