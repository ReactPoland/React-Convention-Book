import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from 'decorators/Loader';
import MenuListItem from 'components/menu/MenuListItem';

const mapStateToProps = (state) => ({
  menuItem: state.menuItem
});

@Loader()
class MenuLibraryView extends React.Component {
  constructor(props) {
    super(props);
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

export default connect(mapStateToProps)(MenuLibraryView);
