import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import falcorUtils from 'utils/falcorUtils';
import * as menuActions from 'actions/menu';
import * as sectionActions from 'actions/section';

import SidenavList from 'components/sidenav/SidenavList';
import SidenavListItem from 'components/sidenav/SidenavListItem';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

import AddMenuModal from 'components/menu/modals/AddMenuModal';
import EditMenusModal from 'components/menu/modals/EditMenusModal';
import ReorderMenusModal from 'components/menu/modals/ReorderMenusModal';
import EditMenuSectionsModal from 'components/menu/modals/EditMenuSectionsModal';
import ReorderMenuItemsModal from 'components/menu/modals/ReorderMenuItemsModal';
import AddMenuItemModal from 'components/menu/modals/AddMenuItemModal';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    menu: bindActionCreators(menuActions, dispatch),
    section: bindActionCreators(sectionActions, dispatch)
  }
});

class MenuEntity extends React.Component {
  constructor(props) {
    super(props);

    this._fetchData             = this._fetchData.bind(this);
    this._onHeaderAction        = this._onHeaderAction.bind(this);
    this.closeModal             = this.closeModal.bind(this);
    this.nullifyRequestState    = this.nullifyRequestState.bind(this);
    this.onAddMenu              = this.onAddMenu.bind(this);
    this.onUpdateMenu           = this.onUpdateMenu.bind(this);
    this.onDeleteMenu           = this.onDeleteMenu.bind(this);
    this.onReorderMenus         = this.onReorderMenus.bind(this);
    this.onMenuSectionsReorder  = this.onMenuSectionsReorder.bind(this);
    this.onItemsReorder         = this.onItemsReorder.bind(this);

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
    const menus = falcorUtils.makeArray({
      object: response.restaurants[0],
      name: 'menus'
    });
    this.props.actions.menu.menuList(menus);
  }

  componentDidMount() {
    if(this.props.open) {
      this._fetchData();
    }
  }

  componentWillUpdate(nextProps) {
    if(nextProps.open && nextProps.open !== this.props.open) {
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
    menu = menu.formatForWire();

    API
      .create({
        url: ['menusById'],
        body: menu,
        ref: ['restaurants', 0, 'menus']
      })
      .then((response) => {
        this.props.actions.menu.add(menu);
        this.setState({
          requestSuccess: `Menu "${menu.title}" successfully created!`
        });
      });
  }

  onUpdateMenu(menu) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');

    menu = menu.formatForWire();

    API
      .set({
        url: ['menusById', menu.id],
        body: menu
      })
      .then(() => {
        this.props.actions.menu.update(menu);
        this.setState({
          requestSuccess: 'Saved'
        });
      });
  }

  onDeleteMenu(id) {
    // .......
    console.log('\n#################\nCALL API: DELETE MENU\n#################\n');
    API
      .delete({
        url: ['menusById', id],
        ref: ['restaurants', 0, 'menus']
      })
      .then(() => {
        this.props.actions.menu.delete(id);
        this.setState({
          requestSuccess: 'Deleted'
        });

        if(id === this.props.params.id) {
          this.props.history.pushState(null, '/menu/library');
        }
      });
  }

  onReorderMenus(order) {
    console.log('\n#################\nCALL API: CHANGE MENU ORDER\n#################\n');
    order = order.map((item) => ({
      $type: 'ref',
      value: ['menusById', item.id]
    }));

    API
      .set({
        url: ['restaurants', 0, 'menus'],
        body: order
      })
      .then(() => {
        this.props.actions.menu.reorder(order.map((order) => order.value[1]));
        API.$log()
      });
  }

  onMenuSectionsReorder(newOrder) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    let menu = this.state.menuInEdit;

    Promise.all(newOrder.map(
      (section, index) => {
        if(!section.id) {
          return API
            .create({
              url: ['sectionsById'],
              body: section.formatForWire(),
              ref: ['restaurants', 0, 'sections']
            })
            .then((section) => {
              this.props.actions.section.add(section);
              newOrder[index].id = section.id;
            });
        }
      }
    ))
    .then(() => {
      menu.sections = newOrder.map(
        (section) => section.id
      );

      menu = menu.formatForWire();

      return API
        .set({
          url: ['menusById', menu.id],
          body: menu
        });
    })
    .then(() => {
      this.props.actions.menu.update(menu);
      this.setState({
        requestSuccess: `${menu} successfully updated`
      });
    });
  }

  onItemsReorder(sections) {
    Promise.all(
      sections.map((section) => {
        console.log('\n#################\nCALL API: UPDATE SECTION\n#################\n');
        let fullSection = this.props.section.get(section.id);
        fullSection.items = section.items.map((item) => item.id);
        section = fullSection.formatForWire();
        return API
          .set({
            url: ['sectionsById', section.id],
            body: section
          })
          .then(() => {
            this.props.actions.section.update(section);
            return section;
          });
      })
    )
    .then((menu) => {
      this.setState({
        requestSuccess: 'Saved',
        modal: null
      });
    });
  }

  onAddMenuItem() {
    console.log('\n#################\nCALL API: ADD MENU ITEM\n#################\n');
    alert('add menu item')
  }

  closeModal() {
    this.setState({modal: null});
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
  }

  render() {
    const { requestError, requestSuccess } = this.state;
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

    let items = mapHelpers.getFromRange(this.props.items, 0, 3);
    let openContent = null;

    if(this.props.open) {
      items = this.props.items;
      openContent = [
        <AddMenuModal
          key="add-menu-modal"
          open={this.state.modal === 'add-menu'}
          onDone={this.onAddMenu}
          onHide={this.closeModal} />,

        <EditMenusModal
          key="edit-menus-modal"
          menus={this.props.menu}
          onDelete={this.onDeleteMenu}
          onUpdate={this.onUpdateMenu}
          onHide={this.closeModal}
          open={this.state.modal === 'edit-menus'} />,

        <ReorderMenusModal
          key="reorder-menus-modal"
          open={this.state.modal === 'reorder-menus'}
          menus={this.props.menu}
          onHide={this.closeModal}
          onDone={this.onReorderMenus} />,

        <EditMenuSectionsModal
          key="edit-menu-sections-modal"
          open={this.state.modal === 'edit-menu-sections'}
          menu={this.state.menuInEdit}
          fullSections={this.props.section}
          onDone={this.onMenuSectionsReorder}
          onHide={this.closeModal} />,

        <ReorderMenuItemsModal
          key="reorder-menu-items-modal"
          open={this.state.modal === 'reorder-menu-items'}
          fullSections={this.props.section}
          fullItems={this.props.menuItem}
          menu={this.state.menuInEdit}
          onHide={this.closeModal}
          onDone={this.onItemsReorder} />,

        <AddMenuItemModal
          key="add-menu-item-modal"
          title="Add Menu Item"
          onHide={this.closeModal}
          onDone={this.onAddMenuItem}
          open={this.state.modal === 'add-menu-item'} />,

        <ErrorSuccessMsg
          key="error-success-msg"
          errorMessage={requestError}
          successMessage={requestSuccess}
          onRequestClose={this.nullifyRequestState} />
      ];
    }

    return (
      <SidenavList
        {...this.props}
        headerComponent={header}
        staticItems={prepend}
        menuComponent={itemMenuComponent}
        items={items}>

        {openContent}
      </SidenavList>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuEntity);
