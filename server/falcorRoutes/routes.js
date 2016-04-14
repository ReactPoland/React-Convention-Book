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

  let isAuthorized = authSign === authorization;
  let sessionObject = { isAuthorized, role, username, restaurantid };

  let routes = [
      ...loginRoutes,
      ...staffRoutes,
      ...emailRoutes,
      ...profileRoutes,
    ]
      .concat(itemsRoutes( sessionObject ))
      .concat(itemsCallRoutes( sessionObject ))
      .concat(sectionsRoutes( sessionObject ))
      .concat(sectionsCallRoutes( sessionObject ))
      .concat(menusRoutes( sessionObject ))
      .concat(menusCallRoutes( sessionObject ));

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

          let userObj = userDetailsRes[0].toObject();

          userObj.id = userObj._id;
          delete userObj._id;

          return {
            path: ['v1', 'user', 'me'],
            value: userObj
          };
        }
      },
      {
        /*
            USED on frontend in layouts/CoreLayout.js 
         */
        route: 'restaurants.lookup[{keys}]',
        get: async (pathSet) => {
          console.info("restaurants.lookup pathSet");
          console.info(pathSet);
          let restaurantSubdomain = pathSet[2][0];

          let andStatementQuery = {
            "subdomain": restaurantSubdomain
          }
          console.info("andStatementQuery", andStatementQuery);

          let restaurantRes = await models.RestaurantCollection.find(andStatementQuery, function(err, res) {
            if (err) throw err;
          }).then((result) => {
            return result;
          });

          console.info("restaurantRes", restaurantRes);
          if(restaurantRes.length > 0) {
            let restaurantID = restaurantRes[0].toObject()._id.toString();
            return {
              path: ['restaurants', 'lookup', restaurantSubdomain],
              value: restaurantID
            }
          } else {
            return {
              path: ['restaurants', 'lookup', restaurantSubdomain],
              value: 'INVALID'
            }
          }
          
      }
    }
  ];
};