import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';

import staffActions from 'actions/staff';
import API from 'utils/API';
import mapHelpers from 'utils/mapHelpers';

import Filter from 'components/Filter';
import StaffTable from 'components/staff/StaffTable';
import AddStaffMemberForm from 'components/forms/AddStaffMemberForm';

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
    this._showSuccess = this._showSuccess.bind(this);
  }

  _onFilter(data) {
    this.setState({filteredStaff: data});
  }

  onAddMember(member) {
    const response = member;

    console.log('\n#################\nCALL API: INVITE STAFF MEMBER\n#################\n');

    response.Id = Math.random();

    this.props.actions.addStaff(response);
    this._showSuccess(member);
    this.setState({
      showAddForm: false
    });
  }

  _showSuccess({FirstName = "", LastName = ""}) {
    this.setState({
      successMessage: `An account for ${FirstName} ${LastName} has been succesfully created`
    }, () => {
      setTimeout(() => {
        this.setState({
          successMessage: ''
        });
      }, 10000);
    });
  }

  _showForm() {
    this.setState({
      showAddForm: true
    });
  }

  render() {
    let staff = this.state.filteredStaff || this.props.staff;
    let addForm = null;
    if(this.state.showAddForm) {
      addForm = (
        <AddStaffMemberForm
          restaurant={this.props.restaurant}
          onAddMember={this.onAddMember} />
      );
    }

    let successBox = null;
    if(this.state.successMessage) {
      successBox = (
        <p className="alert alert-success">{this.state.successMessage}</p>
      );
    }

    return (
      <div id='staffView' className="mt100 Content">
        <div className='row'>
          <div className="col-md-7">
            {successBox}
            {addForm}
          </div>
          <div className='col-md-12' style={{paddingTop: 10, paddingBottom: 10}}>
            <RaisedButton
              onClick={this._showForm}
              primary={true}
              style={{float: 'left', marginRight: 15}}
              label={"Add Someone"} />

            <Filter
              data={mapHelpers.toArray(this.props.staff)}
              filterBy='LastName'
              onFilter={this._onFilter}
              placeholder='Filter last names'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <StaffTable staff={staff} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);
