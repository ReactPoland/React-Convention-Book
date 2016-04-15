import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    { 
      route: 'menusById[{keys}]',
      get: function(pathSet) {
        let menusIDs = pathSet[1];

        return models.MenuCollection.find({
              '_id': { $in: menusIDs}
          }, function(err, menusDocs) {
            return menusDocs;
          })
            .then ((menusArrayFromDB) => {
            let results = [];
            let sectionsById;
            menusArrayFromDB.map((menuObject) => {
              let resObj = menuObject.toObject();
              delete resObj.id;
              resObj.id = String(resObj["_id"]);
              delete resObj["_id"];

              sectionsById = resObj.sectionsById;
              delete resObj.sectionsById;

              results.push({
                path: ["menusById", resObj.id],
                value: resObj
              });

              sectionsById.map((sectionID, index) => {
                results.push({
                    path: ["menusById", resObj.id, "sections", index],
                    value: $ref(['sectionsById', sectionID])
                  });
              });

            });

            return results;
          });
      }
    },
  {
      /*
          USED on frontend in layouts/SideNav.js 
       */
      route: 'restaurants[{keys}].menus[{integers}]',
      get: (pathSet) => {
        let menusIndexes = pathSet[3];
        let restIDnow = pathSet[1][0];

        let andStatementQuery = {
          ownedByRestaurantID: restIDnow
        }

        return models.MenuCollection.find(andStatementQuery, '_id', function(err, menusDocs) {
            return menusDocs;
          })
            .sort({orderNumber: 1})
            .then ((menusArrayFromDB) => {
            let results = [];
            menusIndexes.map((index) => {
              let res;
              if (menusArrayFromDB.length - 1 < index) { 
                res = {
                  path: ['restaurants', sessionObject.restaurantid, 'menus', index],
                  invalidate: true
                };
                results.push(res);
                return;
              }

              let menuObject = menusArrayFromDB[index].toObject();
              let currentMongoID = String(menuObject["_id"]);
              let menuItemRef = $ref(['menusById', currentMongoID]);

              res = {
                path: ['restaurants', sessionObject.restaurantid, 'menus', index],
                value: menuItemRef,
              };
              results.push(res);
            });

            return results;
          })
      }
    },
  ];
}

