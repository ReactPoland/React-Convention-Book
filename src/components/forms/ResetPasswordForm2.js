import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from '../forms/DefaultInput';

export class ResetPasswordForm2 extends React.Component {
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
        <DefaultInput type='password' title='Password' name='Password' validationError="Password can't be blank" required />
        <DefaultInput type='password' title='Repeat password' name='RepeatedPassword' validations='equalsField:Password' validationError='Passwords must match' required />
        <button type='submit' className='btn btn-default' disabled={!this.state.canSubmit}>{this.props.sendingRequest ? 'Sending request...' : 'Change password'}</button>
      </Formsy.Form>
    );
  }
}
