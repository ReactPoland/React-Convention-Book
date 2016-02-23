import React from 'react'
import { Link } from 'react-router'

// import { axiosHttpRequest } from 'utils/axiosHttpRequest'
import API from 'utils/API';

import StaffRegistrationForm from 'components/forms/StaffRegistrationForm'

class StaffRegistrationView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      invitationAccepted: false,
      staffData: {},
      sendingRequest: false
    }
    this._getStaffData = this._getStaffData.bind(this)
    this._acceptIvitation = this._acceptIvitation.bind(this)
  }

  componentWillMount () {
    this._getStaffData(this.props.routeParams.token)
  }

  async _getStaffData (token) {
    console.log('token', token)
    let requestObj = {
      method: 'GET',
      url: '/auth/athlete/invitation/' + token + '/data'
    }

    /*** TEMPORARY ***/
    let staffData = { firstName: 'test123', lastName: 'test123', email: 'test123@email.com', gender: 'male' }
    console.log('GOT staffData', JSON.stringify(staffData, null, 2))
    /****************/

    this.setState({ staffData: staffData })
  }

  async _acceptIvitation (staffData) {
    this.setState({
      error: null,
      invitationAccepted: false,
      sendingRequest: true
    })

    let requestObj = {
      method: 'POST',
      url: '/auth/athlete/invitation/' + this.props.routeParams.token + '/accept',
      data: staffData
    }

    /*** TEMPORARY ***/
    console.log('SENDING staffData', JSON.stringify(staffData, null, 2))
    setTimeout(() => { this.setState({ invitationAccepted: true, sendingRequest: false }) }.bind(this), 1000)
    /****************/

    // let response = await axiosHttpRequest(requestObj)

    /*if (response.status === 201 && response.statusText === 'Created') {
      this.setState({
        invitationAccepted: true,
        sendingRequest: false
      })
    } else {
      // Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText
      this.setState({
        error: errorMessage,
        sendingRequest: false
      })
    }*/
  }

  render () {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> { this.state.error }</h4> : null,
        successMessage = this.state.invitationAccepted ? <h4 className='alert alert-success'>Invitation accepted</h4> : null,
        form = !this.state.invitationAccepted ?
          <div className='form'>
            <h1>Submit this form to accept invitation</h1>
            <StaffRegistrationForm staffData={ this.state.staffData } onSubmit={ this._acceptIvitation } sendingRequest={ this.state.sendingRequest } />
          </div> : null

    return (
      <div id='registerView'>
        { form }
        { successMessage }
        { errorMessage }
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default StaffRegistrationView
