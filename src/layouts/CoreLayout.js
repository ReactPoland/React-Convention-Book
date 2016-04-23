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


class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);

  }

  render () {
    const buttonStyle = {
      margin: 12
    };
    
    let menuLinksJSX = (<span>
        <Link to='/register'><RaisedButton label="Register" style={buttonStyle}  /></Link> 
        <Link to='/login'><RaisedButton label="Login" style={buttonStyle}  /></Link> 
      </span>);

    let homePageJSX = (<Link to='/'>
        <IconButton tooltip="Home Page">
          <ActionHome />
        </IconButton>
      </Link>);


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Publishing App"
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            iconElementLeft={homePageJSX}
            iconElementRight={menuLinksJSX} />
            <br/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CoreLayout;