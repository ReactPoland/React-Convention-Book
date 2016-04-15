 import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton, Paper } from 'material-ui';

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
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Log in</h3>
          <DefaultInput defaultValue="" name='username' title='Username' required />
          <DefaultInput defaultValue="" type='password' name='password' title='Password' required />
          <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              disabled={ false /* !this.state.canSubmit */}
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={this.props.sendingRequest ? 'Logging in...' : 'Log in'} />
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}
