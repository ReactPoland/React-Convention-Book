import React from 'react';

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
        <span>[In future there will be a header]</span>
          <br/>
          {this.props.children}
      </div>
    );
  }
}

export default CoreLayout;