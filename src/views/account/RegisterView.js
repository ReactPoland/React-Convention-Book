import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { RegisterForm } from 'components/forms/RegisterForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

class RegisterView extends React.Component {

  static propTypes = {
    actions  : React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userRegistered: false,
      sendingRequest: false
    }
    this.registration = this.registration.bind(this);
  }

  async registration(credentials) {
    this.setState({
      error: null,
      sendingRequest: true
    });

    let requestObj = {
      method: 'post',
      url: '/auth/trainer/register',
      data: credentials
    }

    let response = await axiosHttpRequest(requestObj);

    if (response.status === 201 && response.statusText === 'Created') {
      //Display success message
      this.setState({
        userRegistered: true,
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

  render () {
    let errorMessage = this.state.error ? <h4 className='alert alert-danger'><strong>Error</strong> {this.state.error}</h4> : null;

    return (
      <div id='registerView'>
        {
          !this.state.userRegistered ?
            <div className='form'>
              <h1>Register</h1>
              <RegisterForm
                onSubmit={this.registration}
                sendingRequest={this.state.sendingRequest}
              />
            </div>
          :
            <h4 className='alert alert-success'>Registration successful. Check your inbox for verification email</h4>
        }
        {errorMessage}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
