import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;
var itemsCallRoutes = require('./itemsCallRoutes.js');
var sectionsCallRoutes = require('./sectionsCallRoutes.js');
var sectionsRoutes = require('./sectionsRoutes.js');
var menusRoutes = require('./menusRoutes.js');
var menusCallRoutes = require('./menusCallRoutes.js');
var itemsRoutes = require('./itemsRoutes.js');
var loginRoutes = require('./loginRoutes.js');
var staffRoutes = require('./staffRoutes.js');



let routes = [
  ...itemsCallRoutes, 
  ...itemsRoutes,
  ...sectionsRoutes,
  ...sectionsCallRoutes,
  ...menusRoutes,
  ...menusCallRoutes,
  ...loginRoutes,
  ...staffRoutes
  {

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
  },
  {
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