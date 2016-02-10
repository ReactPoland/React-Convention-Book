import React from 'react';
import { Link } from 'react-router';

class TokenNotFoundView extends React.Component {
  render() {
    return (
      <div>
        <h4 className='alert alert-warning'>Token not found</h4>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default TokenNotFoundView;
