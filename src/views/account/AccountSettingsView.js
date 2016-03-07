import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { Snackbar } from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { AccountSettingsForm } from 'components/forms/AccountSettingsForm';
import { ChangePasswordForm } from 'components/forms/ChangePasswordForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

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
      requestSuccess: null,
      requestError: null,
      sendingAccountRequest: false,
      sendingPasswordRequest: false,
    }
    this._updateAccount = this._updateAccount.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  async _updateAccount(formData) {
    this.setState({
      requestSuccess: null,
      requestError: null,
      sendingAccountRequest: true
    });

    console.log('\n#################\nCALL API: UPDATE USER DETAILS\n#################\n');

    this.props.actions.updateUserSettings(formData);

    this.setState({
      requestSuccess: "Successfully updated account details",
      sendingAccountRequest: false
    });
  }

  async _changePassword(formData) {
    this.setState({
      requestSuccess: null,
      requestError: null,
      sendingPasswordRequest: true
    });

    console.log('\n#################\nCALL API: CHANGE PASSWORD\n#################\n');

    this.setState({
      requestSuccess: "Successfully changed password",
      sendingPasswordRequest: false
    });
  }

  nullifyRequestState() {
    this.setState({
      requestSuccess: null,
      requestError: null
    });
  }

  render() {
    const { requestSuccess, requestError } = this.state;

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

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView);
