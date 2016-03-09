import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/lib/svg-icons';


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

    console.log("UNDEFINIED!!!!!!");
    console.log(this.props.menuItem);
    console.log("UNDEFINIED!!!!!!");

    this.hideModal = this.hideModal.bind(this);
    this.onAddItemDone = this.onAddItemDone.bind(this);
    this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    this.onEditItemClick = this.onEditItemClick.bind(this);
    this.onEditItemDone = this.onEditItemDone.bind(this);
    this.nullifyRequestState = this.nullifyRequestState.bind(this);

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
    console.info("\n\n componentDidMount \n\n");
    this._fetchData();
  }

  async _fetchData() {

    console.info("IMPLEMENTED #3");

    const response = await API.get(
      ['restaurants', 0, 'menuItems', {from: 0, to: 5}, ['id', 'title', 'description', 'picUrl']]
    );

    console.info("RESULT #3", response);


    console.info("IMPLEMENTED #4");
    const response2 = await API.get(
      ['restaurants', 0, 'sections', {from: 0, to: 100}, ['id', 'title', 'items'], {from: 0, to: 100}, 'id']
    );

    console.info("RESULT #4", response2);

    const items = falcorUtils.makeArray({object: response.restaurants[0], name: 'menuItems'});
    const sections = falcorUtils.makeArray({object: response2.restaurants[0], name: 'sections'});
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
          .getValue(['restaurants', 0, 'menuItems', 'length'])
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
    /*
        refMap is an information in what menus and sections, the item has been added
     */
    menuItem.picUrl = "http://lorempixel.com/700/500/food/";
    menuItem = menuItem.formatForWire();
    
    await API
    .set({
      url: ['menuItemsById', menuItem.id],
      body: menuItem
    })
    .then(() => {
      this.props.actions.menuItem.update(menuItem);
    });


    if(refMap === undefined) { 
      // no changes in the menuItem's sections
      this.setState({
        requestSuccess: 'Edit successful! Without sections changing.',
        modal: null
      });
      this._fetchData();
      return;
    }

    // Preparing array of selected sections
    let selectedSectionsArray = this._preparingArrayOfSelectedSections(refMap);
    let changedSections = [];
    // Check what sections has been edited
    this.props.section.forEach((secItem, secId) => {
      // searching for edited sections' items
      let _contains_ = selectedSectionsArray.find(x => x === secItem.id);
      if(_contains_ !== undefined) {
        let _contains2_ = secItem.items.find(y => y === menuItem.id);
        // checking if a menuItemId isn't already in the secItems.items
        if(_contains2_ === undefined) {
          secItem.items.push(menuItem.id);
          changedSections.push(secItem);
        }
      }
    });

    // TODO removing sections
    // TODO: API.set for changedSections
    // save section and then dispatch action to update store state

    for(var k in changedSections) {
      let sectionID = changedSections[k].id;
      changedSections[k] = changedSections[k].formatForWire();

      await API
        .set({
          url: ['sectionsById', sectionID],
          body: changedSections[k]
        })
        .then(() => {
          this.setState({
            requestSuccess: 'Edit successful!',
            modal: null
          });
        });
    }
    this._fetchData();
    return;
  }

  onAddItemDone(menuItem, refMap) {
    // TODO temp mocking item image
    menuItem.picUrl = "http://lorempixel.com/700/500/food/";
    // menuItem = menuItem.formatForWire(); TO-ASK

    this._createMenuItemAndGetRef(menuItem)
      // make $ref to it in restaurant.menuItems
      .then(({size, ref}) => {
        console.log('first chained function', size, ref)
        return API
          .set({
            url: ['restaurants', 0, 'menuItems', size],
            body: ref
          })
          .then(() => ref);
      })
      // get items count within each needed section
      .then((ref) => {
        console.log('second chained function', ref, refMap)
        return this._getItemsLengthsInSections(ref, refMap);
      })
      // UPDATE ALL DA SECTIONZ!!!
      .then(({lengths, sections, ref}) => {
        console.log('third chained function', lengths, sections, ref)
        return this._addItemToSections({lengths, sections, ref});
      })
      .then(() => {
        this.setState({
          requestSuccess: 'Saved!',
          modal: null
        });
      });
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
    let sectionObj = this.props.section;
    let sectionsToUpdate = [];
    sectionObj.forEach((section, index) => {
      let sectionId = section.id;
      let newItems = [];
      section.items.forEach((itemId, index) => {
        if(itemId !== menuItemIdToDelete) {
          newItems.push(itemId);
        }
      });
      if(section.items.length !== newItems.length) {
        section.items = newItems;
        sectionsToUpdate.push(section);
      }
    })

    this.props.actions.menuItem.delete(menuItemIdToDelete);

    let newItems = mapHelpers.toArray(this.props.menuItem);
    newItems = newItems
      .filter((item) => item.id !== menuItemIdToDelete)
      .map((item) => ({
        $type: 'ref',
        value: ['menuItemsById', item.id]
      }));

    await API.set({
      url: ['restaurants', 0, 'menuItems'],
      body: newItems
    });

    API.$log('############falcor model: ')

    Promise.all(
      sectionsToUpdate.map((section, index) => {

        section = section.formatForWire();

        console.log("PROMISE", section.id);
        console.log("11KAMIL PROMISE UPDATING SECTION");
        console.log(section);
        return API
          .set({
            url: ['sectionsById', section.id],
            body: section
          })
          .then(() => {
            console.log("22KAMIL UPDATING SECTION");
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
        addingEditingItemJSX = (
          <FloatingActionButton style={btnStyle} onClick={this._openModal.bind(this, 'add-modal')}>
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
                  isFromLibraryDelete={true}
                  onDeleteClick={this.onDeleteItemClick} 
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
