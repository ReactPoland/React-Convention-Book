import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';

export class LoginForm extends React.Component {
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
        <DefaultInput name='email' title='Email' required />
        <DefaultInput type='password' name='password' title='Password' required />
        <button type='submit' className='btn btn-default' disabled={!this.state.canSubmit}>{this.props.sendingRequest ? 'Logging in...' : 'Log in'}</button>
      </Formsy.Form>
    );
  }
}
