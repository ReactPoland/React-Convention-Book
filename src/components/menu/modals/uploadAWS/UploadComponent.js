import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from 'actions/dashboard';
import rolesUtils from 'utils/roles';
import { FlatButton, Avatar, Dialog, Paper, IconButton, TextField, LinearProgress } from 'material-ui';
import 'aws-sdk/dist/aws-sdk';

// NOTE AWS SDK is global
const AWS = window.AWS;

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);

    // NOTE AWS credentials
    AWS.config.update({
      accessKeyId: 'AKIAJJR5LB7XHSYBGTCA',
      secretAccessKey: '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'
    });
    AWS.config.region = 'us-west-2';

    this.state = {
      imageUrl: null,
      uploadAvatarDialogOpen: false,

      uploadTextField: {
        file: null,
        error: null
      },
      uploading: false,
      uploadMaxFileSizeMB: 5,

      s3: new AWS.S3({
        region: AWS.config.region
      }),
      s3Bucket: 'restauranttestbucket',

      // TODO Remove when login is fixed
      user: {
        id: new Date().valueOf().toString().substr(3) + Math.floor((Math.random() * 10000)), // <<<<<<<< tutaj propsa podmieniasz
        firstName: 'admin',
        lastName: 'test'
      }
    };
      this.state.imageUrl = this.props.imgUrl;
    // this.state.imageUrl = this.state.s3.getSignedUrl('getObject', {
    //   Bucket: this.state.s3Bucket,
    //   Key: this.state.user.id
    // });
  }
  uploadFile = (file) => {
    let s3 = this.state.s3;
    let params = {
      Bucket: this.state.s3Bucket,
      Key: this.state.user.id,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    };

    this.setState({
      uploading: true
    });

    let fileReader = new FileReader();
    let oldimageUrl = this.state.imageUrl;

    fileReader.addEventListener('load', () => {
      this.setState({
        imageUrl: fileReader.result
      });
      this.setCurrentAWSPicUrl();

      s3.putObject(params, (error, data) => {
        if (error) {
          this.setState({
            imageUrl: oldimageUrl
          });
        }

        this.setState({
          uploading: false,
          uploadTextField: {
            error: error
          }
        });
      });
    });

    fileReader.readAsDataURL(file);
  }

  handleAvatarUpload = (event) => {
    let result = {
      error: null,
      file: null
    };
    let avatarFile = event.currentTarget.files[0];

    if (avatarFile) {
      let validFile = avatarFile.type.match(/image\/(png|jpe?g)/gm);
      let fileSize = avatarFile.size / 1024 / 1024;

      if (validFile && fileSize <= this.state.uploadMaxFileSizeMB) {
        this.uploadFile(avatarFile);
      } else {
        if (!validFile) {
          result.error = 'File type invalid.';
        } else if (fileSize > this.state.uploadMaxFileSizeMB) {
          result.error = 'Max file size is 5MB';
        }
      }
    } else {
      result.error = 'Error occurred, please try again.';
    }

    this.setState({
      uploadTextField: result
    });
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

  setCurrentAWSPicUrl() {
    let url = this.state.user.id;
    this.props.onImgChange(url);
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
