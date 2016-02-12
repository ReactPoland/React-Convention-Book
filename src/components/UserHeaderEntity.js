import React from 'react';

export default class UserHeaderEntity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <div className="UserEntity">
        <p className="UserEntity-Title">
          {(user.first || '') + ' ' + (user.last || '')}
          <img className="UserEntity-Pic" alt="" src={user.profilePic} />
        </p>
        <p className="UserEntity-Badge">
          5 {/* I don't know yet what is the purpose of this number :) */}
        </p>
      </div>
    );
  }
}
