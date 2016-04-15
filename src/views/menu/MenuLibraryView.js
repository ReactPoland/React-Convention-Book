import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/lib/svg-icons';
import falcorModel from '../../falcorModel.js';

import API from 'utils/API';
import * as menuItemActions from 'actions/menuItem';
import * as sectionActions from 'actions/section';
import mapHelpers from 'utils/mapHelpers';
import falcorUtils from 'utils/falcorUtils';
import MenuSection from 'components/menu/MenuSection';
import AddPlaceholder from 'components/menu/AddPlaceholder';
import Allergens from 'components/menu/Allergens';

import Loader from 'decorators/Loader';
import MenuListItem from 'components/menu/MenuListItem';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';
import AllergenModel from 'models/Allergen';
import MenuItemModel from 'models/MenuItem';

import AddMenuItemModal from 'components/menu/modals/AddMenuItemModal';


const falcorLib = require('falcor/dist/falcor.browser');

const mapStateToProps = (state) => ({
  ...state
});


const mapDispatchToProps = (dispatch) => ({
  actions: {
    menuItem: bindActionCreators(menuItemActions, dispatch),
    section: bindActionCreators(sectionActions, dispatch)
  }
});

const btnStyle = {
  position: 'fixed',
  bottom: 48,
  right: 48
};

@Loader()
class MenuLibraryView extends React.Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.onAddItemDone = this.onAddItemDone.bind(this);
    this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    this.onEditItemClick = this.onEditItemClick.bind(this);
    this.onEditItemDone = this.onEditItemDone.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
    this.onRemoveItemClick = this.onRemoveItemClick.bind(this);

    this._createMenuItemAndGetRef = this._createMenuItemAndGetRef.bind(this);
    this._getItemsLengthsInSections = this._getItemsLengthsInSections.bind(this);
    this._addItemToSections = this._addItemToSections.bind(this);

    this.state = {
      modal: null,
      editItemId: null
    };

    this._fetchData();
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    console.info("IMPLEMENTED #3");
    //let menuItemsLength = 100; // TO-DO unmock this later

    const menuItemsLength = await falcorModel.getValue(
      ['restaurants', localStorage.restaurantID, 'menuItems', 'length']
    );

    const response = await API.get(
      ['restaurants', localStorage.restaurantID, 'menuItems', {from: 0, to: menuItemsLength}, ['id', 'title', 'description', 'description2', 'description3', 'picUrl', 'allergens']]
    );

    console.info("RESULT #4", response);

    console.info("IMPLEMENTED #4");

    //let sectionsLength = 100; // TO-DO unmock this later

    const sectionsLength = await falcorModel.getValue(
      ['restaurants', localStorage.restaurantID, 'sections', 'length']
    );

    const menuItemsLen = await falcorModel.getValue(
      ['restaurants', localStorage.restaurantID, 'menuItems', 'length']
    );


    const response2 = await API.get(
      ['restaurants', localStorage.restaurantID, 'sections', {from: 0, to: sectionsLength}, ['id', 'title', 'items'], {from: 0, to: menuItemsLen}, 'id']
    );

    console.info("RESULT #4", response2);


    const items = response ? falcorUtils.makeArray({object: response.restaurants[localStorage.restaurantID], name: 'menuItems'}) : [];
    let sections = response2 ? falcorUtils.makeArray({object: response2.restaurants[localStorage.restaurantID], name: 'sections'}) : [];

    this.props.actions.menuItem.menuItemList(items);
    this.props.actions.section.sectionList(sections);
  }

  _openModal(modal) {
    this.setState({modal});
  }

  hideModal() {
    this.setState({modal: null, editItemId: null});
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
  }

  _createMenuItemAndGetRef(menuItem) {
    return API
      // first create item
      .create({
        url: ['menuItemsById'],
        body: menuItem,
      })
      // get length of menuItems in restaurant
      .then((newMenuItem) => {
        this.props.actions.menuItem.add(newMenuItem);

        return API
          .getValue(['restaurants', localStorage.restaurantID, 'menuItems', 'length'])
          .then((size) => ({
            size,
            menuItem: newMenuItem
          }));
      })
      // update restaurant.menuItemsLength value
      .then(({menuItem, size}) => {
        const ref = { $type: 'ref', value: ['menuItemsById', menuItem.id] };
        return {ref, size};
      });
  }

  _getItemsLengthsInSections(ref, refMap) {
    let sections = [];
    for(let key in refMap) {
      sections = sections.concat(refMap[key]);
    }

    return API
      .get(['sectionsById', sections, 'items', 'length'])
      .then((lengths) => ({
        lengths, sections, ref
      }));
  }

  _addItemToSections({lengths, sections, ref}) {
    return Promise.all(sections.map((sectionID, index) => {
      const section  = this.props.section.get(sectionID).formatForWire();
      let digUntilYouGetDamnLength;

      try {
        digUntilYouGetDamnLength = (lengths.sectionsById[sectionID].items || []).length;
      } catch(error) {
        console.error(error);
        return this.setState({
          requestError: 'Something went wrong while adding item to section ' + section.title
        });
      }

      section.items.push(ref);
      // save section and then dispatch action to update store state
      return API
        .set({
          url: ['sectionsById', sectionID, 'items', digUntilYouGetDamnLength],
          body: ref
        })
        .then(() => {
          this.props.actions.section.update(section);
        });
    }));
  }

  _preparingArrayOfSelectedSections(refMap) {
    let selectedSectionsArray = [];
    for(var menuKey in refMap) {
      if (refMap.hasOwnProperty(menuKey)) {
        refMap[menuKey].map((sectionItem) => {
          selectedSectionsArray.push(sectionItem);

        });
      }
    }
    return selectedSectionsArray;
  }

  async onEditItemDone(menuItem, refMap) {
    console.info("onEditItemDone");
    console.info(menuItem);
    console.info("onEditItemDone");
    /*
        refMap is an information in what menus and sections, the item has been added
     */
    menuItem.picUrl = "http://lorempixel.com/700/500/food/";
    let menuItemArray = [menuItem] ; //.formatForWire();
    let resultUpdateMenuItems = await falcorModel
      .call(
            ['restaurants', localStorage.restaurantID, 'menuItems','update'],
            [menuItemArray] // update requries an array
          ).
      then((result) => {
        return result;
      });

    this.props.actions.menuItem.update(menuItem);


    if(refMap !== undefined) {
      /* 
       there was an update in refMap! let's update sections
       */

      let currentITEMID = menuItem.id;
      let allSECTIONS = this.props.section;
      // STEPS:
      // 0. prepare currentITEMID
      // 1. prepare allSECTIONS
      // 2. delete all currentITEMID from all sections (in case if someone has unselected)
      let purgedSections = [];
      allSECTIONS.forEach((sectionItem) => {
        sectionItem.items = sectionItem.items.filter((itemID) => itemID !== currentITEMID);
        purgedSections.push(sectionItem);
      });
      // 3. OK, now let's add fresh new selected items selectedSectionsArray
      let selectedSectionsArray = this._preparingArrayOfSelectedSections(refMap);

      purgedSections.map((secItem, index) => {
        let __contains__ = selectedSectionsArray.filter((selectedID) => selectedID === secItem.id).length;
        /*
          __contains__ === OK, this is selected by user, we need push it into array
         */
        if(__contains__) {
          secItem.items.push(currentITEMID);
        }
        return secItem;
      });

      let sectionUpdateResult = await falcorModel
        .call(
              ['restaurants', localStorage.restaurantID, 'sections','update'],
              [purgedSections]          
            ).
        then((result) => {
          return result;
        });

      purgedSections.forEach((item) => {
        this.props.actions.section.update(item);
      });
    }

    this.setState({
      requestSuccess: 'Edit successful!',
      modal: null
    });

    return;
  }


  async onAddItemDone(newMenuItem, refMap) {

    console.info("newMenuItem");
    console.info(newMenuItem);
    console.info("newMenuItem");

    let result = await falcorModel
      .call(
            ['restaurants', localStorage.restaurantID, 'menuItems','add'],
            [newMenuItem]          
          ).
      then((result) => {
        return result;
      });

    const menuItemsLen = await falcorModel.getValue(
      ['restaurants', localStorage.restaurantID, 'menuItems', 'length']
    );

    let newMenuItemId = result.json.restaurants[localStorage.restaurantID].menuItems[menuItemsLen-1][1];
    newMenuItemId = newMenuItemId ? newMenuItemId : alert("error with newMenuItemId");
    newMenuItem.id = newMenuItemId;
    this.props.actions.menuItem.add(newMenuItem);
    /*
        UPDATING SECTIONS refMap below:
     */
    if (typeof refMap === "undefined"){
      this.setState({
        requestSuccess: 'Added new item - successful!',
        modal: null
      });     
    }
    else{

      let updatedSections = Object.keys(refMap).map((menuID) => {
        return refMap[menuID];
      }).map((sectionsIDarray) => {
        return sectionsIDarray.map((sectionID) => {
          let currentSection = this.props.section.get(sectionID);
          currentSection.items.push(newMenuItemId);
          return currentSection;
        })
      });

      let sectionUpdateResult = await falcorModel
        .call(
              ['restaurants', localStorage.restaurantID, 'sections','update'],
              [updatedSections[0]]          
            ).
        then((result) => {
          return result;
        });

      updatedSections[0].map((updatedSection) => {
        this.props.actions.section.update(updatedSection);
      });

      this.setState({
        requestSuccess: 'Added new item - successful!',
        modal: null
      });
    }

    

  }

  async onEditItemClick(menuItemIdToEdit) {
    this.setState({
      modal: 'add-modal',
      editItemId: menuItemIdToEdit
    });
  }

  async onDeleteItemClick(menuItemIdToDelete) {
    /*
        TODO: refactoring to delete obj from reducer & falcor
        via a model delete function! (Kamil)
     */
    /*
        UPDATING SECTIONS refMap below:
     */
    let allSections = this.props.section;

    let toUpdateSections = [];
    allSections.forEach((sectionItem, key) => { 
      let itemsArray = sectionItem.items;

      let newSectionItems = itemsArray.filter((id) => {
        return menuItemIdToDelete !== id;
      });

      if(newSectionItems.length !== itemsArray.length) {
        sectionItem.items = newSectionItems;
        toUpdateSections.push(sectionItem);
      }
    });

    let sectionUpdateResult = await falcorModel
      .call(
            ['restaurants', localStorage.restaurantID, 'sections','update'],
            [toUpdateSections]          
          ).
      then((result) => {
        return result;
      });

    let result = await falcorModel
      .call(
            ['restaurants', localStorage.restaurantID, 'menuItems', 'delete'],
            [menuItemIdToDelete]          
          ).
      then((result) => {
        return result;
      });

    this.props.actions.menuItem.delete(menuItemIdToDelete);

    this.setState({
      requestSuccess: 'Menu item deleted',
      modal: null
    });

    return;
  }



  async onRemoveItemClick(menuItemIdToDelete, sectionIdOfRemovedItem = null) {
    if(sectionIdOfRemovedItem === null) {
      console.warn("sectionIdOfRemovedItem can't be null");
      alert("error: sectionIdOfRemovedItem can't be null")
      return;
    }

    let sectionObj = this.props.section;
    let sectionsToUpdate = [];
    sectionObj.forEach((section, index) => {
      let sectionId = section.id;
      let newItems = [];
      section.items.forEach((itemId, index) => {
        let notForRemovalFromSection = sectionId !== sectionIdOfRemovedItem;
        let notForRemovalItem = itemId !== menuItemIdToDelete;

        if(notForRemovalFromSection || notForRemovalItem) {
          // OK it's not the removal item and section, so let's push it
          newItems.push(itemId);
        }
      });
      if(section.items.length !== newItems.length) {
        section.items = newItems;
        sectionsToUpdate.push(section);
      }
    })

    Promise.all(
      sectionsToUpdate.map((section, index) => {

        section = section.formatForWire();
        console.log(section);
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
    );
    return;
  }



  render() {
    const { requestError, requestSuccess } = this.state;
    const { menuItem } = this.props;
    const items = [];

    menuItem.forEach((item, index) => {
      if(item.id) {
        items.push(
          <div> 
            <MenuListItem 
              sections={this.props.section} 
              menus={this.props.menu} 
              item={item} 
              key={item.id} 
              onDeleteClick={this.onDeleteItemClick} 
              onEditClick={this.onEditItemClick} /> 
              <br/> 
          </div>
        );
      }
    });


    let addingEditingItemJSX;

    if(this.state.modal === 'add-modal') {
      addingEditingItemJSX = (<div>
          <AddMenuItemModal
            editItemId={this.state.editItemId}
            onDone={this.state.editItemId ? this.onEditItemDone : this.onAddItemDone}
            onHide={this.hideModal}
            menus={this.props.menu}
            menuItems={this.props.menuItem}
            sections={this.props.section}
            title={this.state.editItemId ? "Edit menu item" : "Add menu item"}
            open={this.state.modal === 'add-modal'} />

          <ErrorSuccessMsg
            errorMessage={requestError}
            successMessage={requestSuccess}
            onRequestClose={this.nullifyRequestState} />
        </div>);
    } else {
        addingEditingItemJSX = 
          localStorage.role !== 'admin' 
        ? 
          <span /> 
        :
          (
            <FloatingActionButton style={btnStyle} onClick={ /* this.onAddItemDone.bind(this, "this","this")*/ this._openModal.bind(this, 'add-modal')}>
              <ContentAdd />
            </FloatingActionButton>
          );
    }

    if(this.props.isMenuDetailView) {
      /*
       RENDERING detailView
      */
      const { menu } = this.props.menuDetailProps;

      if(!this.props.menuDetailProps.loaded) {
        return this.props.menuDetailProps.__getLoaderMarkup();
      }

      if(!menu.sections || !menu.sections.length) {
        return (
          <div style={{paddingTop: 200}}>
            <AddPlaceholder title="menu" onAdd={this.onAddMenu} />
            {addingEditingItemJSX}
          </div>
        );
      } else {
        return (
          <div className="Content MenuList">
          <h2>{menu.title}</h2>
          {
            menu.sections.map((section) => {
              return (
                <MenuSection
                  currentMenuId={this.props.currentMenuId}
                  isFromLibraryDelete={true}
                  onDeleteClick={this.onRemoveItemClick} 
                  onEditClick={this.onEditItemClick}
                  sections={this.props.section} 
                  menus={this.props.menu} 
                  sectionId={section}
                  key={section} />
              );
            })
          }
          {addingEditingItemJSX}
          </div>
        );
      }
    }

    return (
      <div className="mt100 Content">
        <Allergens allergyGuide={true} />
        <h2>Menu items library</h2>
        {items}
        {addingEditingItemJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLibraryView);
