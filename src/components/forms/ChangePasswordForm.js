import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';
import { RaisedButton, Paper } from 'material-ui';

export class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = { canSubmit: false }
    this._submit = this._submit.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this._disableButton = this._disableButton.bind(this);
  }

  _submit(data) {
    this.props.onSubmit(data);
  }

  _enableButton() {
    this.setState({ canSubmit: true });
  }

  _disableButton() {
    this.setState({ canSubmit: false });
  }

  render() {
    return (
      <Formsy.Form onSubmit={this._submit} onValid={this._enableButton} onInvalid={this._disableButton}>
        <Paper style={{padding: 32}}>
          <h3>Change password</h3>
          <DefaultInput name='OldPassword' title='Old Password' type="password" required />
          <DefaultInput name='NewPassword' title='New Password' type="password" required />
          <DefaultInput type='password' title='Repeat password' name='RepeatedPassword' validations='equalsField:NewPassword' validationError='Passwords must match' required />
          <div style={{textAlign: 'center'}}>
            <RaisedButton
              primary={true}
              type='submit'
              disabled={!this.state.canSubmit}
              label={this.props.sendingRequest ? 'Sending request...' : 'Change Password'} />
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}
