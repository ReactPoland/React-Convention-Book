import React from 'react';
import {
  FlatButton,
  Paper,
  IconButton,
  TextField,
  LinearProgress
} from 'material-ui';
import 'aws-sdk/dist/aws-sdk';
import falcorModel from '../../falcorModel.js';

const AWS = window.AWS;

class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);

    // NOTE AWS credentials (remove)
    AWS.config.update({
      accessKeyId: 'AKIAJJR5LB7XHSYBGTCA',
      secretAccessKey: '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'
    });
    AWS.config.region = 'us-west-2';

    this.state = {
      uploading: false,
      error: false,
      uploadMaxFileSizeMB: 5,
      s3: new AWS.S3({
        region: AWS.config.region
      }),
      s3Bucket: 'restaurant-reason-' + this.props.category
    };

    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(file) {
    this.setState({
      uploading: true
    });

    let fileReader = new FileReader();
    let oldAvatarUrl = this.props.user.imageUrl;

    fileReader.addEventListener('load', () => {
      this.props.user.imageUrl = fileReader.result;

      let upload = falcorModel
      .call(
        ['profileData', 'updateAvatar'],
        [
          fileReader.result,
          file.type,
          this.props.user.email
        ]
      )
      .then((result) => {
        if (result === false) {
          this.props.user.imageUrl = oldAvatarUrl;
        }

        this.setState({
          uploading: false,
          error: result === false ? 'Upload error, please try again' : null
        });

        if (typeof this.props.callback === 'function') {
          this.props.callback(this.props.user);
        }
      });
    });

    fileReader.readAsDataURL(file);
  }

  handleAvatarUpload(event) {
    let validationError = null;
    let avatarFile = event.currentTarget.files[0];

    if (avatarFile) {
      let validFile = avatarFile.type.match(/image\/(png|jpe?g)/gm);
      let fileSize = avatarFile.size / 1024 / 1024;

      if (validFile && fileSize <= this.state.uploadMaxFileSizeMB) {
        this.uploadFile(avatarFile);
      } else {
        if (!validFile) {
          validationError = 'File type invalid.';
        } else if (fileSize > this.state.uploadMaxFileSizeMB) {
          validationError = 'Max file size is 5MB';
        }
      }
    } else {
      validationError = 'Error occurred, please try again.';
    }

    if (validationError) {
      this.setState({
        error: validationError,
        uploading: false
      });
    }
  }

  getAvatarUploadProgress() {
    let avatarLinearProgressProps = {
      mode: 'indeterminate',
      style: {
        width: 200
      }
    };

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
  }

  getAvatarPicker() {
    let avatarUploadFieldProps = {
      error: this.state.error,
      type: 'file',
      onChange: this.handleAvatarUpload
    };

    if (!this.state.uploading) {
      return (
        <span>
          <p>Choose a new avatar... (max. file size is 5MB)</p>
          <TextField {...avatarUploadFieldProps} />
        </span>
      );
    }
    return null;
  }

  getDialogProportions() {
    if (this.state.uploading) {
      return {
        left: 'col-md-offset-3 col-md-4',
        right: 'col-md-0'
      };
    } else {
      return {
        left: 'col-md-4',
        right: 'col-md-8'
      };
    }
  }

  render() {
    let avatarPreviewProps = {
      style: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${this.props.user.imageUrl})`,
        backgroundSize: '100% 100%',
        height: 200,
        width: 200
      }
    };

    let dialogProportions = this.getDialogProportions();

    return (
      <div className='container'>
        <div className='row'>
          <div className={dialogProportions.left}>
            <Paper {...avatarPreviewProps} />
            {this.getAvatarUploadProgress()}
          </div>
          <div className={dialogProportions.right}>
            {this.getAvatarPicker()}
          </div>
        </div>
      </div>
    );
  }
};

export default AvatarUpload;

