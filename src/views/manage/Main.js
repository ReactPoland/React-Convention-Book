import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  // bind actions here if you need any
});

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    /**
     * Once we implement roles we should kick off
     * users with insufficient permissions here
     */
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
