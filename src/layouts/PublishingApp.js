"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';


import { 
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText 
} from 'material-ui/Card';
import { Paper, FlatButton } from 'material-ui';


let cardDivStyle = {
  width: '80%', 
  height: '100%',
  margin: '50px 150px 50px 150px',
  clear: 'left'
};
const ArticleCart = (title = "title", content = "content") => (
      <Paper style={{padding: 10, width: '100%', height: 300}}>
        <CardHeader
          title={title}
          subtitle="Subtitle"
          avatar="/static/avatar.png"
        />

        <div style={{width: '30%', float: 'left'}}>
          <Card >
            <CardMedia
              overlay={<CardTitle title={title} subtitle="Overlay subtitle" />}>
              <img src="/static/placeholder.png" height="190" />
            </CardMedia>
          </Card>
        </div>
      </Paper>
);


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
      get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
      then(function(articlesResponse) {  
        console.info(articlesResponse);
        return articlesResponse.json.articles;
      });

    this.props.articleActions.articlesList(articles);
  }

  render () {

  	let articlesJSX = [];
  	for(let articleKey in this.props.article) {
  		let articleDetails = this.props.article[articleKey];
  		let currentArticleJSX = (
  			<div key={articleKey}>
            {
              ArticleCart(
                articleDetails.articleTitle,
                articleDetails.articleContent
              )
            }
  			</div>
      );

  		articlesJSX.push(currentArticleJSX);
  	}
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
          {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);