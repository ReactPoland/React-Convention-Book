import React from 'react';
import { binActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

class MenuSectionsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt100 Content">
        <h2>Sections</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSectionsView);
