"use strict";

import React from 'react';
import { Link } from 'react-router';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});


import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';


class DashboardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    
    let articlesJSX = [];
    for(let articleKey in this.props.article) {
      let articleDetails = this.props.article[articleKey];
      let currentArticleJSX = (
        <ListItem
          leftAvatar={<img src="/static/placeholder.png" width="50" height="50" />}
          primaryText={articleDetails.articleTitle}
          secondaryText={articleDetails.articleContent}
        />
      );

      articlesJSX.push(currentArticleJSX);
    }
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <Link to='/add-article'>
          <RaisedButton 
            label="Create an article" 
            secondary={true} 
            style={{margin: '20px 20px 20px 20px'}} />
        </Link>

        <List>
          {articlesJSX}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);