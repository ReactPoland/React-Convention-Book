"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichEditor from '../../components/wyswig-draftjs/RichEditor';

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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);