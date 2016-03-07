import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { Link } from 'react-router';
import { Snackbar } from 'material-ui';

import API from 'utils/API';
import Styles from 'styles/inlineStyles';

import { RegisterForm } from 'components/forms/RegisterForm';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

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
      userRegistered: false,
      sendingRequest: false
    }
    this.registration = this.registration.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
    this.props.history.pushState(null, '/');
  }

  async registration(credentials) {
    this.setState({
      requestError: null,
      sendingRequest: true
    });

    console.log('\n#################\nCALL API: REGISTER NEW USER\n#################\n');


    setTimeout(() => {
      this.setState({
        sendingRequest: false,
        requestSuccess: 'You\'ve been successfully registered. Check your inbox'
      });
    }, 300);
  }

  render () {
    const { requestError, requestSuccess } = this.state;

    return (
      <div id='registerView' className="mt100">
        <div className='form'>
          <RegisterForm
            onSubmit={this.registration}
            sendingRequest={this.state.sendingRequest}
          />
        </div>

        <ErrorSuccessMsg
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
