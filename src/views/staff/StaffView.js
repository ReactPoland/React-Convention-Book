import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import StaffTable from 'components/staff/StaffTable';
import Filter from 'components/Filter';

const mapStateToProps = (state) => ({
  session: state.session,
  staff: state.staff
});

class StaffView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredStaff: null
    };
    this._onFilter = this._onFilter.bind(this);
  }

  _onFilter(data) {
    this.setState({filteredStaff: data});
  }

  render() {
    let staff = this.state.filteredStaff || this.props.staff;
    return (
      <div id='staffView'>
        <div className='row'>
          <div className='col-md-12' style={{paddingTop: 10, paddingBottom: 10}}>
            <Filter
              data={this.props.staff}
              filterBy='LastName'
              onFilter={this._onFilter}
              placeholder='Filter last names'
            />
            <Link to='/athlete-invite' className='btn btn-default pull-right'>New client</Link>
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

export default connect(mapStateToProps)(StaffView);
