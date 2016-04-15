import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    { 
      route: ['login'] ,
      call: async (callPath, args) => 
        {
          let { username, password } = args[0];

          let andStatementQuery = {
            $and: [
                { 'username': username },
                { 'password': password }
            ]
          }

          // get the user rradmin
          let userAuthRes = await models.UserCollection.find(andStatementQuery, function(err, user) {
            if (err) throw err;
          }).then((result) => {
            return result;
          });

          if(userAuthRes.length) {
            let userDetails = { 
              username: username,
              role: userAuthRes[0].role
            };

            let restaurantID = sessionObject.restaurantid;
            let userDetailsToken = userDetails.username+userDetails.role+restaurantID;
            let token = jwt.sign(userDetailsToken, jwtSecret);

            return [
              {
                path: ['login', 'token'],
                value: token
              },
              {
                path: ['login', 'restaurantID'],
                value: restaurantID
              },
              {
                path: ['login', 'username'],
                value: userDetails.username
              },
              {
                path: ['login', 'role'],
                value: userDetails.role
              },
              {
                path: ['login', 'error'],
                value: false
              }
            ];
          } else {
            // INVALID LOGIN
            return [
              {
                path: ['login', 'token'], // ['login', ['token', 'error']],
                value: "INVALID" // ["INVALID", "NO USER FOUND, incorrect login information"]
              },
              {
                path: ['login', 'error'], // ['login', ['token', 'error']],
                value: "NO USER FOUND, incorrect login information" // ["INVALID", "NO USER FOUND, incorrect login information"]
              }
            ];
          }
        }
    }
  ];
}