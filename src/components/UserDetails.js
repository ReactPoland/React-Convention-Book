import React from 'react';
import {Avatar} from 'material-ui';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Phone from 'material-ui/lib/svg-icons/communication/phone';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';

class UserDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit(){
    this.setState({ edit: true });
    this.props.onEdit();
  }
  render(){
    let user = this.props.userData;
    return (
      <div>
      <div className='row'>
        <div className='col-md-4'>
          {/*<AccountSettingsForm session={this.props.session} onSubmit={this._updateAccount} sendingRequest={this.state.sendingAccountRequest} />*/}
          <Avatar src={user.imageUrl} size={100} />
          <div style={{display: 'inline-block', margin: '0 30px 0 30px'}}>
            <h3 style={{fontWeight: 'bold'}}>{user.firstName}<br />
                {user.lastName}</h3>
          </div>
        </div>
        <div className='col-md-4' style={{margin: '20px 0 0 0'}}>
        {/*<ChangePasswordForm session={this.props.session} onSubmit={this._changePassword} sendingRequest={this.state.sendingPasswordRequest} />*/}
        <Email /><div style={{verticalAlign: 'super',
          display: 'inline-block',
          fontSize: '20px',
          padding: '0 0 0 10px',
          position: 'absolute',
          right: '0'}}>
          {user.email}
        </div><br />
        <Phone /><div style={{verticalAlign: 'super',
          display: 'inline-block',
          fontSize: '20px',
          padding: '0 0 0 10px',
          position: 'absolute',
          right: '0'}}>
          {user.phoneNumber}
        </div><br />
        <IconButton onClick={this.toggleEdit} style={{width: '25px', padding: '0'}}>
          <Settings />
        </IconButton>
        </div>
      </div>
      <div className='row' style={{padding: '50px 0 0 0'}}>
        <div className='col-md-4'>
          <div style={{display: 'block', fontSize: '20px'}}>
            <b>Position:</b><span style={{position: 'absolute', right: '0'}}>{user.position}</span>
          </div>
          <div style={{display: 'block', fontSize: '20px'}}>
            <b>Location:</b><span style={{position: 'absolute', right: '0'}}>{user.location}</span>
          </div>
        </div>

        <div className='col-md-4'>
        <div style={{display: 'block', fontSize: '20px'}}>
          <b>Address:</b><div style={{position: 'absolute', right: '0', width: '50%', display: 'inline-block'}}>{user.address}</div>
        </div>
        </div>
      </div>
      </div>
      );
    }
}
export default UserDetails
