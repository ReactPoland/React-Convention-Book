import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton, Paper, TextField } from 'material-ui';

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = { canSubmit: false }
    this._submit = this._submit.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this._disableButton = this._disableButton.bind(this);
  }

  _submit(data) {
    console.info("data submited", data);

  }

  _enableButton() {
    this.setState({ canSubmit: true });
  }

  _disableButton() {
    this.setState({ canSubmit: false });
  }

  render() {
    let JSXtoReturn = (
      <Formsy.Form onSubmit={this._submit} onValid={this._enableButton} onInvalid={this._disableButton}>
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Log in</h3>
          <div>
            <TextField
              floatingLabelText='Email (admin)'
              ref='email'
              name='email' 
              required={true} />
          </div>
          <div>
            <TextField
              floatingLabelText='Password (test)'
              ref='password'
              name='password' 
              type='password' 
              required={true} />
          </div>


          <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              disabled={!this.state.canSubmit}
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={this.props.sendingRequest ? 'Logging in...' : 'Log in'} />
          </div>
        </Paper>
      </Formsy.Form>
    );

    return JSXtoReturn;
  }
}