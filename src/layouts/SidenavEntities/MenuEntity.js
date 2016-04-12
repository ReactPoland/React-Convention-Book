import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Colors from 'material-ui/lib/styles/colors';
import falcorModel from '../../falcorModel.js';
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
    this.onUpdateSection           = this.onUpdateSection.bind(this);

    
    this.onDeleteMenu           = this.onDeleteMenu.bind(this);
    this.onReorderMenus         = this.onReorderMenus.bind(this);
    this.onMenuSectionsReorder  = this.onMenuSectionsReorder.bind(this);
    this.onItemsReorder         = this.onItemsReorder.bind(this);
    this.toggleAlergensInMenu   = this.toggleAlergensInMenu.bind(this);

    this.state = {
      modal: null
    };
  }

  async _fetchData() {

    const menusLength = await falcorModel.getValue(
      ['restaurants', 0, 'menus', 'length']
    );

    const sectionsLength = await falcorModel.getValue(
      ['restaurants', 0, 'sections', 'length']
    );

    const response = await API.get(
      // I don't know yet exact number of items needed
      // perhaps we'll need to fetch items partialy (pagination style)
      ['restaurants', 0, 'menus', {from: 0, to: menusLength}, ['id', 'title', 'description', 'sections'], {from: 0, to: sectionsLength}, 'id']
    );

    console.info("\n\n\n DEBUG response \n\n ", response, "\n\n\n\n ");

    let menus = falcorUtils.makeArray({
      object: response.restaurants[0],
      name: 'menus'
    });

    console.info("\n\n\n DEBUG menus \n\n ", menus, "\n\n\n\n ");

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

  async onAddMenu(menu) {
    console.log('\n#################\nCALL API: ADD MENU\n#################\n');
    let newMenu = menu;
    let resultNewMenu = await falcorModel
      .call(
            ['restaurants', 0, 'menus','add'],
            [newMenu]          
          ).
      then((result) => {
        return result;
      });
    const menusLen = await falcorModel.getValue(
      ['restaurants', 0, 'menus', 'length']
    );

    let newMenuId = resultNewMenu.json.restaurants[0].menus[menusLen-1][1];
    newMenuId = newMenuId ? newMenuId : alert("error with newMenuId");
    newMenu.id = newMenuId;

    this.props.actions.menu.add(newMenu);
    this.setState({
      requestSuccess: `Menu "${newMenu.title}" successfully created!`
    });
  }

  async onUpdateMenu(menu) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    let menuArray = [menu] ; //.formatForWire();
    let resultUpdateMenus = await falcorModel
      .call(
            ['restaurants', 0, 'menus','update'],
            [menuArray] // update requries an array
          ).
      then((result) => {
        return result;
      });

    this.props.actions.menu.update(menu);
    return;
  }


  async onUpdateSection(section) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    let sectionArray = [section] ; //.formatForWire();
    let resultUpdateSections = await falcorModel
      .call(
            ['restaurants', 0, 'sections','update'],
            [sectionArray] // update requries an array
          ).
      then((result) => {
        return result;
      });

    this.props.actions.section.update(section);
    return;
  }

  async onDeleteMenu(id) {
    console.log('\n#################\nCALL API: DELETE MENU\n#################\n');

    let result = await falcorModel
      .call(
            ['restaurants', 0, 'menus', 'delete'],
            [id]          
          ).
      then((result) => {
        return result;
      });

    this.props.actions.menu.delete(id);
    
    if(id === this.props.params.id) {
      this.props.history.pushState(null, '/menu/library');
    }

    this.setState({
      requestSuccess: 'Deleted'
    });

    return;
  }

  async onReorderMenus(order) {
    console.log('\n#################\nCALL API: CHANGE MENU ORDER\n#################\n');
    let orderedObjArray = order.map((item, index) => { 
      item.orderNumber = index;
      return item;
    });

    let resultUpdateMenus = await falcorModel
      .call(
            ['restaurants', 0, 'menus','update'],
            [orderedObjArray]          
          ).
      then((result) => {
        return result;
      });


    let orderedArray = orderedObjArray.map((order) => order.id);

    this.props.actions.menu.reorder(orderedArray);
    return;
  }


  _newSections(sections) {
    let newSections = [];
    for(let key in sections) {
      if(typeof sections[key].id === "undefined") {
        newSections.push(sections[key])
      }
    }
    return newSections;
  }

  _deletedSections(sections) {
    let currentMenu = this.props.menu.get(this.props.params.id);
    let currentMenuSections = currentMenu.sections;
    let deletedSections = [];
    if(currentMenuSections.length > sections.length) {
      let sectionsArray = sections.map((item) => { return item.id; });
      currentMenuSections.map((secItem, index) => {
        let sectionIsDeleted = sectionsArray.indexOf(secItem) === -1;
        if(sectionIsDeleted) {
          deletedSections.push(secItem);
        }
      });
    }

    return deletedSections;
  }

  async onMenuSectionsReorder(newOrder) {
    console.log('\n#################\nCALL API: UPDATE MENU\n#################\n');
    let menu = this.state.menuInEdit;
    // let newSections = this._newSections(newOrder);
    let deletedSections = this._deletedSections(newOrder);

    /*
      BELOW removing sections (if any):
    */
    if(deletedSections.length) {
      let menusToUpdate = [];

      this.props.menu.forEach((menuItem, index) => {

        let remainingSections = [];
        menuItem.sections.map((sectionID) => {
          if (deletedSections.indexOf(sectionID) === -1) {
            remainingSections.push(sectionID);
          }
        });
        
      
        if(menuItem.sections.length !== remainingSections.length) {
          menuItem.sections = remainingSections;
          menusToUpdate.push(menuItem);
        }

      });
    
      let menuDeleteUpdateResult = await falcorModel
        .call(
              ['restaurants', 0, 'menus','update'],
              [menusToUpdate]          
            ).
        then((result) => {
          return result;
        });
    

      await Promise.all(deletedSections.map(async sectionID => {
        let result = await falcorModel
          .call(
                ['restaurants', 0, 'sections', 'delete'],
                [sectionID]          
              ).
          then((result) => {
            return result;
          });
        this.props.actions.section.delete(sectionID);
      }));    
    }
    /*
      BELOW here below add to falcor to sections
     */
    let newSectionsOrder = [];
    await Promise.all(
      newOrder.map(async (secItem, index) => {
        if(typeof secItem.id !== "undefined") {
          newSectionsOrder.push(secItem.id);
          return;
        }

        let newSection = secItem;
        let response = await falcorModel
          .call(
                ['restaurants', 0, 'sections','add'],
                [newSection]          
              ).
          then((result) => {
            return falcorModel.getValue(
              ['restaurants', 0, 'sections', 'length']
            ).then((sectionsLen) => {
              return { sectionsLen, result };
            });;
          });
        let sectionsLen = response.sectionsLen;
        let result = response.result;

        let newSectionId = result.json.restaurants[0].sections[sectionsLen-1][1];
        newSectionsOrder.push(newSectionId);
        newSection.id = newSectionId;
        this.props.actions.section.add(newSection);
      })
    );

    // return;

    /*
        UPDATING menus
     */
    let updatedMenus = [];
    let currentMenuID = this.props.params.id;
    let currentMenu = this.props.menu.get(currentMenuID);

    currentMenu.sections = newSectionsOrder;
    this.props.actions.menu.update(currentMenu);

    let arrayOfMenusToUpdate = [currentMenu];
    let menuUpdateResult = await falcorModel
      .call(
            ['restaurants', 0, 'menus','update'],
            [arrayOfMenusToUpdate]  // requires array of menus        
          ).
      then((result) => {
        return result;
      });

  }

  async onItemsReorder(sections) {
    console.log('\n#################\nCALL API: UPDATE SECTION\n#################\n');
    let sectionsObjArray = sections.map((sectionItem, index) => {
      // add sections with IDs to menu items, only
      sectionItem.items = sectionItem.items.map((menuItem, index2) => menuItem.id);
      return sectionItem;
    });

    // return;
    let sectionsUpdateResult = await falcorModel
      .call(
            ['restaurants', 0, 'sections','update'],
            [sectionsObjArray]  // requires array of menus        
          ).
      then((result) => {
        return result;
      });
    sectionsObjArray.map((section) => {
      this.props.actions.section.update(section);
    });

    this.setState({
      requestSuccess: 'Saved',
      modal: null
    });
    return;
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

  toggleAlergensInMenu() {
    console.log('\n#################\nCALL API: toggleAlergensInMenu\n#################\n');

    let menuID = this.props.params.id;
    let updatedMenu = this.props.menu.get(menuID);
    updatedMenu.showAllergensInMenu = !updatedMenu.showAllergensInMenu;

    API
      .set({
        url: ['menusById', menuID, 'showAllergensInMenu'],
        body: updatedMenu.showAllergensInMenu
      })
      .then(() => {
        this.props.actions.menu.update(updatedMenu);
        API.$log();
      });



    return;
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

  render() {
    const { requestError, requestSuccess } = this.state;
    const disable = !this.props.menu.size;
    const header = (
      <ListItem
        primaryText={this.props.label}
        disabled
        rightIcon={
          this.props.open && localStorage.role === 'admin'
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
            </IconMenu>
          : null
        }
        style={{backgroundColor: Colors.cyan800,  marginTop: -8, color: '#fff'}} />
    );

    const itemMenuComponent = 
      localStorage.role !== 'admin' 
      ? 
        <span /> 
      :
        (
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
            
          </IconMenu>
        );

    const prepend = [
      SidenavListItem({}, {id: 'library', title: 'Library'}, 'menu', true),
    ];

    let items = mapHelpers.getFromRange(this.props.items, 0, 3);
    let openContent = null;
    console.info("\n\n\n\n this.state.modal\n\n\n\n ", this.state.modal , "\n\n\n\n this.state.modal \n\n\n\n ")
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

        (this.state.modal === 'edit-menu-sections' ?
          <EditMenuSectionsModal
          onUpdate={this.onUpdateSection}
          section={this.props.section}
          key="edit-menu-sections-modal"
          open={this.state.modal === 'edit-menu-sections'}
          menu={this.state.menuInEdit}
          fullSections={this.props.section}
          onDone={this.onMenuSectionsReorder}
          onHide={this.closeModal} />
          :
          <span />),

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
