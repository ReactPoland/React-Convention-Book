"use strict"; 
  
import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });

class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);

  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <span>Links: <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link> | <Link to='/'>Home Page</Link></span>
            <br/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CoreLayout;