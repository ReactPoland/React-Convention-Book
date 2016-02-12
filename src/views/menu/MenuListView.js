import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as menuActions from 'actions/menu';

const mapStateToProps = (state) => ({
  session: state.session,
  menu: state.menu,
  recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(menuActions, dispatch)
});

class MenuList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Content MenuList">
        <p>menus list</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
