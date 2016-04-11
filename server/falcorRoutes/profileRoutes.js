import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;


module.exports = [
  {
    route: 'profilePassword.change',
    call: async function(callPath, args) {

      let oldPassword = args[0].OldPassword;
      let newPassword = args[0].NewPassword;
      let email = args[1];

      let user = await models.UserCollection.find({email: email}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      });	

      if (user[0].password == oldPassword){
      	console.log("valid");
	    console.log("valid");
	    console.log("valid");
      	models.UserCollection.update(
          { email: email }, 
          { $set: { "password": newPassword}},
          function(err) {
            if(err) { throw err; }
            console.info("UPDATED user SIR!");
        });
        return [
            {
              path: ['profilePassword', 'validation'],
              value: true
            },
          ];
      }
      else 
      	return [
	        {
	          path: ['profilePassword', 'validation'], 
	          value: false
	        },
      	];
    }
  },

  {
    route: 'profileData.update',
    call: async function(callPath, args) {

      let profileData = args[0];
      let email = args[1];
      
      let newFirstName;
      let newLastName;
      let newEmail;
      let newImageUrl = profileData.imageUrl;
      let gender = profileData.gender;

      let user = await models.UserCollection.find({email: email}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      }); 

      console.log("user to update: ");
      console.log(user);
      console.log("user^^^");

      //firstName
      if (typeof profileData.firstName !== "undefined"){  //first name was edited
        newFirstName = profileData.firstName;
      }
      else {                                              //first name wasn't edited
        newFirstName = user[0].firstName;
      }

      //lastName
      if (typeof profileData.lastName !== "undefined"){  //lastName was edited
        newLastName = profileData.lastName;
      }
      else {                                              //lastName wasn't edited
        newLastName = user[0].lastName;
      }

      //email
      if (typeof profileData.email !== "undefined"){  //lastName was edited
        newEmail = profileData.email;
      }
      else {                                              //lastName wasn't edited
        newEmail = user[0].email;
      }

      //imageUrl
      if (typeof profileData.imageUrl !== "undefined"){  //lastName was edited
        newImageUrl = profileData.imageUrl;
      }
      else {                                              //lastName wasn't edited
        newImageUrl = user[0].imageUrl;
      }

      //UPDATE DB
      models.UserCollection.update(
        { email: email }, 
        { $set: { "firstName": newFirstName, 
                  "lastName": newLastName,
                  "email": newEmail,
                  "imageUrl": newImageUrl
                }    
        },
        function(err) {
          if(err) { throw err; }
          console.info("UPDATED user SIR!");
      });

      user = await models.UserCollection.find({email: email}, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        return result;
      }); 

      console.log("user after: ");
      console.log(user);
      console.log("user after^^^");

      return [
          {
            path: ['profileData', 'newEmail'], 
            value: newEmail
          },
          {
            path: ['profileData', 'newFirstName'], 
            value: newFirstName
          },
          {
            path: ['profileData', 'newLastName'], 
            value: newLastName
          },
          {
            path: ['profileData', 'newImageUrl'], 
            value: newImageUrl
          },
        ];

      return 0;
    }
  }

];