"use strict"; 
  
import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RichEditor from '../components/wyswig-draftjs/RichEditor';





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

export default CoreLayout;