import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;
var callRoutes = require('./callRoutes.js');


let routes = [
  ...callRoutes, {
    route: 'sectionsById[{integers}]["id", "title", "items"]',
    get: function(pathSet) {
      let sectionsIDs = pathSet[1]

      let MOCKsectionsObjects = {
        7085243347100914: {
          id: "7085243347100914",
          title: "Breakfast",
          category: "Brunch",
          items: [
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"]),
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"])
          ]
        },
        320549983298406: {
          id: "320549983298406",
          title: "Lunch",
          category: "Brunch",
          items: [
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"])
          ]
        },
        4948691942263394: {
          id: "49486919422633946",
          title: "Salads",
          category: "Lunch",
          items: null
        },
        3741015521809459: {
          id: "3741015521809459",
          title: "Mains",
          category: "Lunch",
          items: [
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"]),
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"]),
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"])
          ]
        },
        1543075663503259: {
          id: "1543075663503259",
          title: "Prix Fixe",
          category: "Dinner",
          items: null
        },
        7557792635634542: {
          id: "7557792635634542",
          title: "Appetizers",
          category: "Dinner",
          items: [
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"]),
            $ref(['menuItemsById', "56ebbf4750b1c14323cbb962"])
          ]
        }
      };

      let results = [];
      sectionsIDs.map((sectionID) => {
        results.push({
          path: ["sectionsById", sectionID],
          value: MOCKsectionsObjects[sectionID]
        });
      });

      return results;

    }
  }, {
    route: 'menuItemsById[{keys}]["title", "id", "description", "picUrl", "allergens"]',
    get: function(pathSet) {
      let menuItemsIDs = pathSet[1];

      return models.MenuItem.find({
            '_id': { $in: menuItemsIDs}
        }, function(err, menuItemsDocs) {
          return menuItemsDocs;
        }).then ((menuItemsArrayFromDB) => {
          let results = [];

          menuItemsArrayFromDB.map((menuItemObject) => {
            let resObj = menuItemObject.toObject();
            delete resObj.id;
            delete resObj.allergens;
            resObj.id = String(resObj["_id"]);
            delete resObj["_id"];

            results.push({
              path: ["menuItemsById", resObj.id],
              value: resObj
            });
          });
          return results;
        });
    }
  }, {
    route: 'menusById[{integers}]["title", "id", "description"]',
    get: function(pathSet) {
      let menuIDs = pathSet[1]

      let MOCKmenuObjects = {
        2732418433297425: {
          id: "2732418433297425",
          createdAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
          title: "Vegetarian menu",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: null
        },
        5042458197567612: {
          id: "5042458197567612",
          createdAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
          title: "Chef recommends",
          description: "Lorem ipsum Consectetur anim Duis tempor quis pariatur aute est magna in qui dolore.",
          sections: [
            $ref(['sectionsById', 7085243347100914]),
            $ref(['sectionsById', 7557792635634542]),
            $ref(['sectionsById', 1543075663503259])
          ]
        },
        6918394977692515: {
          id: "6918394977692515",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 1",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: [
            $ref(['sectionsById', 320549983298406])
          ]
        },
        746502079302445: {
          id: "746502079302445",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 2",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: null
        },
        8058349746279418: {
          id: "8058349746279418",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 3",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: null
        },
        7171383046079427: {
          id: "7171383046079427",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 4",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: [
            $ref(['sectionsById', 3741015521809459]),
            $ref(['sectionsById', 320549983298406]),
            $ref(['sectionsById', 1543075663503259])
          ]
        },
        3937371058855206: {
          id: "3937371058855206",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 5",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: null
        },
        8333667400293052: {
          id: "8333667400293052",
          createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
          title: "Mock Menu 6",
          description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
          sections: null
        }
      }

      let results = [];
      menuIDs.map((menuID) => {
        results.push({
          path: ["menusById", menuID],
          value: MOCKmenuObjects[menuID]
        });
      });

      return results;

    }
  }, {
    /*
        USED on frontend in views/MenuLibraryView.js 
     */
    route: 'restaurants[0].menuItems[{integers}]',
    get: (pathSet) => {
      let menuItemsIndexes = pathSet[3];
      return models.MenuItem.find({}, '_id', function(err, menuItemsDocs) {
          return menuItemsDocs;
        }).then ((menuItemsArrayFromDB) => {
          let results = [];
          menuItemsIndexes.map((index) => {
            let res;
            if (menuItemsArrayFromDB.length - 1 < index) { 
              res = {
                path: ['restaurants', 0, 'menuItems', index],
                invalidate: true
              };
              results.push(res);
              return;
            }
            let menuItemObject = menuItemsArrayFromDB[index].toObject();
            let currentMongoID = String(menuItemObject["_id"]);
            let newmenuItemRef = $ref(['menuItemsById', currentMongoID]);

            res = {
              path: ['restaurants', 0, 'menuItems', index],
              value: newmenuItemRef,
            };
            results.push(res);
          });

          return results;
        })
    }
  }, {
    /*
        USED on frontend in layouts/SideNav.js 
     */
    route: 'restaurants[0].menus[{integers}]',
    get: (pathSet) => {
      let menuIndexes = pathSet[3];
      let MOCKmenusIds = [2732418433297425, 5042458197567612, 6918394977692515, 746502079302445, 8058349746279418, 7171383046079427, 3937371058855206, 8333667400293052];

      let results = [];
      menuIndexes.map((index) => {
        let res;

        if (!MOCKmenusIds[index]) {
          res = {
            path: ['restaurants', 0, 'menus', index],
            value: $ref(['menusById', MOCKmenusIds[index]]),
          };
          return;
        } else {
          res = {
            path: ['restaurants', 0, 'menus', index],
            value: $ref(['menusById', MOCKmenusIds[index]]),
          };
        }
        results.push(res);
      });
      return results;
    }
  }, {
    /*
        USED on IMPLEMENTED #4 frontend in views/MenuLibraryView.js 
     */
    route: 'restaurants[0].sections[{integers}]',
    get: (pathSet) => {
      let sectionsIndexes = pathSet[3];
      let MOCKsectionsIds = [
        7085243347100914,
        320549983298406,
        4948691942263394,
        3741015521809459,
        1543075663503259,
        7557792635634542
      ];

      let results = [];
      sectionsIndexes.map((index) => {
        let res;

        if (!MOCKsectionsIds[index]) {
          res = {
            path: ['restaurants', 0, 'sections', index],
            value: $ref(['sectionsById', MOCKsectionsIds[index]]),
          };
          return;
        } else {
          res = {
            path: ['restaurants', 0, 'sections', index],
            value: $ref(['sectionsById', MOCKsectionsIds[index]]),
          };
        }
        results.push(res);
      });
      return results;
    }
  }, {
    /*
        USED on frontend in layouts/CoreLayout.js 
     */
    route: ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']],
    get: (pathSet) => {
      return {
        path: ['v1', 'user', 'me'],
        value: {
          firstName: 'test',
          lastName: 'admin',
          email: 'test@admin.com',
          role: 'admin',
          verified: false,
          imageUrl: 'http://lorempixel.com/100/100/people/',
          token: 'magic-login-token',
          gender: 'male'
        }
      };
    }
  }, {
    route: 'model',
    get: () => {
      return {
        path: ['v1', 'user', 'me'],
        value: "kamil2222 test"
      };
    }
  }
];


module.exports = routes;