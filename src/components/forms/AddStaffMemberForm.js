import React from 'react';
import { Form } from 'formsy-react';
import { RaisedButton } from 'material-ui';

import { DefaultInput } from './DefaultInput';
import { DefaultSelect } from './DefaultSelect';
import { DefaultDatePicker } from './DefaultDatePicker';
import { DefaultCheckbox } from './DefaultCheckbox';

class AddStaffMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };

    this._onAddStaffMember = this._onAddStaffMember.bind(this);
    this._disableButton = this._disableButton.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleClose(){
    this.props.hideAddForm();
  }

  render() {
    const availableLocations = this.props.restaurant.locations.reduce((a, location) => {
      return a.concat(location.title);
    }, []);

    return (
      <div className="row" style={{marginTop: 20}}>
        <Form onSubmit={this._onAddStaffMember} onValid={this._enableButton} onInvalid={this._disableButton}>
          <div className="col-md-6">

            <DefaultInput
              name="firstName"
              title="First Name"
              required
              tabIndexProp="1"
              validations="isAlpha"
              validationError="Invalid first name" />
            <DefaultInput
              name="email"
              title="Email Address"
              required
              type="email"
              validations="isEmail"
              validationError="Invalid email address"
              tabIndexProp="3" />
            <DefaultInput
              name="phone"
              title="Telephone Number"
              validations="isNumeric"
              validationError="Invalid telephone number"
              required
              tabIndexProp="5" />
            <div style={{paddingTop: 24}}>
              <DefaultDatePicker
                name="startDate"
                autoOk
                hintText="Start Date"
                container="dialog"
                mode="landscape"
                required
                validations="isExisty"
                validationError="Invalid start date"
                tabIndex="7"
                />
            </div>
            <DefaultSelect
              name="location"
              title="Location"
              placeholder="Location"
              required
              validations="isExisty"
              validationError="Invalid location"
              tabindex="9"
              options={availableLocations} />
            <p className="validation-error">{this.state.errorMessage}</p>
          </div>
          <div className="col-md-6">
            <DefaultInput
              name="lastName"
              title="Last Name"
              required
              validations="isAlpha"
              validationError="Invalid last name"
              tabIndexProp="2" />
            <DefaultInput
              name="reEmail"
              title="Confirm Email Address"
              required
              validations="equalsField:email"
              validationError="Emails are different"
              type="email"
              tabIndexProp="4" />
            <DefaultInput
              name="address"
              title="Mailing Address"
              required
              validations="isExisty"
              validationError="Invalid mailing address"
              tabIndexProp="6" />
            <DefaultSelect
              name="position"
              title="Position"
              placeholder="Position"
              required
              validations="isExisty"
              validationError="Invalid position"
              tabindex="8"
              options={this.props.restaurant.positions} />
            <DefaultCheckbox
              name="role"
              label="Administrator"
              defaultChecked={false}
              style={{ position: 'absolute', bottom: '-50px', right: '-80px'}}
               />
          </div>
          <div className="col-md-12">

            <RaisedButton
              disabled={!this.state.canSubmit}
              primary={true}
              style={{float: 'right'}}
              label="Add"
              type="submit"
              tabIndex={10}
              />
            <RaisedButton
              disabled={false}
              secondary={true}
              style={{float: 'right'}}
              label="Cancel"
              onTouchTap={this.handleClose}
              tabIndex={11}
              />
          </div>
        </Form>
      </div>
    );
  }
}

export default AddStaffMemberForm;
