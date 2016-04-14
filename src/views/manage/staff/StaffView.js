import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';

import staffActions from 'actions/staff';
import API from 'utils/API';
import mapHelpers from 'utils/mapHelpers';
import { StaffMember } from 'models';

import Filter from 'components/Filter';
import StaffTable from 'components/staff/StaffTable';
import AddStaffMemberForm from 'components/forms/AddStaffMemberForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

import falcorModel from '../../../falcorModel.js';

const mapStateToProps = (state) => ({
  session: state.session,
  staff: state.staff,
  restaurant: state.restaurant
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(staffActions, dispatch)
});

class StaffView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredStaff: null,
      showAddForm: false
    };
    this._onFilter = this._onFilter.bind(this);
    this.onAddMember = this.onAddMember.bind(this);
    this._showForm = this._showForm.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);

  }

  async _fetchData() {
    //let staffLength =  100;// TO-DO unmock this later

    const staffLength = await falcorModel.getValue(
      ['staffRoute','length']
    );

    let displayAllResults = await falcorModel.get(['staffRoute', {from: 0, to: staffLength}]);
    let displayAll = displayAllResults.json.staffRoute;
    ///////////////////// mocking below
    displayAll = Object.keys(displayAll).map((index) => {
      let userItem = displayAll[index];
      if (typeof userItem.address === "undefined")
        userItem.address = "none";
      if (typeof userItem.location === "undefined")
        userItem.location = "none";
      userItem.id = userItem._id.toString();
      delete userItem._id;
      return userItem;
    });
    /////////////////////

    this.props.actions.staffList(displayAll)
  }

  async componentWillMount() {
      this._fetchData();
  }

  _onFilter(data) {
    this.setState({filteredStaff: data});
    
  }

  async onAddMember(member) {
    console.log('\n#################\nCALL API: INVITE STAFF MEMBER\n#################\n');
    // TODO unmock in future
    member.imageUrl = "http://lorempixel.com/200/300/people"; 
    
    console.info("member", member);
    member.position = "staff";

    let newUserID = await falcorModel
      .call(
            ['staffRoute', 'add'],
            [member]
          ).
      then((result) => {

        return falcorModel.getValue(['staffRoute', 'newUserID']);

      });
    member.id = newUserID;
    this.props.actions.addStaff(new StaffMember(member));

    let emailWelcomeMessage = await falcorModel
      .call(
            ['emailWelcomeMessage'],
            [member]
          ).
      then((result) => {
        return falcorModel.getValue(['emailWelcomeMessage']);
      });

    this.setState({
      requestSuccess: `An account for ${member.firstName} ${member.lastName} has been succesfully created - ${emailWelcomeMessage}`,
      showAddForm: false
    });
  }

  async _onStaffMemberClick(member) {
    alert("_onStaffMemberClick")
  }

  _showForm() {
    this.setState({
      showAddForm: true
    });
    API.$log()
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
  }

  render() {
    const { requestSuccess, requestError } = this.state;
    const staff = this.state.filteredStaff || this.props.staff;
    let addForm = null;
    if(this.state.showAddForm) {
      addForm = (
        <AddStaffMemberForm
          restaurant={this.props.restaurant}
          onAddMember={this.onAddMember} />
      );
    }

    return (
      <div id='staffView' className="mt100 Content">
        <div className='row'>
          <div className="col-md-7">
            {addForm}
          </div>
          <div className='col-md-12' style={{paddingTop: 10, paddingBottom: 10}}>
            <RaisedButton
              onClick={this._showForm}
              primary={true}
              style={{float: 'left', marginRight: 15}}
              label={"Add Someone"} />

            <Filter
              style={{marginTop: -27}}
              data={mapHelpers.toArray(this.props.staff)}
              filterBy='lastName'
              onFilter={this._onFilter}
              placeholder='Filter last names'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <StaffTable staff={mapHelpers.toArray(staff)} onStaffMemberClick={this._onStaffMemberClick} />
          </div>
        </div>

        <ErrorSuccessMsg
          successMessage={requestSuccess}
          errorMessage={requestError}
          onRequestClose={this.nullifyRequestState} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);