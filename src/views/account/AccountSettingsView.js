import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { Snackbar, FlatButton } from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { AccountSettingsForm } from 'components/forms/AccountSettingsForm';
import { ChangePasswordForm } from 'components/forms/ChangePasswordForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

import falcorModel from '../../falcorModel.js';

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
      requestSuccessPaper: null,
      requestErrorPaper: null,
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
      requestSuccessPaper: null,
      requestErrorPaper: null,
      requestSuccess: null,
      requestError: null,
      sendingAccountRequest: true
    });

    console.log('\n#################\nCALL API: UPDATE USER DETAILS\n#################\n');
    
    //this.props.actions.updateUserSettings(formData);    

    let accountResults = await falcorModel
      .call(
            ['profileData', 'update'],
            [formData, this.props.session.user.email]
          ).
      then((result) => {
        return accountResults;
      });

    this.props.session.user.email = await falcorModel.getValue('profileData.newEmail');
    this.props.session.user.firstName = await falcorModel.getValue('profileData.newFirstName');
    this.props.session.user.lastName = await falcorModel.getValue('profileData.newLastName');
    this.props.session.user.imageUrl = await falcorModel.getValue('profileData.newImageUrl');
    
    this.props.actions.updateUserSettings(this.props.session.user); 

    this.setState({
      requestSuccessPaper: "Successfully updated account details",
      requestSuccess: "Successfully updated account details",
      sendingAccountRequest: false
    });
  }

  async _changePassword(formData) {
    this.setState({
      requestSuccessPaper: null,
      requestErrorPaper: null,
      requestSuccess: null,
      requestError: null,
      sendingPasswordRequest: true
    });

    console.log('\n#################\nCALL API: CHANGE PASSWORD\n#################\n');

    let passwordResult = await falcorModel
      .call(
            ['profilePassword', 'change'],
            [formData, this.props.session.user.email]
          ).
      then((result) => {
        return passwordResult;
      });

    let valid = await falcorModel.getValue('profilePassword.validation');

    if (valid){
      this.setState({
        requestSuccessPaper: "Successfully changed password",
        requestSuccess: "Successfully changed password",
        sendingPasswordRequest: false
      });
    }
    else{
      this.setState({
        requestErrorPaper: "Wrong old password",
        requestError: "Wrong old password",
        sendingPasswordRequest: false
      });
    }

    
  }

  nullifyRequestState() {
    this.setState({
      requestSuccessPaper: null,
      requestErrorPaper: null,
      requestSuccess: null,
      requestError: null
    });
  }

  render() {
    const { requestSuccess, requestError } = this.state;
    const { requestSuccessPaper, requestErrorPaper } = this.state;
    
    let modalJSX;
    if(typeof this.state.requestSuccess === 'string') {
      alert(typeof this.state.requestSuccess);
      modalJSX = <h1>
        Successfully updated account details 
        <FlatButton
          label="OK"
          primary={true}
          keyboardFocused={true}
          onTouchTap={() => this.setState.requestSuccess=null}
        />
      </h1>;
      return modalJSX;
    }

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