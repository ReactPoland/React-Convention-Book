import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };
    
  return [
    {
      route: 'newsById[{keys}]',
      get: function(pathSet) {
        /*
          TUTAJ IDZIE PO REFACH FALCOR'a z $ref(['newsById', currentMongoID]);
         */
        console.info(10);
        let newsIDs = pathSet[1];
        console.info(11);
        let itemsById;
        console.info(12);
        return models.NewsItemCollection.find({
              '_id': { $in: newsIDs}
          }, function(err, newsDocs) {
            return newsDocs;
          }).then ((newsArrayFromDB) => {
            console.info(13);
            let results = [];
            newsArrayFromDB.map((newsItemObject) => {
              let resObj = newsItemObject.toObject();
              delete resObj.id;
              resObj.id = String(resObj["_id"]);
              delete resObj["_id"];

              results.push({
                path: ["newsById", resObj.id],
                value: resObj
              });
            });
            ///////////////////
            ///////////////////
            ///////////////////
            console.info('here below check if results falcor json envelope looks good:');
            console.info(JSON.stringify(results));
            console.info('if not then please debug');
            ///////////////////
            ///////////////////
            ///////////////////


            return results;
          });
      }
    },
    {
      /*
          USED on IMPLEMENTED #4 frontend in views/MenuLibraryView.js 
       */


      route: 'restaurants[{keys}].news[{integers}]',
      get: (pathSet) => {
        console.info(1);
        let newsIndexes = pathSet[3];
        console.info(2);
        let restIDnow = pathSet[1][0];
        console.info(3);
        let andStatementQuery = {
          ownedByRestaurantID: restIDnow
        }

        console.info(4);
        
        return models.NewsItemCollection.find(andStatementQuery, '_id', function(err, newsDocs) {
            return newsDocs;
          }).then ((newsArrayFromDB) => {
            console.info(5);
            let results = [];
            newsIndexes.map((index) => {
              console.info(6);
              let res;
              if (newsArrayFromDB.length - 1 < index) { 
                res = {
                  path: ['restaurants', sessionObject.restaurantid, 'news', index],
                  invalidate: true
                };
                results.push(res);
                return;
              }
              let newsItemObject = newsArrayFromDB[index].toObject();
              let currentMongoID = String(newsItemObject["_id"]);
              let newsItemItemRef = $ref(['newsById', currentMongoID]);

              res = {
                path: ['restaurants', sessionObject.restaurantid, 'news', index],
                value: newsItemItemRef,
              };
              results.push(res);
            });
            console.info(7);

            ///////////////////
            ///////////////////
            ///////////////////
            console.info('here below check if results falcor json envelope looks good:');
            console.info(JSON.stringify(results));
            console.info('if not then please debug');
            ///////////////////
            ///////////////////
            ///////////////////


            return results;
          })
      }
    },
    {
      route: 'restaurants[{keys}].news.length',
      get: (callPath, args) => {
        return models.NewsItemCollection.count({}, function(err, count) {
          return count;
        }).then ((count) => {
          return {
            path: ['restaurants', sessionObject.restaurantid, 'news', 'length'],
            value: count
          }
        });
      }
    }
  ];
}
