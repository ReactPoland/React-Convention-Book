import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import API from 'utils/API';
import * as menuItemActions from 'actions/menuItem';
import falcorUtils from 'utils/falcorUtils';

import Loader from 'decorators/Loader';
import MenuListItem from 'components/menu/MenuListItem';

const mapStateToProps = (state) => ({
  menuItem: state.menuItem
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(menuItemActions, dispatch)
});

@Loader()
class MenuLibraryView extends React.Component {
  constructor(props) {
    super(props);

    this._fetchData();
  }

  async _fetchData() {
    const response = await API.get(
      ['restaurants', 0, 'menuItems', {from: 0, to: 100}, ['id', 'title', 'description', 'picUrl']]
    );
    const menus = falcorUtils.makeArray({object: response.restaurants[0], name: 'menuItems'});
    this.props.actions.menuItemList(menus);
  }

  render() {
    const { menuItem } = this.props;
    const items = [];

    menuItem.forEach((item) => {
      items.push(
        <MenuListItem item={item} key={item.id} />
      );
    });

    return (
      <div className="mt100 Content">
        <h2>Menu items library</h2>
        { items }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLibraryView);
