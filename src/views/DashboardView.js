"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginForm } from '../components/LoginForm.js';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});


import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';

const ListExampleFolder = () => (
    <List>
      <ListItem
        leftAvatar={<Avatar icon={<ActionInfo />} />}
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<ActionInfo />} />}
        primaryText="Recipes"
        secondaryText="Jan 17, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<ActionInfo />} />}
        primaryText="Work"
        secondaryText="Jan 28, 2014"
      />
    </List>
);

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
        <List>
          {articlesJSX}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);