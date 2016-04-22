import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;


module.exports = [
  {
    route: 'staffRoute.verify',
    call: async function(callPath, args) {

      let id = args[0];

      let user = await models.UserCollection.find({_id: id}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      });

      //debugging
      console.log("1. user before");
      console.log(user);
      //debugging

      if (user[0].verified == true){
        return {
          path: ['staffRoute', 'verified'],
          value: true
        }
      }
      else{
        return {
          path: ['staffRoute', 'verified'],
          value: false
        }
      }
    }
  },
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

      if (user[0].verified == true){
        //do nothing because he's verified
        console.log("true");
      }
      else{
        //change password
        console.log("false");
      }

      models.UserCollection.update(
          { _id: id },
          { $set: { "password": newPassword}, "verified": true },
          //{ $set: { "verified": false }},
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
        console.log("args[0]");
        console.log(args[0]);
        let {firstName, email, phone, startDate, lastName, reEmail, address, position, location, ownedByRestaurantID, active, role} = args[0];
        console.log("ownedByRestaurantID");
        console.log(ownedByRestaurantID, active);
        let newUserObj = {
               'username': email,
               'password': 'passwordTOchange',
               'firstName': firstName,
               'lastName': lastName,
               'email': email,
               'role': role ? 'admin' : 'staff',
               'verified': false ,
               'imageURL': 'http://lorempixel.com/100/100/animals' ,
               'gender' : 'male',
               'address' : address,
               'ownedByRestaurantID' : ownedByRestaurantID,
               'active': active,
               'position': position
        };
        var user = new models.UserCollection(newUserObj);
        return user.save(function (err, data) {
          if (err) {
            console.info("ERROR", err);
            //duplicate email!
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
            },
            {
              path: ['staffRoute', 'errorValue'],
              value: null
            }
          ];

          return results;
      }).catch((err) => {
        console.info('error321');
        /*
            TODO - it doesn't work properly, breaks whole app instead of returning json envelope
         */
        return {
          path: ['staffRoute', 'errorValue'],
          value: 'user exists'
        };
      });
    }
  },

  {
    route: 'staffRoute.edit' ,
    call: async (callPath, args) =>
    {
        let member = args[0];
        console.log("MEMBER IN staffRoute.edit: ");
        console.log(member);
        console.log("MEMBER^^^");

        let newFirstName = member.firstName;
        let newLastName = member.lastName;
        let newEmail = member.email;
        let newReEmail = member.reEmail;
        let newAddress = member.address;
        let newLocation = member.location;
        let newRole = member.position;
        let active = member.active;
        //let newStartDate = member.startDate;

        let memberToEdit = args[1];

//find an user in db
        let user = await models.UserCollection.find({_id: memberToEdit.id}, function(err, user) {
          if (err) throw err;
        }).then((result) => {
          return result;
        });

        console.log("Member before edit: ");
        console.log(user);
        console.log("member before edit^^^");

      //firstName
      if (typeof newFirstName === "undefined"){
        newFirstName = user[0].firstName;
      }
      //lastName
      if (typeof newLastName === "undefined"){
        newLastName = user[0].lastName;
      }
      //email
      if (typeof newEmail === "undefined"){
        newEmail = user[0].email;
      }
      //address
      if (typeof newAddress === "undefined"){
        newAddress = user[0].address;
      }
      //role
      if (newRole == ""){
        newRole = user[0].role;
      }
      //location
      if (newLocation == ""){
        newLocation = user[0].location;
      }
      //Active
      console.log('USER IS ACTIVE BEFORE UPDATE', active)


//update
        models.UserCollection.update(
          { _id: memberToEdit.id },
          { $set: { "firstName": newFirstName,
                   "lastName": newLastName,
                   "email": newEmail,
                   "role": newRole,
                   "address": newAddress,
                   "location": newLocation,
                   "active": active
                  }
          },
          function(err) {
            if(err) { throw err; }
            console.info("UPDATED user SIR!");
        });

        user = await models.UserCollection.find({_id: memberToEdit.id}, function(err, user) {
          if (err) throw err;
        }).then((result) => {
          return result;
        });

        console.log("Member after edit: ");
        console.log(user);
        console.log("member after edit^^^");

        return 0;
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
