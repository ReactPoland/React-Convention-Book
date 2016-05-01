"use strict";

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichEditor from '../components/wyswig-draftjs/RichEditor';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});

class AddArticleView extends React.Component {
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);