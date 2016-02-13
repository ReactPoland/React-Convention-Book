import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';
import { Paper, RaisedButton } from 'material-ui';

export class RegisterForm extends React.Component {
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

  render () {
    return (
      <Formsy.Form onSubmit={this._submit} onValid={this._enableButton} onInvalid={this._disableButton}>
        <Paper style={{padding: 32}}>
          <h3>Register</h3>
          <DefaultInput title="First name" name="FirstName" validations="isAlphanumeric" validationError="Display name must be alphanumeric and can't be blank" required/>
          <DefaultInput title="Last name" name="LastName" validations="isAlphanumeric" validationError="Display name must be alphanumeric and can't be blank" required/>
          <DefaultInput title="E-mail" name="Email" validations="isEmail" validationError="This is not a valid email" required/>
          <DefaultSelect title='Gender' name='Gender' value='male' required
            options={[
              { value: 'male', title: 'Male' },
              { value: 'female', title: 'Female' }
            ]}
          />
          <DefaultInput title="Password" type="password" name="Password" validationError="Password can't be blank" required />
          <DefaultInput title="Repeat password" type="password" name="RepeatedPassword" validations="equalsField:Password" validationError="Password must match" required />
          <div style={{textAlign: 'center', marginTop: 25}}>
            <RaisedButton
              type="submit"
              primary={true}
              disabled={!this.state.canSubmit}
              label={this.props.sendingRequest ? 'Sending request...' : 'Register'} />
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}

export default RegisterForm;
