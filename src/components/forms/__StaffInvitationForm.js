import React from 'react'
import Formsy from 'formsy-react'
import { DefaultInput } from './DefaultInput'
import { DefaultSelect } from './DefaultSelect'

export class StaffInvitationForm extends React.Component {
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
      <Formsy.Form onSubmit={this._submit} onValid={this._enableButton} onInvalid={this._disableButton}>
        <DefaultInput title='First name' name='firstName' validations='isAlphanumeric' validationError="Display name must be alphanumeric and can't be blank" required/>
        <DefaultInput title='Last name' name='lastName' validations='isAlphanumeric' validationError="Display name must be alphanumeric and can't be blank" required/>
        <DefaultInput title='E-mail' name='email' validations='isEmail' validationError='This is not a valid email' required/>
        <DefaultSelect title='Gender' name='gender' validations='isAlpha' validationError='Choose one' required
          options={[
            { value: -1, title: '- Choose -'},
            { value: 'male', title: 'Male' },
            { value: 'female', title: 'Female' }
          ]}
        />
        <button type='submit' className='btn btn-default' disabled={!this.state.canSubmit}>{this.props.sendingRequest ? 'Sending invitation...' : 'Invite'}</button>
      </Formsy.Form>
    )
  }
}

export default StaffInvitationForm
