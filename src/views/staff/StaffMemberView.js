import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as staffActions from 'actions/staff';
import * as dashboardActions from 'actions/dashboard';
// import Chat from 'components/staff/Chat';
// import StaffCalendar from 'components/staff/StaffCalendar';

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
  staff: state.staff
});

const mapDispatchToProps = (dispatch) => ({
  staffActions: bindActionCreators(staffActions, dispatch),
  dashboardActions: bindActionCreators(dashboardActions, dispatch)
});

// const Note = ({date, text, status}) => {
//   let noteDate = new Date(date);
//   return (
//     <div className={status ? ('panel panel-' + status) : 'panel panel-default'}>
//       <div className='panel-heading'>{noteDate.getDate()}-{noteDate.getMonth()}-{noteDate.getFullYear()}</div>
//       <div className={status ? ('panel-body text-' + status) : 'panel-body'}>
//         {text}
//       </div>
//     </div>
//   );
// };

// const Notes = ({notes}) => (
//   <div className='notes'>
//     {notes.length ?
//       notes.map((note, i) => <Note key={i} {...note} />)
//       :
//       <p className='empty'>No notes from Client</p>
//     }
//   </div>
// );

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffObject: {},
      editingClientInfo: false
    };
    this._onEditStart = this._onEditStart.bind(this);
    this._onEditSave = this._onEditSave.bind(this);
    this._onEditCancel = this._onEditCancel.bind(this);
    this._messageSend = this._messageSend.bind(this);
    this._deleteClient = this._deleteClient.bind(this);
    this._onCalendarDayClick = this._onCalendarDayClick.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    // Get staff data from store
    let staff = this.props.staff;
    // Find current client's object
    for (let i = 0, len = staff.length; i < len; i++) {
      if (staff[i].Id === this.props.routeParams.id) {
        // Save it in component's state
        this.setState({staffObject: staff[i]});
        break;
      }
    }
  }

  _onEditStart() {
    // Show inputs
    this.setState({
      editingClientInfo: true
    });
  }

  _onEditSave() {
    // Gather new data
    let editedClient = {
      FirstName: this.editFirstName.value,
      LastName: this.editLastName.value,
      Email: this.editEmail.value
    };
    // Dispatch action
    this.props.staffActions.editClient(this.state.staffObject.Id, editedClient);
    // Update state
    this.setState({
      staffObject: {...this.state.staffObject, ...editedClient}
    });
    // Hide inputs
    this.setState({
      editingClientInfo: false
    });
  }

  _onEditCancel() {
    // Hide inputs
    this.setState({
      editingClientInfo: false
    });
  }

  _messageSend(message) {
    this.props.staffActions.sendMessage(this.state.staffObject.id, message);
  }

  _deleteClient() {
    if (confirm('Are you sure you want to delete ' + this.state.staffObject.FirstName + ' ' + this.state.staffObject.LastName + '?')) {
      this.props.staffActions.deleteClient(this.state.staffObject.Id);
      this.props.history.pushState(null, '/staff');
    }
  }

  _onCalendarDayClick(day) {
    //Dispatch action - save active day into state
    this.props.dashboardActions.setDate(day);
  }

  render() {
    let {FirstName, LastName, Email, notes, chat} = this.state.staffObject;
        // noteDates = notes.map(note => note.date);
    return (
      <div id='clientView'>
        <div className='row'>
          <div className='col-md-12'>
              {!this.state.editingClientInfo ?
                <div className='info static'>
                  {FirstName}
                  {' '}
                  {LastName}
                  {' '}
                  <a href={'mailto:' + Email}>{Email}</a>
                  {' '}
                  <button onClick={this._onEditStart} className='btn btn-default'>Edit</button>
                  <button onClick={this._deleteClient} className='btn btn-default'>Delete</button>
                </div>
                :
                <div className='info editable'>
                  <input type='text' defaultValue={FirstName} ref={node => { this.editFirstName = node; }} required />
                  <input type='text' defaultValue={LastName} ref={node => { this.editLastName = node; }} required />
                  <input type='text' defaultValue={Email} ref={node => { this.editEmail = node; }} required />
                  <button onClick={this._onEditSave} className='btn btn-default'>Save</button>
                  <button onClick={this._onEditCancel} className='btn btn-default'>Cancel</button>
                </div>}
          </div>
        </div>
        {/*<div className='row'>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-12' style={{marginBottom: 10}}>
                <Notes notes={notes} />
              </div>
              <div className='col-md-12'>
                <Chat messages={chat} onMessageSend={this._messageSend} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='calendar'>
              <StaffCalendar onCalendarDayClick={this._onCalendarDayClick} activeDay={this.props.dashboard.date} noteDates={noteDates} />
            </div>
          </div>x
        </div>*/}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
