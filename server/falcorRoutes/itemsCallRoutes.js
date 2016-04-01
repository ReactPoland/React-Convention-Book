import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


module.exports = [
  {
  route: 'restaurants[{integers}].menuItems.delete',
  call: (callPath, args) => 
    {
      let toDeleteMenuItemId = args[0];
      return models.MenuItemCollection.find({ _id: toDeleteMenuItemId }).remove((err) => {
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
        newMenuItemObj.description = JSON.stringify(newMenuItemObj.description);
        newMenuItemObj.description2 = JSON.stringify(newMenuItemObj.description2);
        newMenuItemObj.description3 = JSON.stringify(newMenuItemObj.description3);
        
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
        let results = [];

        for(var key in updatedMenuItems) {
          let updatedMenuItem = updatedMenuItems[key];
          let menuItemID = updatedMenuItem.id;
          updatedMenuItem.sectionsById = updatedMenuItem.sections;
          let menuItem = new models.MenuItemCollection(updatedMenuItem);
          let menuItemData = menuItem.toObject();
          delete menuItemData._id;

          menuItemData.description = JSON.stringify(updatedMenuItem.description);
          menuItemData.description2 = JSON.stringify(updatedMenuItem.description2);
          menuItemData.description3 = JSON.stringify(updatedMenuItem.description3);

          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
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

