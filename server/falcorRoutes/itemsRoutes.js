import models from '../modelsMongoose';
import { downloadImage, uploadImage } from '../helpers/fileSystem';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;


export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
   {
      route: 'menuItemsById[{keys}]["title", "id", "description", "picUrl", "allergens"]',
      get: async function(pathSet) {
        let menuItemsIDs = pathSet[1];
        let allergensObject;

        let result = await models.MenuItemCollection.find({
          '_id': { $in: menuItemsIDs}
        }, function(err, menuItemsDocs) {
          return menuItemsDocs;
        }).then ((menuItemsArrayFromDB) => {
          let results = [];

          return new Promise((resolve, reject) => {
            menuItemsArrayFromDB.map(async (menuItemObject) => {
              let resObj = menuItemObject.toObject();
              delete resObj.id;

              /*
                  TO-DO: this is temporary solution
               */
              resObj.id = String(resObj["_id"]);

              delete resObj["_id"];

              let awsImage = await downloadImage({
                bucket: 'menu-item',
                id: resObj.id
              });

              if (awsImage != null) {
                resObj.picUrl = awsImage;
              }

              resObj.allergens = $atom(resObj.allergens);
              results.push({
                path: ["menuItemsById", resObj.id],
                value: resObj
              });

              if (results.length === menuItemsArrayFromDB.length) {
                return resolve(results);
              }
            });
          });
        });

        return result;
      }
    }, {
      /*
          USED on frontend in views/MenuLibraryView.js
       */
      route: 'restaurants[{keys}].menuItems[{integers}]',
      get: (pathSet) => {
        let menuItemsIndexes = pathSet[3];
        let restIDnow = pathSet[1][0];
        let andStatementQuery = {
          ownedByRestaurantID: restIDnow
        }

        return models.MenuItemCollection.find(andStatementQuery, '_id', function(err, menuItemsDocs) {
            return menuItemsDocs;
          }).then ((menuItemsArrayFromDB) => {
            let results = [];
            menuItemsIndexes.map((index) => {
              let res;
              if (menuItemsArrayFromDB.length - 1 < index) {
                res = {
                  path: ['restaurants', sessionObject.restaurantid, 'menuItems', index],
                  invalidate: true
                };
                results.push(res);
                return;
              }
              let menuItemObject = menuItemsArrayFromDB[index].toObject();
              let currentMongoID = String(menuItemObject["_id"]);
              let newmenuItemRef = $ref(['menuItemsById', currentMongoID]);

              res = {
                path: ['restaurants', sessionObject.restaurantid, 'menuItems', index],
                value: newmenuItemRef,
              };
              results.push(res);
            });

            return results;
          })
      }
    },
    {
      route: 'menuItem.uploadPicture',
      call: async function(callPath, args) {
        let file = args[0];
        let itemId = args[2];

        if (file) {
          return uploadImage({
            bucket: 'menu-item',
            id: itemId,
            file
          });
        } else {
          console.info('No file to upload');
          return false;
        }
      }
    }
  ];
}
