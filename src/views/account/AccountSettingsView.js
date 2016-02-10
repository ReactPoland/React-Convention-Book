import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { AccountSettingsForm } from 'components/forms/AccountSettingsForm';
import { ChangePasswordForm } from 'components/forms/ChangePasswordForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

class AccountSettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountSuccess: null,
      accountError: null,
      passwordError: null,
      sendingAccountRequest: false,
      sendingPasswordRequest: false,
    }
    this._updateAccount = this._updateAccount.bind(this);
    this._changePassword = this._changePassword.bind(this);
  }

  async _updateAccount(formData) {
    this.setState({
      accountSuccess: null,
      accountError: null,
      sendingAccountRequest: true
    });

    let requestObj = {
      method: 'put',
      url: '/v1/user',
      data: formData
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch updateUserSettings action
      this.props.actions.updateUserSettings(response.data);
      //Display success message
      this.setState({
        accountSuccess: 'Account updated',
        sendingAccountRequest: false
      });
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        accountError: errorMessage,
        sendingAccountRequest: false
      });
    }
  }

  async _changePassword(formData) {
    this.setState({
      passwordSuccess: null,
      passwordError: null,
      sendingPasswordRequest: true
    });

    let requestObj = {
      method: 'post',
      url: '/v1/user/change-password',
      data: formData
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      //Dispatch updateUserSettings action
      this.props.actions.updateUserSettings(response.data);
      //Display success message
      this.setState({
        passwordSuccess: 'Password changed',
        sendingPasswordRequest: false
      });
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        passwordError: errorMessage,
        sendingPasswordRequest: false
      });
    }
  }

  render() {
    let accountSuccessMessage = this.state.accountSuccess ? <h4 className='alert alert-success'>{this.state.accountSuccess}</h4> : null;
    let passwordSuccessMessage = this.state.passwordSuccess ? <h4 className='alert alert-success'>{this.state.passwordSuccess}</h4> : null;
    let accountErrorMessage = this.state.accountError ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.accountError}</h4> : null;
    let passwordErrorMessage = this.state.passwordError ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.passwordError}</h4> : null;

    return (
      <div id='accountSettingsView'>
        <div className='row'>
          <div className='col-md-6'>
            <h1>Update Account</h1>
            <AccountSettingsForm session={this.props.session} onSubmit={this._updateAccount} sendingRequest={this.state.sendingAccountRequest} />
            {accountSuccessMessage}
            {accountErrorMessage}
          </div>
          <div className='col-md-6'>
            <h1>Change Password</h1>
            <ChangePasswordForm session={this.props.session} onSubmit={this._changePassword} sendingRequest={this.state.sendingPasswordRequest} />
            {passwordSuccessMessage}
            {passwordErrorMessage}
          </div>
        </div>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView);
