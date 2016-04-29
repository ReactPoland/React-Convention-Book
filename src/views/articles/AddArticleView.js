"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor.js';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);