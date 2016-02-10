import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';

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
        <DefaultInput name='FirstName' title='First Name' validations='isAlphanumeric' validationError='This is not a text' value={this.props.session.user.firstName} />
        <DefaultInput name='LastName' title='Last Name' validations='isAlphanumeric' validationError='This is not a text' value={this.props.session.user.lastName} />
        <DefaultInput name='Email' title='Email' validations='isEmail' validationError='This is not a valid email' value={this.props.session.user.email} />
        <DefaultInput name='ImageURL' title='Image URL' value={this.props.session.user.imageURL} />
        <DefaultSelect name='Gender' title='Gender' value={this.props.session.user.gender} required
          options={[
            { value: 'male', title: 'Male' },
            { value: 'female', title: 'Female' }
          ]}
        />
        <DefaultSelect name='UnitPreference' title='Unit Preference' value={this.props.session.user.unitPreference} required
          options={[
            { value: 'lbs', title: 'lbs' },
            { value: 'kg', title: 'kg' }
          ]}
        />
        <button type='submit' className='btn btn-default' disabled={!this.state.canSubmit}>{this.props.sendingRequest ? 'Sending request...' : 'Save Changes'}</button>
      </Formsy.Form>
    );
  }
}