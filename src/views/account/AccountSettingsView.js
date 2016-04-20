import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { Snackbar, FlatButton } from 'material-ui';
import {Paper} from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { AccountSettingsForm } from 'components/forms/AccountSettingsForm';
import { ChangePasswordForm } from 'components/forms/ChangePasswordForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';
import UserDetails from 'components/UserDetails.js';

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
        requestSuccess: "Successfully changed password",
        sendingPasswordRequest: false
      });
    }
    else{
      this.setState({
        requestError: "Wrong old password",
        sendingPasswordRequest: false
      });
    }


  }

  nullifyRequestState() {
    this.setState({
      requestSuccess: null,
      requestError: null
    });
  }

  render() {
    const { requestSuccess, requestError } = this.state;
    let modalJSX;
    if(typeof this.state.requestSuccess === 'string') {
      modalJSX = <div style={{width: 400, margin: "0 auto"}}>
            <Paper zDepth={3} style={{padding: 32, margin: 32}}>
              Successfully updated account details
                 <FlatButton
                    label="OK"
                    primary={true}
                    keyboardFocused={true}
                    style={{float: 'right'}}
                    onTouchTap={() => this.setState({requestSuccess: false})}
                  />
            </Paper>
          </div>;
      return modalJSX;
    }
    if(typeof this.state.requestError === 'string') {
      modalJSX = <div style={{width: 400, margin: "0 auto"}}>
            <Paper zDepth={3} style={{padding: 32, margin: 32}}>
              Wrong Password
                 <FlatButton
                    label="OK"
                    primary={true}
                    keyboardFocused={true}
                    style={{float: 'right', margin: 32}}
                    onTouchTap={() => this.setState({requestError: false})}
                  />
            </Paper>
          </div>;
      return modalJSX;
    }

    return (
      <div id='accountSettingsView'>
        <UserDetails
          userData={this.props.session.user} />
        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView);
