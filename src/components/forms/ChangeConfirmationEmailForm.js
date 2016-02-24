import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { RaisedButton } from 'material-ui';

export class ChangeConfirmationEmailForm extends React.Component {
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
    const btnText = this.props.sendingRequest ? 'Sending request...' : 'Change email';

    return (
      <Formsy.Form onSubmit={this._submit} onValid={this._enableButton} onInvalid={this._disableButton}>
        <DefaultInput name='Email' title='Email' validations='isEmail' validationError='This is not a valid email' required />
        <RaisedButton type="submit" disabled={!this.state.canSubmit} label={btnText} primary={true} />
      </Formsy.Form>
    );
  }
}
