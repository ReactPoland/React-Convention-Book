import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, emailTemplateid };

  return [
  {
      route: 'restaurants[{keys}].emailTemplates',
      get: (pathSet) => {
        console.info("WORKS!!!!!!");
        console.info("WORKS!!!!!!");
        console.info("WORKS!!!!!!");
        console.info("WORKS!!!!!!");
        console.info("WORKS!!!!!!");
        let emailTemplatesIndexes = pathSet[3];
        let restIDnow = pathSet[1][0];

        let queryDetails = { 
        	$and: [
        		{ templateName: 'registration'  },
        		{ ownedByRestaurantID: restIDnow }
        	]
        };

        console.info('queryDetails', queryDetails);


        return models.EmailTemplateCollection.find(queryDetails, function(err, emailTemplatesDocs) {
            return emailTemplatesDocs;
          })
            .then ((emailTemplatesArrayFromDB) => {
            let results = [];

            if(emailTemplatesArrayFromDB.length) {
              let registrationTemplate = emailTemplatesArrayFromDB[0];
              console.info('11111--->', registrationTemplate);

              return {
                path: ['restaurants', restIDnow, 'emailTemplates', 'registration'],
                value: $atom(registrationTemplate)
              };
            } else {
              return {
                path: ['restaurants', restIDnow, 'emailTemplates', 'registration'],
                value: 'EMPTY'
              };
            }
          })
      }
    }
  ];
}

