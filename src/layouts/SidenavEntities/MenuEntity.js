import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import {
  ListItem,
  IconMenu,
  MenuItem
} from 'material-ui';
import {
  ContentAdd,
  EditorModeEdit,
  ActionSwapVert,
  ActionBuild,
  ActionSettings
} from 'material-ui/lib/svg-icons';

import mapHelpers from 'utils/mapHelpers';
import API from 'utils/API';

import SidenavList from 'components/sidenav/SidenavList';
import SidenavListItem from 'components/sidenav/SidenavListItem';

import AddMenuModal from 'components/menu/modals/AddMenuModal';
import EditMenusModal from 'components/menu/modals/EditMenusModal';
import ReorderMenusModal from 'components/menu/modals/ReorderMenusModal';
import EditMenuSectionsModal from 'components/menu/modals/EditMenuSectionsModal';
import AddMenuItemModal from 'components/menu/modals/AddMenuItemModal';

const mapDispatchToProps = (dispatch) => ({
  actions: {
    menu: bindActionCreators(menuActions, dispatch)
  }
});

export default class MenuEntity extends React.Component {
  constructor(props) {
    super(props);

    this._fetchData             = this._fetchData.bind(this);
    this._onHeaderAction        = this._onHeaderAction.bind(this);
    this.onAddMenu              = this.onAddMenu.bind(this);
    this.onUpdateMenu           = this.onUpdateMenu.bind(this);
    this.onDeleteMenu           = this.onDeleteMenu.bind(this);
    this.onReorderMenus         = this.onReorderMenus.bind(this);
    this.onAddMenuSection       = this.onAddMenuSection.bind(this);
    this.onDeleteMenuSection    = this.onDeleteMenuSection.bind(this);
    this.onMenuSectionsReorder  = this.onMenuSectionsReorder.bind(this);

    this.state = {
      modal: null
    };
  }

  async _fetchData() {
    const response = await API.get(
      // I don't know yet exact number of items needed
      // perhaps we'll need to fetch items partialy (pagination style)
      ['restaurants', 0, 'menus', {from: 0, to: 20}, ['id', 'title', 'description', 'sections'], {from: 0, to: 100}, 'id']
    );
    this.props.actions.menu.menuList(response.restaurants[0].menus);
  }

  componentDidMount() {
    if(this.props.open) {
      this._fetchData();
    }
  }

  componentWillUpdate(nextProps) {
    if(nextProps.open !== this.props.open && nextProps.open) {
      this._fetchData();
    }
  }

  _onHeaderAction(event, value) {
    switch(value) {
      case "add-menu": this.setState({modal: 'add-menu'}); break;
      case "edit-menus": this.setState({modal: 'edit-menus'}); break;
      case "reorder-menus": this.setState({modal: 'reorder-menus'}); break;
      case "manage": this.props.history.pushState(null, '/menu/sections'); break;
      default: break;
    }
  }

  _onMenuListItemAction(event, value) {
    const { id } = this.props.params;
    const menu = this.props.menu.get(id);

    this.setState({
      menuInEdit: menu,
      modal: value
    });
  }

  onAddMenu(menu) {
    console.log('\n#################\nCALL API: ADD MENU\n#################\n');
    this.props.actions.menu.add(menu.formatForWire());
  }

  onUpdateMenu(menu) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    this.props.actions.menu.update(menu.formatForWire());
  }

  onDeleteMenu(id) {
    console.log('\n#################\nCALL API: DELETE MENU\n#################\n');
    this.props.actions.menu.delete(id);
  }

  onReorderMenus(order) {
    console.log('\n#################\nCALL API: CHANGE MENU ORDER\n#################\n');
    order = order.map((item) => item.id);
    this.props.actions.menu.reorder(order);
  }

  onAddMenuSection(section) {
    section.id = Math.random().toString().substring(2); // <---- remove me
    console.log('\n#################\nCALL API: ADD MENU SECTION\n#################\n');
    const menu = this.state.menuInEdit;
    this.props.actions.section.add(section.formatForWire());

    setTimeout(() => {
      // this is mocked asynchronous task :)
      // part below should happen when you get created section from API!
      // I'll just take it from state for now
      console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
      menu.sections.push(section);
      this.props.actions.menu.update(menu.formatForWire());
    }, 100);
  }

  onDeleteMenuSection(sectionId) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    const menu = this.state.menuInEdit;
    menu.sections = menu.sections.filter((section) => section.id !== sectionId);
    this.props.actions.menu.update(menu.formatForWire());
  }

  onMenuSectionsReorder(newOrder) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    const currentMenu = this.state.menuInEdit;
    const newSections = newOrder.map((order) => {
      const sectionExistedAlready = currentMenu.sections.find((section) => section.id === order.id);
      const menuItems = sectionExistedAlready ? sectionExistedAlready.items : [];

      return {
        id: order.id,
        items: menuItems
      };
    });

    currentMenu.sections = newSections;
    this.props.actions.menu.update(currentMenu.formatForWire());
  }

  render() {
    const disable = !this.props.menu.size;
    const header = (
      <ListItem
        primaryText={this.props.label}
        disabled
        rightIcon={
          this.props.open
          ? <IconMenu
              onChange={this._onHeaderAction}
              menuStyle={{
                width: 200
              }}
              iconButtonElement={
                <ActionSettings color="#fff" />
              }>

              <MenuItem
                value="add-menu"
                primaryText="Create Menu"
                rightIcon={<ContentAdd />} />
              <MenuItem
                value="edit-menus"
                primaryText="Edit Menus"
                disabled={disable}
                rightIcon={<EditorModeEdit />} />
              <MenuItem
                value="reorder-menus"
                primaryText="Reorder Menus"
                disabled={disable}
                rightIcon={<ActionSwapVert />} />
              <MenuItem
                value="manage"
                primaryText="Manage Sections"
                rightIcon={<ActionBuild />} />
            </IconMenu>
          : null
        }
        style={{backgroundColor: Colors.cyan800,  marginTop: -8, color: '#fff'}} />
    );

    const itemMenuComponent = (
      <IconMenu
        onChange={this._onMenuListItemAction.bind(this)}
        iconButtonElement={
          <ActionSettings color={Colors.cyan500} />
        }>
        <MenuItem
          primaryText="Edit Sections"
          value="edit-menu-sections"
          rightIcon={<EditorModeEdit />} />
        <MenuItem
          primaryText="Reorder Items"
          value="reorder-menu-items"
          rightIcon={<ActionSwapVert />} />
        <MenuItem
          value="add-menu-item"
          primaryText="Add Item"
          rightIcon={<ContentAdd />} />
      </IconMenu>
    );

    const prepend = [
      SidenavListItem({}, {id: 'library', title: 'Library'}, 'menu', true),
    ];
    const items = this.props.open ? this.props.items : mapHelpers.getFromRange(this.props.items, 0, 3);

    return (
      <SidenavList
        {...this.props}
        headerComponent={header}
        staticItems={prepend}
        menuComponent={itemMenuComponent}
        items={items}>

        <AddMenuModal
          open={this.state.modal === 'add-menu'}
          onDone={this.onAddMenu}
          onHide={this.setState.bind(this, {modal: null})} />

        <EditMenusModal
          menus={this.props.menu}
          onDelete={this.onDeleteMenu}
          onUpdate={this.onUpdateMenu}
          onHide={this.setState.bind(this, {modal: null})}
          open={this.state.modal === 'edit-menus'} />

        <ReorderMenusModal
          open={this.state.modal === 'reorder-menus'}
          menus={this.props.menu}
          onHide={this.setState.bind(this, {modal: null})}
          onDone={this.onReorderMenus} />

        <EditMenuSectionsModal
          open={this.state.modal === 'edit-menu-sections'}
          menu={this.state.menuInEdit}
          fullSections={this.props.section}
          onAddSection={this.onAddMenuSection}
          onDeleteSection={this.onDeleteMenuSection}
          onDone={this.onMenuSectionsReorder}
          onHide={this.setState.bind(this, {modal: null})} />

        <AddMenuItemModal
          open={this.state.modal === 'add-menu-item'} />

      </SidenavList>
    );
  }
}
