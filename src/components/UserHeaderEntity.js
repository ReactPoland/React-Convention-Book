import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class UserHeaderEntity extends React.Component {
  constructor(props) {
    super(props);
    this._redirect = this._redirect.bind(this);
  }

  _redirect(event, value) {
    switch(value) {
      case 1:
        this.props.history.pushState(null, '/account_settings');
        break;
      case 2:
        this.props.onLogout && this.props.onLogout();
        break;
      default: break;
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="UserEntity">
        <p className="UserEntity-Title">
          {(user.firstName || '') + ' ' + (user.lastName || '')}
          <img className="UserEntity-Pic" alt="" src={user.profilePic} />
        </p>
        <div className="UserEntity-Menu">
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            onChange={this._redirect}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>

            <MenuItem value={1} primaryText="Profile" />
            <MenuItem value={2} primaryText="Log out" />
          </IconMenu>
        </div>
      </div>
    );
  }
}
