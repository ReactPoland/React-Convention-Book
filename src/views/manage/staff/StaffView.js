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
    const response = await API.get(
      ['restaurants', 0, 'staff', {from: 0, to: 100}, ['id', 'firstName', 'lastName', 'position', 'verified', 'email', 'imageUrl', 'address']]
    );

    this.props.actions.staffList(response.restaurants[0].staff);
  }

  componentWillMount() {
    this._fetchData();
  }

  _onFilter(data) {
    this.setState({filteredStaff: data});
  }

  onAddMember(member) {
    console.log('\n#################\nCALL API: INVITE STAFF MEMBER\n#################\n');

    API
      .create({
        url: ['usersById'],
        body: member,
        ref: ['restaurants', 0, 'staff']
      })
      .then((response) => {
        this.props.actions.addStaff(new StaffMember(member));
        this.setState({
          requestSuccess: `An account for ${member.firstName} ${member.lastName} has been succesfully created`,
          showAddForm: false
        });
      });
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
            <StaffTable staff={mapHelpers.toArray(staff)} />
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
