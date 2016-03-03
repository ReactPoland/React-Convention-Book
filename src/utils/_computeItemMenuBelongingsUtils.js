// this.props.editItemId
// this.props.sections
// this.props.menus

export default {
  _computeBelongingsMapUtil(searchedItemId, sections, menus) {
    let sectionsBelongings = [];
    sections.forEach((sectionItem, index1) => {
      sectionItem.items.map((idItem, sectionIndex) => {
        if(searchedItemId.toString() === idItem.toString()) {
          sectionsBelongings.push(sectionItem.id);
        }
      })
    });

    let computedBelongingsMap = {};

    menus.forEach((menuItem, menuIndex) => {
      computedBelongingsMap[menuItem.id] = [];
      let sectionsArray = menuItem.sections;
      sectionsArray.map((secItem, secIndex) => {

        if(sectionsBelongings.find(x => x === secItem) !== undefined) {
          computedBelongingsMap[menuItem.id].push(secItem);
        }
      });

      let foundLen = computedBelongingsMap[menuItem.id].length;
      if(foundLen === 0) {
        // deleting from the belingings map keys with empty arrays
        delete computedBelongingsMap[menuItem.id];
      }
    });
    // this.setState({belongingsMap: computedBelongingsMap});
    return computedBelongingsMap;
    // this._createBelongingsString(computedBelongingsMap, menus, secions);
  },

  _createBelongingsStringUtil(computedBelongingsMap, sectionsMap, menusMap) {
    let belongingsString =  { 
    };

    for(var menuKey in computedBelongingsMap) {
      console.log("****", menuKey);
      console.log("** menusMap **", menusMap);
      console.log(">>>>>", menusMap.get(menuKey));
      let menuTitle = menusMap.get(menuKey).title;
      belongingsString[menuTitle] = [];
      let sectionsIds = computedBelongingsMap[menuKey];
      sectionsIds.map((secId, index) => {
        let sectionTitle = sectionsMap.get(secId).title;
        belongingsString[menuTitle].push(sectionTitle);
      });
    }

    // this.setState({belongingsString: belongingsString});
    return belongingsString;
  }
}