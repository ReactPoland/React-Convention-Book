import React from 'react';
import {
  Menu,
  MenuItem,
  Divider
} from 'material-ui';
import { _computeBelongingsMapUtil, _createBelongingsStringUtil } from 'utils/_computeItemMenuBelongingsUtils';
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
    this.componentWillMount = this.componentWillMount.bind(this);
    this._computeBelongingsMap = this._computeBelongingsMap.bind(this);

    this.state = {
      belongingsMap: { },
      belongingsString: {}
    };
  }

  componentWillMount() {
    if(this.props.editItemId) {
      // We are in edit mode, so we need to calculate belongings to order it correctly
      this._computeBelongingsMap();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.belongingsMap !== this.state.belongingsMap;
  }

  _computeBelongingsMap() {
    let searchedItemId = this.props.editItemId;
    let sectionsBelongings = [];

    let computedBelongingsMap = _computeBelongingsMapUtil(searchedItemId, this.props.sections, this.props.menus);

    this.setState({belongingsMap: computedBelongingsMap});
    let belongingsString = _createBelongingsStringUtil(computedBelongingsMap, this.props.sections, this.props.menus);
    this.setState({belongingsString: belongingsString});
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

    let belongingsString = _createBelongingsStringUtil(belongingsMap, this.props.sections, this.props.menus);
    this.setState({belongingsString: belongingsString});

  }

  render() {
    const menus = [];

    console.log("belongings ->", this.state.belongingsMap);

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

    let itemBelongingsJSX;
    if(this.state.belongingsString) {
      let itemListJSX = [];
      for(let key in this.state.belongingsString) {
        let arrayOfSections = this.state.belongingsString[key];
        arrayOfSections.map((item, index) => {
          itemListJSX.push(<li key={item+index}> {key} > {item} </li>);
        })
      }
      itemBelongingsJSX = (
        <ul>
          {itemListJSX}
        </ul>);

    } else itemBelongingsJSX = null;

    return (
      <div>
        <Menu style={menuStyles}>
          {menus}
        </Menu>
        <br/>
        Already added to:
        {itemBelongingsJSX}
      </div>
    );
  }
}
