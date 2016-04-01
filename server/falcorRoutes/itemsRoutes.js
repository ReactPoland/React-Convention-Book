import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

module.exports = [
 {
    route: 'menuItemsById[{keys}]["title", "id", "description", "picUrl", "allergens"]',
    get: function(pathSet) {
      let menuItemsIDs = pathSet[1];
      let allergensObject;
      return models.MenuItemCollection.find({
            '_id': { $in: menuItemsIDs}
        }, function(err, menuItemsDocs) {
          return menuItemsDocs;
        }).then ((menuItemsArrayFromDB) => {
          let results = [];

          menuItemsArrayFromDB.map((menuItemObject) => {
            let resObj = menuItemObject.toObject();
            delete resObj.id;

            /*
                TO-DO: this is temporary solution
             */
            resObj.allergens = "STRING";
            console.info("***** THIS IS TEMPORARY THAT resObj.allergens ===", resObj.allergens, "TODO-please fix it");



            resObj.id = String(resObj["_id"]);
            

            const allergenPathAndValue = {
              path: ["menuItemsById", resObj.id, "allergens"],
              value: resObj.allergens
            };

            delete resObj["_id"];

            results.push({
              path: ["menuItemsById", resObj.id],
              value: resObj
            });
          });
          return results;
        });
    }
  }, {
    /*
        USED on frontend in views/MenuLibraryView.js 
     */
    route: 'restaurants[0].menuItems[{integers}]',
    get: (pathSet) => {
      let menuItemsIndexes = pathSet[3];
      return models.MenuItemCollection.find({}, '_id', function(err, menuItemsDocs) {
          return menuItemsDocs;
        }).then ((menuItemsArrayFromDB) => {
          let results = [];
          menuItemsIndexes.map((index) => {
            let res;
            if (menuItemsArrayFromDB.length - 1 < index) { 
              res = {
                path: ['restaurants', 0, 'menuItems', index],
                invalidate: true
              };
              results.push(res);
              return;
            }
            let menuItemObject = menuItemsArrayFromDB[index].toObject();
            let currentMongoID = String(menuItemObject["_id"]);
            let newmenuItemRef = $ref(['menuItemsById', currentMongoID]);

            res = {
              path: ['restaurants', 0, 'menuItems', index],
              value: newmenuItemRef,
            };
            results.push(res);
          });

          return results;
        })
    }
  }
];