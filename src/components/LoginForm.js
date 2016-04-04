import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton, Paper } from 'material-ui';
import DefaultInput from './DefaultInput';

export class LoginForm extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Formsy.Form onSubmit={this.props.onSubmit}>
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Log in</h3>
          <DefaultInput onChange={(newText) => console.info("email"+newText)} name='username' title='Username (admin)' required />
          <DefaultInput onChange={(newText) => console.info("pass"+newText)} type='password' name='password' title='Password (123456)' required />
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