import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };
    
  return [
    {
      route: 'sectionsById[{keys}]',
      get: function(pathSet) {
        let sectionsIDs = pathSet[1];
        let itemsById;
        return models.SectionCollection.find({
              '_id': { $in: sectionsIDs}
          }, function(err, sectionsDocs) {
            return sectionsDocs;
          }).then ((sectionsArrayFromDB) => {
            let results = [];
            sectionsArrayFromDB.map((sectionObject) => {
              let resObj = sectionObject.toObject();
              delete resObj.id;
              resObj.id = String(resObj["_id"]);
              delete resObj["_id"];

              itemsById = resObj.items;
              delete resObj.items;

              results.push({
                path: ["sectionsById", resObj.id],
                value: resObj
              });

              itemsById.map((itemID, index) => {
                results.push({
                    path: ["sectionsById", resObj.id, "items", index],
                    value: $ref(['menuItemsById', itemID])
                  });
              });
            });


            return results;
          });
      }
    },
    {
      /*
          USED on IMPLEMENTED #4 frontend in views/MenuLibraryView.js 
       */


      route: 'restaurants[{keys}].sections[{integers}]',
      get: (pathSet) => {
        let sectionsIndexes = pathSet[3];
        let restIDnow = pathSet[1][0];
        console.info("restIDnow");
        console.info("restIDnow");
        console.info("restIDnow");
        console.info(restIDnow);
        console.info("restIDnow");
        console.info("restIDnow");
        console.info("restIDnow");
        let andStatementQuery = {
          ownedByRestaurantID: restIDnow
        }
        
        return models.SectionCollection.find(andStatementQuery, '_id', function(err, sectionsDocs) {
            return sectionsDocs;
          }).then ((sectionsArrayFromDB) => {
            let results = [];
            sectionsIndexes.map((index) => {
              let res;
              if (sectionsArrayFromDB.length - 1 < index) { 
                res = {
                  path: ['restaurants', sessionObject.restaurantid, 'sections', index],
                  invalidate: true
                };
                results.push(res);
                return;
              }
              let sectionObject = sectionsArrayFromDB[index].toObject();
              let currentMongoID = String(sectionObject["_id"]);
              let sectionItemRef = $ref(['sectionsById', currentMongoID]);

              res = {
                path: ['restaurants', sessionObject.restaurantid, 'sections', index],
                value: sectionItemRef,
              };
              results.push(res);
            });

            return results;
          })
      }
    }
  ];
}
