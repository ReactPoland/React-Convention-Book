"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';
import { LoginForm } from '../components/LoginForm.js';
import axios from 'axios';

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
      error: null,
      sendingRequest: false
    };

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

  async login(credentials) {

    await axios.post('/login', {
        username: credentials.email,
        password: credentials.password
      })
      .then((response) => {
        alert("works "+JSON.stringify(response.data.token));

        if(response.data.token) {
          axios.interceptors.request.use((config) => {
            config.headers['authorization'] = 'Bearer ' + response.data.token;
            return config;
          });

          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((response) => {
        alert(response.data);
        console.info(response);
      });

    await axios.get('/fake-user')
      .then((response) => {
        alert("user "+JSON.stringify(response));

      })
      .catch((response) => {
        alert(response.data);
        console.info(response);
      });
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
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <LoginForm
            onSubmit={this.login}
            sendingRequest={this.state.sendingRequest} />
        </div>
          <h1>Our publishing app</h1>
          {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);