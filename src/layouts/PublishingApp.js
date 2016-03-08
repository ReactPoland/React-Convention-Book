import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
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