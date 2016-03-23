import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


module.exports = [
  {
  route: 'restaurants[{integers}].menuItems.remove',
  call: (callPath, args) => 
    {
      let toDeleteMenuItemId = args[0];
      

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
  }
];

