import React from 'react'
import { Link } from 'react-router'

import StaffRegistrationForm from 'components/forms/StaffRegistrationForm'

import {Paper} from 'material-ui';

import falcorModel from '../../../falcorModel.js';


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
    //console.log('token', token)

    /*** TEMPORARY ***/
    //let staffData = { firstName: 'test123', lastName: 'test123', email: 'test123@email.com', gender: 'male' }
    //console.log('GOT staffData', JSON.stringify(staffData, null, 2))
    /****************/

    //this.setState({ staffData: staffData })
  }

  async _acceptIvitation (model, token) {
    this.setState({
      error: null,
      invitationAccepted: false,
      sendingRequest: true
    });

    //alert(JSON.stringify(model));

    let acceptResult = await falcorModel
      .call(
            ['staffRoute', 'accept'],
            [model, this.props.routeParams.token]
          ).
      then((result) => {
        return acceptResult;
      });

    // console.log("acceptResult below");
    // console.log(acceptResult);

    this.setState({
      error: null,
      invitationAccepted: true,
      sendingRequest: false
    });

  }

  render () {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> { this.state.error }</h4> : null,
                
        successMessage = this.state.invitationAccepted ? 
          <div style={{width: 400, margin: "0 auto"}}>
            <Paper zDepth={3} style={{padding: 32, margin: 32}}>
              Invitation accepted
            </Paper>
          </div>
           : null,

        form = !this.state.invitationAccepted ?
          <div style={{width: 500, margin: "0 auto", marginTop: 100}}>
            <StaffRegistrationForm staffData={ this.state.staffData } onSubmit={ this._acceptIvitation } sendingRequest={ this.state.sendingRequest } />
          </div> : null

    return (
      <div>
        { form }
        { successMessage }
        { errorMessage }
      </div>
    )
  }
}

export default StaffRegistrationView
