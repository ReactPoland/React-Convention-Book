import React from 'react';
import {
  Menu,
  MenuItem,
  Divider
} from 'material-ui';
import { NavigationArrowDropRight } from 'material-ui/lib/svg-icons';

const menuStyles = {
  width: '50%'
};

class SectionRow extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { section, menu = [] } = this.props;
    if(!section) return <span />;
    // I can't just bind it because it'll loose reference to component
    const onMark = () => this.props.onMark(section.id);

    return (
      <MenuItem
        insetChildren={true}
        onClick={onMark}
        checked={menu.indexOf(section.id) !== -1}
        primaryText={section.title} />
    );
  }
};

class MenuRow extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {state, props, menu, onMark} = this.props;
    let menuItems = (menu.sections || []).map((sectionId) => {
      return (
        <SectionRow
          onMark={onMark}
          key={sectionId}
          menu={state.belongingsMap[menu.id]}
          section={props.sections.get(sectionId)} />
      );
    });

    if(!menuItems.length) {
      menuItems = (
        <MenuItem disabled primaryText="No sections to display" />
      );
    }

    return (
      <MenuItem
        key={menu.id}
        insetChildren={true}
        checked={!!state.belongingsMap[menu.id]}
        rightIcon={<NavigationArrowDropRight />}
        primaryText={menu.title}
        menuItems={menuItems} />
    );
  }
};

export default class AddToMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      belongingsMap: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.belongingsMap !== this.state.belongingsMap;
  }

  _onAddToSection(menuId, sectionId) {
    const sections = (this.state.belongingsMap[menuId] || []).slice();
    const belongingsMap = Object.assign({}, this.state.belongingsMap);
    belongingsMap[menuId] = sections;

    if(sections.indexOf(sectionId) === -1) {
      sections.push(sectionId);
    } else {
      const index = sections.indexOf(sectionId);
      sections.splice(index, 1);
    }

    if(!sections.length) {
      delete belongingsMap[menuId];
    }

    this.setState({belongingsMap});
    this.props.onChange(belongingsMap);
  }

  render() {
    const menus = [];
    MenuRow = MenuRow.bind(this, this.state, this.props);
    if(this.props.menus.size) {
      this.props.menus.forEach((menu, key) => {
        menus.push(
          <MenuRow
            key={menu.id}
            state={this.state}
            props={this.props}
            menu={menu}
            onMark={this._onAddToSection.bind(this, menu.id)} />
        );
      });
    }

    return (
      <Menu style={menuStyles}>
        {menus}
      </Menu>
    );
  }
}
