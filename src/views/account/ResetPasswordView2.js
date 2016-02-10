import React from 'react';
import { Link } from 'react-router';
import { ResetPasswordForm2 } from 'components/forms/ResetPasswordForm2';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

class ResetPasswordView2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      sendingRequest: false
    };
    this._changePassword = this._changePassword.bind(this);
  }

  async _changePassword(formData) {
    this.setState({
      success: null,
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'post',
      url: '/auth/reset-password/' + this.props.routeParams.token,
      data: {
        Password: formData.Password
      }
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      //Display success message
      this.setState({
        success: 'Password changed',
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
    let successMessage = this.state.success ? <h4 className='alert alert-success'> {this.state.success}</h4> : null,
        errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;

    return (
      <div id='resetPasswordView2'>
        <div className='form'>
          <h1>Input new password</h1>
          <ResetPasswordForm2 onSubmit={this._changePassword} sendingRequest={this.state.sendingRequest} />
        </div>
        {successMessage}
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default ResetPasswordView2;
