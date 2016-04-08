import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;


module.exports = [
  {
    route: 'staffRoute.accept',
    call: async function(callPath, args) {

      let newPassword = args[0].password;
      let id = args[1];

      //debugging
      let user = await models.UserCollection.find({_id: id}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      });

      console.log("1. user before");
      console.log(user);
      //debugging

      models.UserCollection.update(
          { _id: id }, 
          { $set: { "password": newPassword}},
          { $set: { "verified": true }},
          function(err) {
            if(err) { throw err; }
            console.info("UPDATED user SIR!");
        });

      //debugging
      user = await models.UserCollection.find({_id: id}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      });

      console.log("2. user after");
      console.log(user);
      //debugging

      return true;
    }
  },
  {
    route: 'staffRoute[{integers}]',
    get: async function(pathSet) {
      let staffIndexes = pathSet[2];
      let users = await models.UserCollection.find({}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      });

      let usersArray = users.map((user, index) => {
        return {
          path: ['staffRoute', index],
          value: $atom(user)
        }
      });
      return usersArray;
    }
  },
  { 
    route: 'staffRoute.add' ,
    call: async (callPath, args) => 
    {
        let {firstName, email, phone, startDate, lastName, reEmail, address, position, location} = args[0];
        let newUserObj = {
               'username': email,
               'password': 'passwordTOchange',
               'firstName': firstName,
               'lastName': lastName,
               'email': email,
               'role': position,
               'verified': false ,
               'imageURL': 'http://lorempixel.com/100/100/animals' ,
               'gender' : 'male',
               'address' : address
        };
        var user = new models.UserCollection(newUserObj);
        return user.save(function (err, data) {
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
          return models.UserCollection.count({}, function(err, count) {
          }).then((count) => {
            return { count, data };
          });

        }).then ((res) => {
          let newUserDetail = res.data.toObject();
          newUserDetail.id = newUserDetail._id.toString();
          delete newUserDetail._id;
          
          let results = [
            {
              path: ['staffRoute', res.count-1],
              value: $atom(newUserDetail)
            },
            {
              path: ['staffRoute', 'newUserID'],
              value: newUserDetail.id
            },
            {
              path: ['staffRoute', 'length'],
              value: res.count
            }
          ];

          return results;
      });
    }
  },
  {
    route: ['staffRoute', 'length'],
    get: (callPath, args) => {
      return models.UserCollection.count({}, function(err, count) {
        return count;
      }).then ((count) => {
        return             {
          path: ['staffRoute', 'length'],
          value: count
        }
      });
    }
  }
];