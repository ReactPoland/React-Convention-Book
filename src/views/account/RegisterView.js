import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { RegisterForm } from 'components/forms/RegisterForm';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';
import { Snackbar } from 'material-ui';
import Styles from 'styles/inlineStyles';

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
    const error = this.state.error || '';

    return (
      <div id='registerView'>
        {
          !this.state.userRegistered ?
            <div className='form'>
              <RegisterForm
                onSubmit={this.registration}
                sendingRequest={this.state.sendingRequest}
              />
            </div>
          :
            <Snackbar
              bodyStyle={Styles.snackbar.success}
              open={!!this.state.userRegistered}
              message="Registration successful. Check your inbox for verification email" />
        }
        <Snackbar
          open={!!error}
          message={error}
          bodyStyle={Styles.snackbar.error} />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
