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
import ReactS3Uploader from 'react-s3-uploader';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleSubmit = this._articleSubmit.bind(this);

    this.state = {
      title: 'test',
      contentJSON: {},
      htmlContent: '',
      newArticleID: null,
      uploadDetails: null,
      clickedLoader: null,
      uploadProgress: null,
      uploadError: null
    };
  }

  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }

  async _articleSubmit() {
    let newArticle = {
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    console.debug('this.state.contentJSON');
    console.debug(this.state.contentJSON);

    let newArticleID = await falcorModel
      .call(
            'articles.add',
            [newArticle]
          ).
      then((result) => {
        return falcorModel.getValue(
            ['articles', 'newArticleID']
          ).then((articleID) => {
            return articleID;
          });
      });

    newArticle['_id'] = newArticleID;
    this.props.articleActions.pushNewArticle(newArticle);
    this.setState({ newArticleID: newArticleID});
  }

  render () {
    if(this.state.newArticleID) {
      return (
        <div style={{height: '100%', width: '75%', margin: 'auto'}}>
          <h3>Your new article ID is {this.state.newArticleID}</h3>
          <Link to='/dashboard'>
            <RaisedButton
              secondary={true}
              type="submit"
              style={{margin: '10px auto', display: 'block', width: 150}}
              label='Done' />
          </Link>
        </div>
      );
    }

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor
          name="addarticle"
          title="Create an article"
          onChangeTextJSON={this._onDraftJSChange} />

        <h3>{JSON.stringify(this.state.uploadDetails)}</h3>
        <h3>{JSON.stringify(this.state.uploadProgress)}</h3>
        <ReactS3Uploader
          signingUrl="/s3/sign"
          accept="image/*"
            onProgress={(progressInPercent, uploadStatusText) => {
              this.setState({ 
                uploadProgress: { progressInPercent, uploadStatusText }, 
                clickedLoader: true,
                uploadError: null
              });
            }} 
            onError={(errorDetails) => {
              this.setState({ 
                clickedLoader: false, 
                uploadProgress: null,
                uploadError: errorDetails
              });
            }}
            onFinish={(uploadDetails, val2) => {
                this.setState({ 
                  clickedLoader: false, 
                  uploadProgress: null,
                  uploadDetails:  uploadDetails
                });
            }} />

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