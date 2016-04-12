//JM

import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

// API KEY GENERATED; name = 'rr';
var sendgrid  = require('sendgrid')('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'); 

module.exports = [
  { 
    route: ['emailWelcomeMessage'] ,
    call: async (callPath, args) => 
      {
        let member = args[0];

        let sendInfo = {
          to:       member.email,
          from:     'TheRestaurantReason',
          subject:  'Welcome to The Restaurant Reason',
          text:     'Click here to configure your new account: http://localhost:3000/#/staff-register/'+member.id
        };
        await sendgrid.send(sendInfo, function(err, json) {
          if (err) { return console.error(err); }
          console.log(json);
        });

        return {
          path: ['emailWelcomeMessage'],
          value: `sent to ${member.email} user with id ${member.id}`
        };
      }
  }
];