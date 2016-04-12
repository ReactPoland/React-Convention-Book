import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    {
    route: 'restaurants[{integers}].menus.delete',
    call: (callPath, args) => 
      {
        let toDeleteMenuId = args[0];
        return models.MenuCollection.find({ _id: toDeleteMenuId }).remove((err) => {
          return [
            {
              path: ["menusById", toDeleteMenuId],
              invalidate: true
            }
          ]
        });
      }
    },
    {
    route: 'restaurants[{integers}].menus.add',
    call: (callPath, args) => 
      {
        let newMenuObj = args[0];
        newMenuObj.ownedByRestaurantID = sessionObject.restaurantid;
        var menu = new models.MenuCollection(newMenuObj);
        return menu.save(function (err, data) {
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
            return models.MenuCollection.count({}, function(err, count) {
            }).then((count) => {
              return { count, data };
            });

          }).then ((res) => {
            let newMenuDetail = res.data.toObject();
            let NewMenuRef = $ref(['menusById', newMenuDetail["_id"]]);
            
            let results = [
              {
                path: ['restaurants', 0, 'menus', res.count-1],
                value: NewMenuRef
              },
              {
                path: ['restaurants', 0, 'menus', 'length'],
                value: res.count
              }
            ];

            return results;
          });
      }
    },
    {
      route: 'restaurants[{integers}].menus.length',
      get: (callPath, args) => {
        return models.MenuCollection.count({}, function(err, count) {
          return count;
        }).then ((count) => {
          return {
            path: ['restaurants', 0, 'menus', 'length'],
            value: count
          }
        });
      }
    },
    {
    route: 'restaurants[{integers}].menus.update',
    call: async (callPath, args) => 
      {
        let updatedMenus = args[0];

        console.info("-------> ", updatedMenus);
        console.info("<-------");
        let results = [];

        for(var key in updatedMenus) {
          let updatedMenu = updatedMenus[key];
          console.info("updatedMenu", updatedMenu);
          let menuID = updatedMenu.id;
          updatedMenu.sectionsById = updatedMenu.sections;
          updatedMenu.ownedByRestaurantID = sessionObject.restaurantid;
          let menu = new models.MenuCollection(updatedMenu);
          let menuData = menu.toObject();
          delete menuData._id;
          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
          console.info("111------------&****");
          console.info(JSON.stringify(menuData, null, 4));
          console.info("111------------&****");

          models.MenuCollection.update(
            { _id: menuID }, 
            menuData, 
            { multi: false }, 
            function(err) {
              if(err) { throw err; }
              console.info("UPDATED menu SIR!"+menuID);
          });

          let updatedMenuPath = {
            path: ["menusById", menuID],
            invalidate: true
          };
          results.push(updatedMenuPath);
        }

        return results;
      }
    }
  ];    
}
