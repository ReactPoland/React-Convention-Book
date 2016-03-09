"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this._fetch();
  }
  async _fetch() {
    let articlesLength = await falcorModel.
      getValue("articles.length").
      then(function(length) {  
        return length;
      });

    let articles = await falcorModel.
      get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
      then(function(articlesResponse) {  
        console.info(articlesResponse);
        return articlesResponse.json.articles;
      });

    this.props.articleActions.articlesList(articles);
  }

  render () {
  	let articlesJSX = [];
  	for(let articleKey in this.props) {
  		let articleDetails = this.props[articleKey];
  		let currentArticleJSX = (
  			<div key={articleKey}>
  				<h2>{articleDetails.articleTitle}</h2>
  				<h3>{articleDetails.articleContent}</h3>
  			</div>);
  		articlesJSX.push(currentArticleJSX);
  	}
    return (
      <div>
          <h1>Our publishing app</h1>
          {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);