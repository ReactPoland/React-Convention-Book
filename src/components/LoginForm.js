import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton, Paper } from 'material-ui';
import DefaultInput from './DefaultInput';

export class LoginForm extends React.Component {
  constructor() {
    super();

  }

  _submit(model) {
    console.info("data submited", model);
    this.props.onSubmit(model);
  }

  render() {
    return (
      <Formsy.Form onSubmit={this._submit}>
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Log in</h3>
          <DefaultInput onChange={(newText) => console.info("email"+newText)} name='email' title='Email (admin)' required />
          <DefaultInput onChange={(newText) => console.info("pass"+newText)} type='password' name='password' title='Password (test)' required />


          <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={'Log in'} />
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}