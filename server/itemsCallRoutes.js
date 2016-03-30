import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


module.exports = [
  {
  route: 'restaurants[{integers}].menuItems.delete',
  call: (callPath, args) => 
    {
      let toDeleteMenuItemId = args[0];
      return models.MenuItemCollection.find({ _id: toDeleteMenuItemId }).remove((err) => {
        console.info("REMOVED");
        return [
          {
            path: ["menuItemsById", toDeleteMenuItemId],
            invalidate: true
          }
        ]
      });
    }
  },
  {
    route: 'restaurants[{integers}].menuItems.add',
    call: (callPath, args) => 
      {
        let newMenuItemObj = args[0];

        var menuItem = new models.MenuItemCollection(newMenuItemObj);
        return menuItem.save(function (err, data) {
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
            return models.MenuItemCollection.count({}, function(err, count) {
            }).then((count) => {
              return { count, data };
            });

          }).then ((res) => {
            let newItemDetail = res.data.toObject();
            let NewMenuItemRef = $ref(['menuItemsById', newItemDetail["_id"]]);
            
            let results = [
              {
                path: ['restaurants', 0, 'menuItems', res.count-1],
                value: NewMenuItemRef
              },
              {
                path: ['restaurants', 0, 'menuItems', 'length'],
                value: res.count
              }
            ];

            return results;
          });
      }
  },
  {
    route: 'restaurants[{integers}].menuItems.length',
    get: (callPath, args) => {
      return models.MenuItemCollection.count({}, function(err, count) {
        return count;
      }).then ((count) => {
        return {
          path: ['restaurants', 0, 'menuItems', 'length'],
          value: count
        }
      });
    }
  },
  {
    route: 'restaurants[{integers}].menuItems.update',
    call: async (callPath, args) => 
      {
        let updatedMenuItems = args[0];

        console.info("-------> ", updatedMenuItems);
        console.info("<-------");
        let results = [];

        for(var key in updatedMenuItems) {
          let updatedMenuItem = updatedMenuItems[key];
          console.info("updatedMenuItem", updatedMenuItem);
          let menuItemID = updatedMenuItem.id;
          updatedMenuItem.sectionsById = updatedMenuItem.sections;
          let menuItem = new models.MenuItemCollection(updatedMenuItem);
          let menuItemData = menuItem.toObject();
          delete menuItemData._id;
          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
          console.info("111------------&****");
          console.info(JSON.stringify(menuItemData, null, 4));
          console.info("111------------&****");

          models.MenuItemCollection.update(
            { _id: menuItemID }, 
            menuItemData, 
            { multi: false }, 
            function(err) {
              if(err) { throw err; }
              console.info("UPDATED menuItem SIR!"+menuItemID);
          });

          let updatedMenuItemPath = {
            path: ["menuItemsById", menuItemID],
            invalidate: true
          };
          results.push(updatedMenuItemPath);
        }

        return results;
      }
  }
];

