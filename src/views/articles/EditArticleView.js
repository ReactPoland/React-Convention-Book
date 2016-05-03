"use strict";

import React from 'react';
import Falcor from 'falcor';
import { Link } from 'react-router';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../../actions/article.js';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor';
import { stateToHTML } from 'draft-js-export-html';
import RaisedButton from 'material-ui/lib/raised-button';

let MOCK = {
        "entityMap" : {},
        "blocks" : [ 
            {
                "key" : "a9snp",
                "text" : "test",
                "type" : "unstyled",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }, 
            {
                "key" : "8sbm6",
                "text" : "test",
                "type" : "unordered-list-item",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }, 
            {
                "key" : "78eiu",
                "text" : "test",
                "type" : "unordered-list-item",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }, 
            {
                "key" : "c9prl",
                "text" : "test",
                "type" : "unordered-list-item",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }, 
            {
                "key" : "3k279",
                "text" : "test",
                "type" : "unordered-list-item",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }, 
            {
                "key" : "dln2i",
                "text" : "test",
                "type" : "unordered-list-item",
                "depth" : 0,
                "inlineStyleRanges" : [],
                "entityRanges" : []
            }
        ]
    };

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class EditArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleEditSubmit = this._articleEditSubmit.bind(this);

    this.state = {
      editedArticleID: null
    };
  }

  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }

  _articleEditSubmit() {
    let currentArticleID = this.state.editedArticleID;
  }

  render () {
    let initialWYSWIGValue = MOCK;

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Edit an exisitng article</h1>
        <WYSWIGeditor
          initialValue={initialWYSWIGValue}
          name="editarticle"
          title="Edit an article"
          onChangeTextJSON={this._onDraftJSChange} />
          <RaisedButton
            onClick={this._articleSubmit}
            secondary={true}
            type="submit"
            style={{margin: '10px auto', display: 'block', width: 150}}
            label={'Submit Edition'} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleView);