"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';
import ArticleCard from '../components/ArticleCard';
import ReactS3Uploader from 'react-s3-uploader';


const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadDetails: null,
      clickedLoader: null
    };
  }
  
  componentWillMount() {
    if(typeof window !== 'undefined') {
      this._fetch(); // we are server side rendering, no fetching
    }
  }

  async _fetch() {
    let articlesLength = await falcorModel.
      getValue("articles.length").
      then(function(length) {  
        return length;
      });

    let articles = await falcorModel.
      get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent', 'articleContentJSON', 'articlePicUrl']]). 
      then((articlesResponse) => {  
        return articlesResponse.json.articles;
      }).catch(e => {
        console.debug(e);
        return 500;
      });

    if(articles === 500) {
      return;
    }

    console.debug('articles');
    console.debug(JSON.stringify(articles));
    console.debug(typeof articles[0].articleContentJSON.entityMap);

    this.props.articleActions.articlesList(articles);
  }

  render () {

    let articlesJSX = [];

    this.props.article.forEach((articleDetails, articleKey) => {
      let currentArticleJSX = (
        <div key={articleKey}>
          <ArticleCard 
            title={articleDetails.articleTitle}
            content={articleDetails.articleContent} 
            articlePicUrl={articleDetails.articlePicUrl} />
        </div>
      );

      articlesJSX.push(currentArticleJSX);
    });

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h3>{JSON.stringify(this.state.uploadDetails)}</h3>
        <ReactS3Uploader
          signingUrl="/s3/sign"
          accept="image/*"
            onProgress={(val1, val2, val3) => {
              console.debug('ON PROGRESS');
              this.setState({ clickedLoader: true });
            }} 
            onError={(val1, val2) => {
              alert('onError'+val1, ' val2'+JSON.stringify(val2));
            }}
            onFinish={(uploadDetails, val2) => {
              this.setState({ uploadDetails:  uploadDetails});
              this.setState({ clickedLoader: false });
            }} />

          {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);