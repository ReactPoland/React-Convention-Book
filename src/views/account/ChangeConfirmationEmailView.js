import React from 'react';
import { Link } from 'react-router';
import { ChangeConfirmationEmailForm } from 'components/forms/ChangeConfirmationEmailForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

class ChangeConfirmationEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      emailSent: false,
      sendingRequest: false
    };
    this._changeEmail = this._changeEmail.bind(this);
  }

  async _changeEmail(formData) {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'put',
      url: '/v1/user',
      data: formData
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 200 && response.statusText === 'OK') {
      this.setState({
        emailSent: true,
        sendingRequest: false
      });
    } else {
      //Display error message
      let errorMessage = response.data.error ? response.data.error : response.status + ' ' + response.statusText;
      this.setState({
        error: errorMessage,
        sendingRequest: false
      });
    }
    
  }

  render() {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;
    return (
      <div id='changeConfirmationEmailView'>
        {
          !this.state.emailSent ?
            <div className='form'>
              <h1>Submit new email below</h1>
              <ChangeConfirmationEmailForm
                onSubmit={this._changeEmail}
                sendingRequest={this.state.sendingRequest}
              />
            </div>
          :
            <h4 className='alert alert-success'>Verification email sent</h4>
        }
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default ChangeConfirmationEmailView;
