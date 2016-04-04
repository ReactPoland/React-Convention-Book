import React from 'react';
import { Link } from 'react-router';

class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);

  }

  render () {
    return (
      <div>
        <span>Links: <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link> | <Link to='/'>Home Page</Link></span>
          <br/>
          {this.props.children}
      </div>
    );
  }
}

export default CoreLayout;