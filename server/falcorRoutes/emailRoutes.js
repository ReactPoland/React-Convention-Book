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
              return 'template has not been defined correctly';
            }
          });

        let confirmLink = 'http://localhost:3000/#/staff-register/'+member.id;
        if(typeof member.email === 'undefined') member.email = member.reEmail;
        if(typeof registrationTemplate === 'undefined') registrationTemplate = 'template has not been defined correctly';

        try {
          registrationTemplate = registrationTemplate.replaceAll('[[firstName]]', member.firstName);
        } catch (e) {
          console.info('error [[firstName]]');
        }

        try {
          registrationTemplate = registrationTemplate.replaceAll('[[lastName]]', member.lastName);
        } catch (e) {
          console.info('error [[lastName]]');
        }
        
        try {
          registrationTemplate = registrationTemplate.replaceAll('[[email]]', member.email);
        } catch (e) {
          console.info('error [[email]]');
        }

        try {
          registrationTemplate = registrationTemplate.replaceAll('[[confirmLink]]', confirmLink);
        } catch (e) {
          console.info('error [[confirmLink]]');
        }

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
  },
  { 
    route: ['newsFeedSendInfo'] ,
    call: async (callPath, args) => 
      {
        let emailArray = args[0]; // this will be array of emails in next iteration!
        let restaurantID = args[1];
        let newsItemID = args[1];

        let andStatementQuery = {
          $and: [
            { ownedByRestaurantID: restaurantID },
            { templateName: 'newsFeed' }
          ]
        }

        let newsBroadcastTemplate = await models.EmailTemplateCollection.find(andStatementQuery, function(err, emailTemplatesDocs) {
            return emailTemplatesDocs;
          }).then ((templatesArray) => {
            console.info('templatesArray', templatesArray);
            if(templatesArray.length) {
              return templatesArray[0].templateText;
            } else {
              return 'template has not been defined correctly';
            }
          });

        // NOTE! 
        let newsFeedLink  = 'http://localhost:3000/#/newsFeed/'+newsItemID;
        try {
          newsBroadcastTemplate = newsBroadcastTemplate.replaceAll('[[newsFeedLink]]', newsFeedLink);
        } catch (e) {
          console.info('error [[newsFeedLink]]');
        }

        let textToSend = newsBroadcastTemplate || '';

        // emailArray.map((e ail) => {
        // tutaj wysylasz maile
          let sendInfo = {
            to:       emailArray,
            from:     'TheRestaurantReason',
            subject:  'News Update: check your news feed in the Restaurant Reason',
            text:     textToSend
          };
          
          await sendgrid.send(sendInfo, function(err, json) {
            if (err) { return console.error(err); }
            console.log(json);
          });
        // })

        return {
          path: ['newsFeedSendInfo'],
          value: `News link was sent to all staff members`
        };
      }
  }
];