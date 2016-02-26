import React from 'react'
import Formsy from 'formsy-react'
import { DefaultInput } from './DefaultInput'
import { DefaultSelect } from './DefaultSelect'

export class AthleteRegistrationForm extends React.Component {
  constructor () {
    super()
    this.state = { canSubmit: false }
    this._submit = this._submit.bind(this)
    this._enableButton = this._enableButton.bind(this)
    this._disableButton = this._disableButton.bind(this)
  }

  _submit (data) {
    this._disableButton()
    this.props.onSubmit(data)
  }

  _enableButton () {
    this.setState({ canSubmit: true })
  }

  _disableButton () {
    this.setState({ canSubmit: false })
  }

  render () {
    return (
      <Formsy.Form onSubmit={ this._submit} onValid={ this._enableButton } onInvalid={ this._disableButton }>
        <DefaultInput name='firstName' title='First Name' validations='isAlphanumeric' validationError='This is not a text' value={ this.props.athleteData.firstName } />
        <DefaultInput name='lastName' title='Last Name' validations='isAlphanumeric' validationError='This is not a text' value={ this.props.athleteData.lastName } />
        <DefaultInput name='password' title='Password' validationError="Password can't be blank" required />
        <DefaultInput name='repeatedPassword' title='Repeat password' validations='equalsField:password' validationError='Password must match' required />
        <DefaultInput name='imageURL' title='Image URL' validations='isUrl' validationError='This is not a valid URL' />
        <DefaultSelect name='gender' title='Gender' value={ this.props.athleteData.gender } validations='isAlpha' validationError='Choose one' required
          options={[
            { value: -1, title: '- Choose -'},
            { value: 'male', title: 'Male' },
            { value: 'female', title: 'Female' }
          ]}
        />
        <DefaultSelect name='unitPreference' title='Unit Preference' validations='isAlpha' validationError='Choose one' required
          options={[
            { value: -1, title: '- Choose -'},
            { value: 'lbs', title: 'lbs' },
            { value: 'kg', title: 'kg' }
          ]}
        />
        <button type='submit' className='btn btn-default' disabled={ !this.state.canSubmit}>{this.props.sendingRequest ? 'Registering...' : 'Register' }</button>
      </Formsy.Form>
    )
  }
}

export default AthleteRegistrationForm