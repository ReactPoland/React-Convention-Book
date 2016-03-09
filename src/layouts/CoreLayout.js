import React from 'react';
import 'styles/core.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import API from 'utils/API';
import Header from './Header';
import { Link } from 'react-router';

import { Paper, FlatButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import AlertWarning from 'material-ui/lib/svg-icons/alert/warning';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SideNav from './SideNav';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch)
});

const whiteList = [
  'home', 'login', 'register', 'reset-password1',
  'reset-password2', 'token-not-found'
];
const fullWidth = whiteList.concat([
  'dashboard', 'account-settings', 'resend-confirmation-email',
  'change-confirmation-email', 'reset-password'
]);

function isFullWidth() {
  console.log()
  for(let i = fullWidth.length - 1; i >= 0; i--) {
    if(window.location.hash.includes(fullWidth[i])) {
      return false;
    }
  }

  if(window.location.hash === '#/') {
    return false;
  }

  return true;
}

const warningPanelStyles = {
  margin: '12px auto',
  width: 800,
  textAlign: 'center',
  padding: 12,
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: "translateX(-50%)"
};

const iconStyles = {
  lineHeight: 48,
  verticalAlign: 'middle',
  margin: '0 24',
  width: 24,
  height: 24
};


class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);
    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
    this._checkChildName = this._checkChildName.bind(this);
    this._navigate = this._navigate.bind(this);


    // this makes sure that classes was updated
    // visual matter
    const pushState = this.props.history.pushState;
    const _this = this;
    this.props.history.pushState = function() {
      _this.forceUpdate();
      pushState(...arguments);
    }.bind(this.props.history);
  }

  async _checkIfLoggedIn() {
    console.info("IMPLEMENTED #1");
    let response = await API.get(
      ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']]
    );
    console.info("RESULT #1", response);

    /////////// mock
    if(sessionStorage.magicToken === 'magic-login-token') {
      return this.props.sessionActions.login(response.v1.user.me);
    }
    /////////// endof mock

    if (response.status === 200 && response.statusText === 'OK') {
      this.props.sessionActions.login(response.data);
    } else {
      this.props.history.pushState(null, '/login');
    }
  }

  _navigate(route) {
    this.props.history.pushState(null, route);
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
    const classes = ["ContentWrapper"];
    if(isFullWidth()) {
      classes.push('fullsize');
    }

    if (this.props.session.loggedIn || this._checkChildName(whiteList)) {
      return (
        <div>
          <Header history={this.props.history} />
          <div className={classes.join(" ")}>
            <SideNav {...this.props} />
            {this.props.children}
          </div>
        </div>
      );
    } else {
      this._checkIfLoggedIn();
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
