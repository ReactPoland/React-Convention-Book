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

import SidenavList from 'components/sidenav/SidenavList';
import SidenavListItem from 'components/sidenav/SidenavListItem';

import AddMenuModal from 'components/menu/modals/AddMenuModal';
import EditMenusModal from 'components/menu/modals/EditMenusModal';
import ReorderMenusModal from 'components/menu/modals/ReorderMenusModal';

const mapDispatchToProps = (dispatch) => ({
  actions: {
    menu: bindActionCreators(menuActions, dispatch)
  }
});

export default class MenuEntity extends React.Component {
  constructor(props) {
    super(props);

    this._onHeaderAction = this._onHeaderAction.bind(this);
    this.onAddMenu = this.onAddMenu.bind(this);
    this.onUpdateMenu = this.onUpdateMenu.bind(this);
    this.onDeleteMenu = this.onDeleteMenu.bind(this);

    this.state = {
      modal: null//'reorder-menus'
    };
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

  onAddMenu(menu) {
    console.log('#################\nCALL API\n#################');
    this.props.actions.menu.add(menu.formatForWire());
  }

  onUpdateMenu(menu) {
    console.log('#################\nCALL API\n#################');
    this.props.actions.menu.update(menu.formatForWire());
  }

  onDeleteMenu(id) {
    console.log('#################\nCALL API\n#################');
    this.props.actions.menu.delete(id);
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
        iconButtonElement={
          <ActionSettings color={Colors.cyan500} />
        }>
        <MenuItem
          primaryText="Edit Sections"
          rightIcon={<EditorModeEdit />} />
        <MenuItem
          primaryText="Reorder Items"
          rightIcon={<ActionSwapVert />} />
        <MenuItem
          primaryText="Add Item"
          rightIcon={<ContentAdd />} />
      </IconMenu>
    );

    const prepend = [
      SidenavListItem({}, {id: 'library', title: 'Library'}, 'menu', true),
    ];

    return (
      <SidenavList
        {...this.props}
        headerComponent={header}
        staticItems={prepend}
        menuComponent={itemMenuComponent}
        items={this.props.items}>

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
          open={this.state.modal == 'reorder-menus'}
          menus={this.props.menu} />
      </SidenavList>
    );
  }
}
