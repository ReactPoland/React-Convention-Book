import React from 'react';
import 'styles/core.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';
import Header from './Header';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch)
});

const whiteList = ['home', 'login', 'register', 'reset-password1', 'reset-password2', 'token-not-found', 'athlete-register'];

class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);
    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
    this._checkChildName = this._checkChildName.bind(this);
  }

  async _checkIfLoggedIn() {
    let requestObj = {
      method: 'get',
      url: '/v1/user/me'
    }

    let response = await axiosHttpRequest(requestObj);

    /////////// mock

    /////////// endof mock

    if (response.status === 200 && response.statusText === 'OK') {
      this.props.sessionActions.login(response.data);
    } else {
      this.props.history.pushState(null, '/login')
    }
  }

  _checkChildName(names) {
    let childName = this.props.children.props.route.name;
    for (let i = 0; i < names.length; i++) {
      if (childName === names[i]) {
        return true;
      }
    }
  }

  render () {
    if (this.props.session.loggedIn || this._checkChildName(whiteList)) {
      return (<div className="container">
              <Header history={this.props.history} />
              {this.props.children}
            </div>);
    } else {
      this._checkIfLoggedIn();
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
