import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;
var callRoutes = require('./callRoutes.js');
var sectionsRoutes = require('./sectionsRoutes.js');
var menusRoutes = require('./menusRoutes.js');
var itemsRoutes = require('./itemsRoutes.js');


let routes = [
  ...callRoutes, 
  ...sectionsRoutes,
  ...menusRoutes,
  ...itemsRoutes,
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