import React from 'react';
import 'styles/core.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import { axiosHttpRequest } from 'utils/axiosHttpRequest';
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

const whiteList = ['home', 'login', 'register', 'reset-password1', 'reset-password2', 'token-not-found'];
const fullWidth = whiteList.concat(['dashboard', 'account_settings']);

function isFullWidth() {
  for(let i = fullWidth.length - 1; i >= 0; i--) {
    if(window.location.hash.includes(fullWidth[i])) {
      return false;
    }
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

const ConfirmEmailBox = (state, navigate) => {
  return !state.user.verified && state.loggedIn ?
    <Paper zDepth={1} style={warningPanelStyles} className="InfoBox">
      <AlertWarning
        style={iconStyles}
        color={Colors.yellow500} />
      <span>Please verify your email address</span>
      <FlatButton
        primary={false}
        style={{marginLeft: 24}}
        label="Resend confirmation email"
        onClick={navigate.bind(this, '/resend_confirmation_email')} />
      <FlatButton
        primary={false}
        label="Change email address"
        onClick={navigate.bind('/change_confirmation_email')} />
    </Paper>
    : null;
}

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
    let requestObj = {
      method: 'get',
      url: '/v1/user/me'
    }

    let response = await axiosHttpRequest(requestObj);

    /////////// mock
    if(sessionStorage.magicToken === 'magic-login-token') {
      return this.props.sessionActions.login({
        firstName: 'test',
        lastName: 'admin',
        role: 'admin',
        verified: false,
        profilePic: 'http://lorempixel.com/100/100/people/',
        token: 'magic-login-token'
      });
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
            {ConfirmEmailBox(this.props.session, this._navigate)}
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
