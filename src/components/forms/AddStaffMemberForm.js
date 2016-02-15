import React from 'react';
import { Form } from 'formsy-react';
import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';

class AddStaffMemberForm extends React.Component {
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
    if(this.state.canSubmit) {
      this.props.onAddMember(member);
    } else {
      this.setState({
        errorMessage: 'Please fill in all required information.'
      });
    }
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

  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <Form onSubmit={this._onAddStaffMember} onValid={this._enableButton} onInvalid={this._disableButton}>
          <div className="col-md-6">
            <DefaultInput
              name="FirstName"
              title="First Name"
              required
              tabindex="1"
              validations="isAlpha"
              validationError="Invalid first name" />
            <DefaultInput
              name="Email"
              title="Email Address"
              required
              type="email"
              validations="isEmail"
              validationError="Invalid email address"
              tabindex="3" />
            <DefaultInput
              name="Phone"
              title="Telephone Number"
              validations="isNumeric"
              validationError="Invalid telephone number"
              required
              tabindex="5" />
            <DefaultInput
              name="StartDate"
              title="Start Date"
              type="date"
              required
              validations="isExisty"
              validationError="Invalid start date"
              tabindex="7" />
          </div>
          <div className="col-md-6">
            <DefaultInput
              name="LastName"
              title="Last Name"
              required
              validations="isAlpha"
              validationError="Invalid last name"
              tabindex="2" />
            <DefaultInput
              name="ReEmail"
              title="Confirm Email Address"
              required
              validations="equalsField:Email"
              validationError="Emails are different"
              type="email"
              tabindex="4" />
            <DefaultInput
              name="Mailing"
              title="Mailing Address"
              required
              validations="isExisty"
              validationError="Invalid mailing address"
              tabindex="6" />
            <DefaultSelect
              name="Position"
              title="Position"
              placeholder="Position"
              required
              validations="isExisty"
              validationError="Invalid position"
              tabindex="8"
              options={this.props.restaurant.positions} />
          </div>
          <div className="col-md-12">
            <DefaultSelect
              name="Location"
              title="Location"
              placeholder="Location"
              required
              validations="isExisty"
              validationError="Invalid location"
              tabindex="9"
              options={this.props.restaurant.locations} />
            <p className="validation-error">{this.state.errorMessage}</p>
            <button tabIndex="10" type="submit" className="btn btn-default pull-right">Submit</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default AddStaffMemberForm;
