import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Formsy from 'formsy-react'

import * as staffActions from 'actions/staff'

// import { axiosHttpRequest } from 'utils/axiosHttpRequest'
import API from 'utils/API';

import { StaffInvitationForm } from 'components/forms/StaffInvitationForm'

const mapStateToProps = (state) => ({
  session: state.session
})

const mapDispatchToProps = (dispatch) => ({
  staffActions: bindActionCreators(staffActions, dispatch)
})

class StaffInvitationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      userInvited: false,
      sendingRequest: false
    }
    this.registration = this.registration.bind(this)
  }

  async registration(credentials) {
    this.setState({
      error: null,
      userInvited: false,
      sendingRequest: true
    })

    let requestObj = {
      method: 'post',
      url: '/v1/trainer/invite-athlete',
      data: credentials
    }

    /*** TEMPORARY ***/
    console.log('credentials', JSON.stringify(credentials, null, 2))
    setTimeout(function() {
      this.setState({
        userInvited: true,
        sendingRequest: false
      })
    }.bind(this), 1000);
    /*****************/

    // let response = await axiosHttpRequest(requestObj)

    /*if (response.status === 201 && response.statusText === 'Created') {
      // Dispatch action
      // this.props.staffActions.addClient(response.data)
      this.setState({
        userInvited: true,
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

  render() {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null,
        successMessage = this.state.userInvited ? <h4 className='alert alert-success'>User invited</h4> : null,
        form = !this.state.userInvited ?
          <div className='form'>
            <h1>Invite Client</h1>
            <StaffInvitationForm onSubmit={this.registration} sendingRequest={this.state.sendingRequest} />
          </div> : null

    return (
      <div id='athleteInvitationView'>
        {form}
        {successMessage}
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffInvitationView)
