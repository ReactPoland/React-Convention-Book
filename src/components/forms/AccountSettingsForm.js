import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';
import { Paper, RaisedButton } from 'material-ui';

export class AccountSettingsForm extends React.Component {
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
          <h3>Update Account</h3>
          <DefaultInput name='firstName' title='First Name' validations='isAlphanumeric' validationError='This is not a text' value={this.props.session.user.firstName} />
          <DefaultInput name='lastName' title='Last Name' validations='isAlphanumeric' validationError='This is not a text' value={this.props.session.user.lastName} />
          <DefaultInput name='email' title='Email' validations='isEmail' validationError='This is not a valid email' value={this.props.session.user.email} />
          <DefaultInput name='imageUrl' title='Image URL' value={this.props.session.user.imageUrl} />
          <DefaultSelect
            name='gender'
            title='Gender'
            value={this.props.session.user.gender}
            required
            options={[
              { value: 'male', title: 'Male' },
              { value: 'female', title: 'Female' }
            ]} />

          <div style={{textAlign: 'center'}}>
            <RaisedButton
              primary={true}
              type='submit'
              disabled={!this.state.canSubmit}
              label={this.props.sendingRequest ? 'Sending request...' : 'Save Changes'}/>
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}
