import React from 'react';
import { connect } from 'react-redux';

import MenuListItem from './MenuListItem';
import AddPlaceholder from 'components/menu/AddPlaceholder';

const mapStateToProps = (state) => ({
  section: state.section,
  menuItem: state.menuItem
});

class MenuSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sectionId, menuItem, section, currentMenuId } = this.props;
    if(!sectionId || !menuItem || !section) return <span />;
    const currentSection = this.props.section.get(sectionId);
    if(!currentSection) return <span />
    const items = currentSection.items.map((item) => {
      const id = item && typeof item === 'object' ? item.id : item;
      return menuItem.get(id);
    });

    return (
      <div className="MenuSection">
        <h3 className="MenuSection-Title">{currentSection.title}</h3>
        {
          items.length
          ? items.map((item) => {
              if(!item) return null;
              return (<div>
                <MenuListItem 
                  onDeleteClick={this.props.onDeleteClick} 
                  onEditClick={this.props.onEditClick}
                  item={item} 
                  currentMenuId={this.props.currentMenuId}
                  currentSectionId={sectionId}
                  key={item.id} 
                  sections={this.props.sections} 
                  menus={this.props.menus} /> 
                <br/>
              </div>)
            })
          : <AddPlaceholder />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuSection);
