import React from 'react';
import Formsy from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';

export default class AddStaffMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };

    this._onAddStaffMember = this._onAddStaffMember.bind(this);
    this._disableButton = this._disableButton.bind(this);
    this._enableButton = this._enableButton.bind(this);
  }

  _onAddStaffMember(member) {
    this.props.onAddMember(member);
  }

  _disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  _enableButton() {
    this.setState({
      canSubmit: true
    });
  }

 /*
    TODO:
    - form validation (patterns etc)
    - check if mails match
  */

  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <Formsy.Form onSubmit={this._onAddStaffMember} onValid={this._enableButton} onInvalid={this._disableButton}>
          <div className="col-md-6">
            <DefaultInput name="FirstName" title="First Name" required />
            <DefaultInput name="Email" title="Email Address" required type="email" />
            <DefaultInput name="Phone" title="Telephone Number" required />
            <DefaultInput name="StartDate" title="Start Date" type="date" required />
            {/*

              @P: Here goes one more field but I don't understand what it is about

                  it's called 'Location(s)'

              */}
          </div>
          <div className="col-md-6">
            <DefaultInput name="LastName" title="Last Name" required />
            <DefaultInput name="ReEmail" title="Confirm Email Address" required type="email" />
            <DefaultInput name="Mailing" title="Mailing Address" required />
            <DefaultSelect name="Position" title="Position" required options={this.props.restaurant.availablePositions} />
          </div>
          <button type="submit" disabled={!this.state.canSubmit} className="btn btn-default pull-right">Submit</button>
        </Formsy.Form>
      </div>
    );
  }
}
