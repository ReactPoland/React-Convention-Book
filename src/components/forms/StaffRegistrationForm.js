import React from 'react'
import Formsy from 'formsy-react'
import { DefaultInput } from './DefaultInput'
import { RaisedButton, Paper } from 'material-ui';

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
    console.info(this.props.onSubmit)
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
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Set your new password</h3>
          <DefaultInput defaultValue="" type='password' name='password' title='Password' required />
          <DefaultInput defaultValue="" type='password' name='repeated_password' title='Repeat Password' required  validations="equalsField:password" validationError="Passwords are different"/>
          <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              disabled={ !this.state.canSubmit }
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={'Set password'} />
          </div>
        </Paper>
      </Formsy.Form>
    )
  }
}

export default AthleteRegistrationForm