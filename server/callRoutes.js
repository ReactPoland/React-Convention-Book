import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;



var MOCKitemID = "backend123456IDMOCKitemID";
var MOCKitem = {
  "id": MOCKitemID,
  "title": "test BAZA",
  "description": "1",
  "type": "MenuItem",
  "description2": "2",
  "description3": "3",
  "allergens": {
    "type": "Allergens",
    "vegetarian": true,
    "gluten": true,
    "egg": true,
    "dairy": true,
    "nut": true,
    "soy": true,
    "fish": true,
    "showAllergens": true
  }
};

// ..... TODO IMPORTANT: prepare backend steps
// TODO IMPORTANT: prepare backend steps
// TODO IMPORTANT: prepare backend steps
// TODO IMPORTANT: prepare backend steps

module.exports = [{
  route: 'restaurants[{integers}].menuItems.add',
  call: (callPath, args) => {
      let NewMenuItemRef = $ref(['menuItemsById', MOCKitemID]);

      // the INDEX somehow has to be calculated from mongoDB
      // (prawdopodobnie musi byc pole w obiekcie z index'em obok id)
      MOCKitem.orderNumber = 6;

      let results = [
        {
          path: ['restaurants', 0, 'menuItems', MOCKitem.orderNumber],
          value: NewMenuItemRef
        },
        {
          path: ['restaurants', 0, 'menuItems', 'length'],
          value: 7
        }
      ];

      console.log(JSON.stringify(results, null, 5));
      return results;
    }
  },
  {
    route: 'restaurants[{integers}].menuItems.length',
    get: (callPath, args) => {
      return models.MenuItem.count({}, function(err, count) {
        return count;
      }).then ((count) => {
        return {
          path: ['restaurants', 0, 'menuItems', 'length'],
          value: count+1
        }
      });
    }
  }
];

