"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor';
import { stateToHTML } from 'draft-js-export-html';
import RaisedButton from 'material-ui/lib/raised-button';


const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleSubmit = this._articleSubmit.bind(this);

    this.state = {
      title: 'test',
      contentJSON: {},
      htmlContent: ''
    };
  }

  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }

  _articleSubmit() {
    console.info('_articleSubmit');
    console.info(JSON.stringify(this.state));
    console.info(JSON.stringify(this.state.contentJSON));
    let newArticle = {
      articleTitle: this.state.title
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    console.info('newArticle', JSON.stringify(newArticle));
    
    let newArticleID = await falcorModel
      .call(
            'articles.add',
            [model]
          ).
      then((result) => {
        return falcorModel.getValue(['articles', 'newArticleID']);
      });

    alert('id = '+JSON.stringify(newArticleID));
  }

  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor
          initialValue={''}
          name="addarticle"
          title="Create an article"
          onChangeTextJSON={this._onDraftJSChange} />
          <RaisedButton
            onClick={this._articleSubmit}
            secondary={true}
            type="submit"
            style={{margin: '10px auto', display: 'block', width: 150}}
            label={'Submit Article'} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);