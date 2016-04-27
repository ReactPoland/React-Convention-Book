import React from 'react';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Phone from 'material-ui/lib/svg-icons/communication/phone';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {
  Paper,
  IconButton,
  Avatar,
  Dialog,
  FlatButton
} from 'material-ui';
import AvatarUpload from 'components/account-settings/AvatarUpload';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadDialogOpen: false,
      edit: false
    };

    this.handleUploadDialogClose = this.handleUploadDialogClose.bind(this);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }
  toggleEdit(){
    this.setState({ edit: true });
    this.props.onEdit();
  }

  handleAvatarClick() {
    this.setState({
      uploadDialogOpen: true
    });
  }

  handleAvatarChange(userData) {
    if (typeof this.props.onImageChange === 'function') {
      this.props.onImageChange(userData);
    }
  }

  handleUploadDialogClose() {
    this.setState({
      uploadDialogOpen: false
    });
  }
  render() {
    let uploadAvatarDialogProps = {
      title: 'Upload an avatar',
      open: this.state.uploadDialogOpen,
      actions: (
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleUploadDialogClose}
        />
      )
    };
    let divStyle={
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      padding: '3%',
      fontSize: '20px'}
    let user = this.props.userData;
    let emailNode=(<span>{user.email}</span>);

    return (
       <div>
        <Paper>
          <div style={divStyle}>
            <div className='row'>
                <div className="col-md-6">
                    <Avatar
                      src={user.imageUrl}
                      size={100}
                      onClick={this.handleAvatarClick}
                    />
                    <div style={{display: 'inline-block', paddingLeft: '20px', position: 'absolute'}}><h3>{user.firstName}<br /> {user.lastName}</h3></div>
                </div>
                <div className="col-md-6" style={{paddingTop: '20px'}}>
                    <div style={{float: 'left'}}>
                    <Email style={{position: 'relative', top: '5px'}}/>{'   ' + user.email}<br />
                    <Phone style={{position: 'relative', top: '5px'}}/>{'   ' + user.phoneNumber}
                    </div>
                </div>
            </div>
            <div className="row" style={{paddingTop: '50px'}}>
                <div className="col-md-6">
                    <p><b>Position:</b><span style={{float: 'right'}}>{user.position}</span></p>
                    <p><b>Location:</b><span style={{float: 'right'}}>{user.location}</span></p>
                </div>
                <div className="col-md-6">
                    <p><b>Address:</b><span style={{float: 'right', width: '50%'}}>{user.address}</span></p>
                </div>
            </div>
          </div>
        </Paper>
        <Dialog {...uploadAvatarDialogProps}>
          <AvatarUpload user={user} category={'avatar'} callback={this.handleAvatarChange} />
        </Dialog>
     </div>);
    }
}
export default UserDetails;
