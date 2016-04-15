import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    {
    route: 'restaurants[{keys}].delete',
    call: (callPath, args) => 
      {
        let toDeleteRestaurantId = args[0];
        return models.RestaurantCollection.find({ _id: toDeleteRestaurantId }).remove((err) => {
          return [
            {
              path: ["restaurantsById", toDeleteRestaurantId],
              invalidate: true
            }
          ]
        });
      }
    },
    {
    route: 'restaurants[{keys}].add',
    call: (callPath, args) => 
      {
        let newRestaurantObj = args[0];
        var restaurant = new models.RestaurantCollection(newRestaurantObj);
        return restaurant.save(function (err, data) {
            if (err) {
              console.info("ERROR", err);
              return err;
            }
            else {
              return data;
            }
          }).then ((data) => {
            /*
              got new obj data, now let's get count:
             */
            return models.RestaurantCollection.count({}, function(err, count) {
            }).then((count) => {
              return { count, data };
            });

          }).then ((res) => {
            let newRestaurantDetail = res.data.toObject();
            let NewRestaurantRef = $ref(['restaurantsById', newRestaurantDetail["_id"]]);
            
            let results = [
              {
                path: ['restaurants', res.count-1],
                value: NewRestaurantRef
              },
              {
                path: ['restaurants', 'length'],
                value: res.count
              }
            ];

            return results;
          });
      }
    },
    {
      route: 'restaurants.length',
      get: (callPath, args) => {
        return models.RestaurantCollection.count({}, function(err, count) {
          return count;
        }).then ((count) => {
          return {
            path: ['restaurants', 'length'],
            value: count
          }
        });
      }
    },
    {
    route: 'restaurants[{keys}].update',
    call: async (callPath, args) => 
      {
        let updatedRestaurants = args[0];

        let results = [];

        for(var key in updatedRestaurants) {
          let updatedRestaurant = updatedRestaurants[key];
          console.info("updatedRestaurant", updatedRestaurant);
          let restaurantID = updatedRestaurant.id;
          let restaurant = new models.RestaurantCollection(updatedRestaurant);
          let restaurantData = restaurant.toObject();
          delete restaurantData._id;
          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
          models.RestaurantCollection.update(
            { _id: restaurantID }, 
            restaurantData, 
            { multi: false }, 
            function(err) {
              if(err) { throw err; }
              console.info("UPDATED restaurant SIR!"+restaurantID);
          });

          let updatedRestaurantPath = {
            path: ["restaurantsById", restaurantID],
            invalidate: true
          };
          results.push(updatedRestaurantPath);
        }

        return results;
      }
    },
    { 
      route: 'restaurantsById[{keys}]',
      get: function(pathSet) {
        let restaurantsIDs = pathSet[1];

        return models.RestaurantCollection.find({
              '_id': { $in: restaurantsIDs}
          }, function(err, restaurantsDocs) {
            return restaurantsDocs;
          })
            .then ((restaurantsArrayFromDB) => {
            let results = [];
            restaurantsArrayFromDB.map((restaurantObject) => {
              let resObj = restaurantObject.toObject();
              delete resObj.id;
              resObj.id = String(resObj["_id"]);
              delete resObj["_id"];
              results.push({
                path: ["restaurantsById", resObj.id],
                value: resObj
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
      route: 'restaurants[{keys}]',
      get: (pathSet) => {
        let restaurantsIndexes = pathSet[3];

        return models.RestaurantCollection.find({}, '_id', function(err, restaurantsDocs) {
            return restaurantsDocs;
          })
            .sort({orderNumber: 1})
            .then ((restaurantsArrayFromDB) => {
            console.info("111 SORTED", restaurantsArrayFromDB);
            let results = [];
            restaurantsIndexes.map((index) => {
              let res;
              if (restaurantsArrayFromDB.length - 1 < index) { 
                res = {
                  path: ['restaurants', index],
                  invalidate: true
                };
                results.push(res);
                return;
              }

              let restaurantObject = restaurantsArrayFromDB[index].toObject();
              let currentMongoID = String(restaurantObject["_id"]);
              let restaurantItemRef = $ref(['restaurantsById', currentMongoID]);

              res = {
                path: ['restaurants', index],
                value: restaurantItemRef,
              };
              results.push(res);
            });

            return results;
          })
      }
    },
  ];
}

