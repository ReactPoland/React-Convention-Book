import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import staffActions from '../../actions/staff';
import StaffTable from 'components/staff/StaffTable';
import Filter from 'components/Filter';
import AddStaffMemberForm from 'components/forms/AddStaffMemberForm';
import { bindActionCreators } from 'redux';

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
  }

  _onFilter(data) {
    this.setState({filteredStaff: data});
  }

  onAddMember(member) {

    // :D
    member.status = 200;
    member.statusText = 'OK';
    const response = member;

    if(response.status === 200 && response.statusText === 'OK') {
      response.Id = Math.random();

      this.props.actions.addStaff(response);
      this.setState({
        showAddForm: false
      });
    }
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

    return (
      <div id='staffView'>
        <div className='row'>
          <div className="col-md-7">
            {addForm}
          </div>
          <div className='col-md-12' style={{paddingTop: 10, paddingBottom: 10}}>
            <button
              className="btn btn-default pull-left"
              onClick={this._showForm}
              style={{marginRight: 15}}>
                Add Someone
            </button>

            <Filter
              data={this.props.staff}
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
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);
