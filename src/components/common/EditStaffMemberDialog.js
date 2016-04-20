import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

import { Form } from 'formsy-react';
import { DefaultInput } from 'components/forms/DefaultInput';
import { DefaultDatePicker } from 'components/forms/DefaultDatePicker';
import { DefaultSelect } from 'components/forms/DefaultSelect';
import { DefaultCheckbox } from 'components/forms/DefaultCheckbox';

export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      canSubmit: false
    };

    this._onEditStaffMember = this._onEditStaffMember.bind(this);
    this._disableButton = this._disableButton.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
    console.log("nullifyRequestState");
    console.log(this.props.nullifyRequestState);
    this.props.nullifyRequestState();
  }

  _onEditStaffMember(member) {
    console.log("--------------------");
    console.log("member to edit DIALOGDIALOGDIALOG");
    console.log(member);
    console.log("member to edit");
    console.log("--------------------");
    this.props.onEditMember(member);
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
    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     secondary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <FlatButton
    //     label="Submit"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this.handleClose}
    //   />,
    // ];

    console.log("RENDER DIALOG: ");
    console.log(this.props.memberToEdit);
    const memberToEdit = this.props.memberToEdit;

    const availableLocations = this.props.restaurant.locations.reduce((a, location) => {
      return a.concat(location.title);
    }, []);

    return (
      <div>
        <Dialog
          title="Edit a member"
          //actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className="row" style={{marginTop: 20}}>
            <Form onSubmit={this._onEditStaffMember} onValid={this._enableButton} onInvalid={this._disableButton}>
              <div className="col-md-6">
                <DefaultInput
                  name="firstName"
                  title="First Name"
                  defaultValue={memberToEdit.firstName}
                  tabindex="1"
                  validations="isAlpha"
                  validationError="Invalid first name" />
                <DefaultInput
                  name="email"
                  title="Email Address"
                  defaultValue={memberToEdit.email}
                  type="email"
                  validations="isEmail"
                  validationError="Invalid email address"
                  tabindex="3" />
                
                
              </div>
              <div className="col-md-6">
                <DefaultInput
                  name="lastName"
                  title="Last Name"
                  defaultValue={memberToEdit.lastName}
                  validations="isAlpha"
                  validationError="Invalid last name"
                  tabindex="2" />
                <DefaultInput
                  name="reEmail"
                  title="Confirm Email Address"
                  defaultValue={memberToEdit.email}
                  validations="equalsField:email"
                  validationError="Emails are different"
                  type="email"
                  tabindex="4" />
                <DefaultInput
                  name="address"
                  title="Mailing Address"
                  defaultValue={memberToEdit.address}
                  //validations="isExisty"
                  //validationError="Invalid mailing address"
                  tabindex="6" />
                
                <DefaultSelect
                  name="position"
                  title="Position"
                  placeholder="Position"
                  defaultValue="test"
                  validations="isExisty"
                  validationError="Invalid position"
                  tabindex="8"
                  options={this.props.restaurant.positions} />
              </div>
              <div className="col-md-12">
                <DefaultSelect
                  name="location"
                  title="Location"
                  placeholder="Location"
                  validations="isExisty"
                  validationError="Invalid location"
                  tabindex="9"
                  options={availableLocations} />
                <p className="validation-error">{//this.state.errorMessage
                  false}</p>

                <DefaultCheckbox
                  name="active"
                  label="Active"
                  defaultChecked={memberToEdit.active}
                  //onCheck={(e, checked) => active.onChange(checked)}
                  //onCheck={(e, checked) => alert(checked)}
                />

                <RaisedButton
                  disabled={!this.state.canSubmit}
                  primary={true}
                  style={{float: 'right'}}
                  label="Update"
                  type="submit"
                  tabIndex={10} />

                  <RaisedButton
                  disabled={false}
                  secondary={true}
                  style={{float: 'right'}}
                  label="Cancel"
                  onTouchTap={this.handleClose}
                  tabIndex={10} />
              </div>
            </Form>
          </div>





        </Dialog>
      </div>
    );
  }
}