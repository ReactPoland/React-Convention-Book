import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from 'actions/dashboard';
import rolesUtils from 'utils/roles';
import { FlatButton, Avatar, Dialog, Paper, IconButton, TextField, LinearProgress } from 'material-ui';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: this.props.imgUrl,
      uploadAvatarDialogOpen: false,

      uploadTextField: {
        file: null,
        error: null
      },
      uploading: false,
      uploadMaxFileSize: 5242880,

      // TODO Remove when login is fixed
      user: {
        id: new Date().valueOf().toString().substr(3) + Math.floor((Math.random() * 10000)), // <<<<<<<< tutaj propsa podmieniasz
        firstName: 'admin',
        lastName: 'test'
      }
    };
    this.state.imageUrl = this.props.imgUrl;
  }

  handleAvatarUpload = (event) => {
    let imageFile = event.currentTarget.files[0];

    if (imageFile) {
      let validFile = imageFile.type.match(/image\/(png|jpe?g)/gm);
      let fileSize = imageFile.size;

      if (validFile && fileSize <= this.state.uploadMaxFileSize) {
        this.setCurrentImage(imageFile);
      } else {
        if (!validFile) {
          result.error = 'File type invalid.';
        } else if (fileSize > this.state.uploadMaxFileSize) {
          result.error = 'Max file size is 5MB';
        }
      }
    } else {
      result.error = 'Error occurred, please try again.';
    }
  }

  handleUploadDialogClose = () => {
    this.setState({
      uploadAvatarDialogOpen: false,
      uploading: false,
      uploadTextField: {
        error: null
      }
    });
  }

  handleAvatarClick = () => {
    this.setState({
      uploadAvatarDialogOpen: true
    });
  }

  setCurrentImage(file) {
    let fileReader = new FileReader();
    let oldImg = this.state.imageUrl;

    fileReader.addEventListener('load', () => {
      this.setState({
        imageUrl: fileReader.result
      });

      if (typeof this.props.onImgChange === 'function') {
        this.props.onImgChange([
          fileReader.result,
          file.type,
          this.props.itemId
        ]);
      }
    });

    fileReader.readAsDataURL(file);
  }

  render() {
    let avatarUploadFieldProps = {
      errorText: this.state.uploadTextField.error,
      type: 'file',
      onChange: this.handleAvatarUpload
    };

    let avatarUploadRightTable = () => {
      if (!this.state.uploading) {
        return (
          <span>
            <p>Choose a new avatar... (max. file size is 5MB)</p>
            <TextField {...avatarUploadFieldProps} />
          </span>
        );
      }
    }();

    let avatarLinearProgressProps = {
      mode: 'indeterminate',
      style: {
        width: 200
      }
    };

    let avatarUploadProgress = () => {
      if (this.state.uploading) {
        return (
          <span>
            <LinearProgress {...avatarLinearProgressProps} />
            <br/>
            Uploading the avatar...
          </span>
        );
      }
      return null;
    }();

    return (
      <div className='row' style={{marginTop: '30px'}}>
        <div className='col-md-4'>
          <img style={{height: '200', width: '200'}} src={this.state.imageUrl} />
        </div>
        <div className='col-md-8'>
          {avatarUploadRightTable}
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);
