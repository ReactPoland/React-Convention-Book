import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;
export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    {
    route: 'restaurantsManage[{integers}].delete',
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
    route: 'restaurantsManage.add',
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
                path: ['restaurantsManage', res.count-1],
                value: NewRestaurantRef
              },
              {
                path: ['restaurantsManage', 'length'],
                value: res.count
              }
            ];

            return results;
          });
      }
    },
    {
      route: 'restaurantsManage.length',
      get: (callPath, args) => {
        return models.RestaurantCollection.count({}, function(err, count) {
          return count;
        }).then ((count) => {
          return {
            path: ['restaurantsManage', 'length'],
            value: count
          }
        });
      }
    },
    {
    route: 'restaurantsManage.update',
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
      /*
          USED on frontend in layouts/SideNav.js 
       */
      route: 'restaurantsManage[{integers}]',
      get: (pathSet) => {
        return models.RestaurantCollection.find({}, function(err, restaurantsDocs) {
            return restaurantsDocs;
          })
            .sort({orderNumber: 1})
            .then ((restaurantsArrayFromDB) => {
            console.info("\n\n\n 111 SORTED", restaurantsArrayFromDB, "\n\n\n 111 SORTED",);
            let results = [];
            restaurantsArrayFromDB.map((item, index) => {
              let res;
              let restaurantObject = restaurantsArrayFromDB[index].toObject();
              res = {
                path: ['restaurantsManage', index],
                value: $atom(restaurantObject)
              };
              results.push(res);
            });

            console.info('---->', JSON.stringify(results));
            
            return results;
          })
      }
    },
  ];
}

