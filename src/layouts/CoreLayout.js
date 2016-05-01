import React from 'react';
import 'styles/core.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import * as restaurantActions from 'actions/restaurant';
import * as newsFeedActions from 'actions/newsFeed';
import API from 'utils/API';
import { Link } from 'react-router';

import { Paper, FlatButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import AlertWarning from 'material-ui/lib/svg-icons/alert/warning';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import falcorModel from '../falcorModel.js';
import RichEditor from 'components/wyswig-draftjs/RichEditor';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
  restaurantActions: bindActionCreators(restaurantActions, dispatch),
  newsFeedActions: bindActionCreators(newsFeedActions, dispatch)
});

const whiteList = [
  'home', 'login', 'register', 'reset-password1',
  'reset-password2', 'token-not-found', 'staff-register'
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
  constructor(props) {
    super(props);
    this._onchangeDraftJSON = this._onchangeDraftJSON.bind(this);

    this.state = {
      contentJSON: {}
    };
  }

  _onchangeDraftJSON(contentJSON, descriptionName) {
    console.info('contentJSON', contentJSON);
    this.setState({contentJSON: contentJSON});
  }


  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
          <RichEditor
            tabIndexProp="100005"
            initialValue={''}
            name="description2"
            title="Description (Level 2)"
            onChangeTextJSON={this._onchangeDraftJSON} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
