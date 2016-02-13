import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { AccountSettingsForm } from 'components/forms/AccountSettingsForm';
import { ChangePasswordForm } from 'components/forms/ChangePasswordForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';
import { Snackbar } from 'material-ui';
import Styles from 'styles/inlineStyles';

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
    const successMessage = this.state.accountSuccess || this.state.passwordSuccess;
    const errorMessage = this.state.passwordError || this.state.accountError;

    return (
      <div id='accountSettingsView'>
        <div className='row-fluid'>
          <div className='col-md-6'>
            <AccountSettingsForm session={this.props.session} onSubmit={this._updateAccount} sendingRequest={this.state.sendingAccountRequest} />
          </div>
          <div className='col-md-6'>
            <ChangePasswordForm session={this.props.session} onSubmit={this._changePassword} sendingRequest={this.state.sendingPasswordRequest} />
          </div>
        </div>
        <Snackbar
          open={!!successMessage}
          message={successMessage}
          bodyStyle={Styles.snackbar.success}
          autoHideDuration={5000} />
        <Snackbar
          open={!!errorMessage}
          message={errorMessage}
          autoHideDuration={5000}
          bodyStyle={Styles.snackbar.error} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView);
