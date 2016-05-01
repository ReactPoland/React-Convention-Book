"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor';
import { stateToHTML } from 'draft-js-export-html';

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

  _onchangeDraftJSON(contentJSON, contentState) {
    console.info('contentJSON', contentJSON);
    let html = stateToHTML(contentState);
    console.info('html');
    console.info(html);
    console.info('html');

    this.setState({contentJSON: contentJSON});
  }


  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
          <WYSWIGeditor
            initialValue={''}
            name="addarticle"
            title="Create an article"
            onChangeTextJSON={this._onchangeDraftJSON} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);