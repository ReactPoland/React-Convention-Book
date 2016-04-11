import models from '../modelsMongoose';
import jwtSecret from '../secret';
import jwt from 'jsonwebtoken';

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
var emailRoutes = require('./emailRoutes.js');
var profileRoutes = require('./profileRoutes.js');

let routes = [
  ...itemsCallRoutes, 
  ...itemsRoutes,
  ...sectionsRoutes,
  ...sectionsCallRoutes,
  ...menusRoutes,
  ...menusCallRoutes,
  ...loginRoutes,
  ...staffRoutes,
  ...emailRoutes,
  ...profileRoutes
];


export const getCurrentUser = ( db, req ) => db.map( db => [{
  path: [ 'currentUser' ],
  value: $ref([ 'usersById', req.user._id ]),
}]);

export default ( req, res ) => {
  // const users = db.map( db => db.collection( 'users' ) );
  let { authorization, role, username, restaurantid } = req.headers;
  let userDetailsToken = username+role+restaurantid;
  console.info("***************");
  console.info("***************");
  console.info("authorization", authorization);
  console.info("role", role);
  console.info("username", username);
  let authSign = jwt.sign(userDetailsToken, jwtSecret);
  console.info("SIGNED", authSign);
  console.info("***************");
  console.info("***************");
  console.info("IS TRUE?", authSign === authorization);
  console.info("***************");
  console.info("***************");

  return [
    ...routes,
      {
        /*
            USED on frontend in layouts/CoreLayout.js 
         */
        route: ['v1', 'user', 'me', ['firstName', 'lastName', 'token', 'verified', 'role', 'gender', 'imageUrl', 'email']],
        get: async (pathSet) => {

          // get the user rradmin
          let userDetailsRes = await models.UserCollection.find({'username': username}, function(err, user) {
            if (err) throw err;
          }).then((result) => {
            return result;
          });

          console.info("userDetailsRes");
          console.info(userDetailsRes);
          console.info("userDetailsRes");
          let userObj = userDetailsRes[0].toObject();

          userObj.id = userObj._id;
          delete userObj._id;


          console.info("userObj");
          console.info(userObj);
          console.info("userObj");


          return {
            path: ['v1', 'user', 'me'],
            value: userObj

            // {
            //   firstName: 'test',
            //   lastName: 'admin',
            //   email: 'test@admin.com',
            //   role: 'admin',
            //   verified: false,
            //   imageUrl: 'http://lorempixel.com/100/100/animals/',
            //   token: 'magic-login-token',
            //   gender: 'male'
            // }
          };
        }
      }
    ];

  return [
    {
      route: 'currentUser',
      get: pathSet => getCurrentUser( users, req ),
    },
    // {
    //   route: 'usersById[{keys:ids}]["email"]',
    //   get: pathSet => getUsers( users, pathSet.ids, pathSet[ 2 ] ),
    // },
    {
      route: 'usersById[{keys:ids}].worlds[{integers:indices}]',
      get: pathSet => getUserWorlds( users, pathSet.ids, pathSet.indices ),
    },
    {
      route: 'usersById[{keys:ids}].ux.lastVisited',
      get: pathSet => getLastVisited( users, pathSet.ids ),
      set: pathSet => setLastVisited( users, pathSet.usersById ),
    },
  ];
};