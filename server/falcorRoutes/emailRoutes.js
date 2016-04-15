//JM

import models from '../modelsMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from '../secret';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

// API KEY GENERATED; name = 'rr';
var sendgrid  = require('sendgrid')('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'); 

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

module.exports = [
  { 
    route: ['emailWelcomeMessage'] ,
    call: async (callPath, args) => 
      {
        let member = args[0];
        let restaurantID = args[1];
        console.info("emailWelcomeMessage restaurantID", restaurantID);

        let andStatementQuery = {
          $and: [
            { ownedByRestaurantID: restaurantID },
            { templateName: 'registration' }
          ]
        }


        let registrationTemplate = await models.EmailTemplateCollection.find(andStatementQuery, function(err, emailTemplatesDocs) {
            return emailTemplatesDocs;
          }).then ((templatesArray) => {
            console.info('templatesArray', templatesArray);
            if(templatesArray.length) {
              return templatesArray[0].templateText;
            } else {
              return null;
            }
          });


        let confirmLink = 'http://localhost:3000/#/staff-register/'+member.id;
        registrationTemplate = registrationTemplate.replaceAll('[[firstName]]', member.firstName);
        registrationTemplate = registrationTemplate.replaceAll('[[lastName]]', member.lastName);
        registrationTemplate = registrationTemplate.replaceAll('[[email]]', member.email);
        registrationTemplate = registrationTemplate.replaceAll('[[confirmLink]]', confirmLink);

        let textToSend = registrationTemplate || 'Click here to configure your new account: '+confirmLink+' \n\n DEFAULT REGISTRATION MESSAGE, no template provided';

        let sendInfo = {
          to:       member.email,
          from:     'TheRestaurantReason',
          subject:  'Welcome to The Restaurant Reason',
          text:     textToSend
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