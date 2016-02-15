import React from 'react';
import { connect } from 'react-redux';

import  MenuListItem from './MenuListItem';

const mapStateToProps = (state) => ({
  section: state.section,
  menuItem: state.menuItem
});

class MenuSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sectionSketch, menuItem, section } = this.props;
    if(!sectionSketch || !menuItem || !section) return <span />;
    const currentSection = this.props.section.get(sectionSketch.id);
    if(!currentSection) return <span />
    const items = sectionSketch.items.map((item) => {
      const id = item && typeof item === 'object' ? item.id : item;
      return menuItem.get(id);
    });

    return (
      <div className="MenuSection">
        <h3 className="MenuSection-Title">{currentSection.title}</h3>
        {
          items.map((item) => {
            if(!item) return null;
            return <MenuListItem item={item} key={item.id} />
          })
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuSection);
