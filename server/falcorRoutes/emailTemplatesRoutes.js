import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $atom = jsonGraph.atom;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, emailTemplateid };

  return [
  {
      route: 'restaurants[{keys}].emailTemplates[{integers}]',
      get: (pathSet) => {
        let emailTemplatesIndexes = pathSet[3];
        let restIDnow = pathSet[1][0];

        let queryDetails = { 
          $and: [
            { ownedByRestaurantID: restIDnow }
          ]
        };

        return models.EmailTemplateCollection.find(queryDetails, function(err, emailTemplatesDocs) {
            return emailTemplatesDocs;
          })
            .then ((emailTemplatesArrayFromDB) => {
            let results = [];
            if(emailTemplatesArrayFromDB.length) {

              let results = emailTemplatesArrayFromDB.map((item, index) => {
                let newItem = item.toObject();

                newItem.id = newItem['_id'].toString();
                return {
                  path: ['restaurants', restIDnow, 'emailTemplates', index],
                  value: $atom(newItem)
                }
              });
              return results;

            } else {
              return {
                path: ['restaurants', restIDnow, 'emailTemplates', 0],
                value: 'EMPTY'
              };
            }
          })
      }
    },
    {
      route: 'restaurants[{keys}].emailTemplates.update',
      call: async (callPath, args) => 
      {
        let updatedEmailTemplates = args[0];

        let results = [];

        for(var key in updatedEmailTemplates) {
          let updatedEmailTemplate = updatedEmailTemplates[key];
          let emailTemplateID = updatedEmailTemplate.id;
          updatedEmailTemplate.sectionsById = updatedEmailTemplate.sections;
          updatedEmailTemplate.ownedByRestaurantID = sessionObject.restaurantid;
          let emailTemplate = new models.EmailTemplateCollection(updatedEmailTemplate);
          let emailTemplateData = emailTemplate.toObject();
          delete emailTemplateData._id;
          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
          models.EmailTemplateCollection.update(
            { _id: emailTemplateID }, 
            emailTemplateData, 
            { multi: false }, 
            function(err) {
              if(err) { throw err; }
              console.info("UPDATED emailTemplate SIR!"+emailTemplateID);
          });

          // let updatedEmailTemplatePath = {
          //   path: ["emailTemplatesById", emailTemplateID],
          //   invalidate: true
          // };
          // results.push(updatedEmailTemplatePath);
        }

        return [];
      }
    },
    {
      route: 'restaurants[{keys}].emailTemplates.add',
      call: async (callPath, args) => 
      {
        let newEmailTempl = args[0];
        console.log("NEW EMAIL TEMPL:");
        console.log(newEmailTempl);

        var email = new models.EmailTemplateCollection(newEmailTempl);
        return email.save(function (err, data) {
            if (err) {
              console.info("ERROR", err);
              return err;
            }
            else {
              console.log("data");
              console.log(data);
              return data;
            }
          }).then ((data) => {
            /*
              got new obj data, now let's get count:
             */
            return models.EmailTemplateCollection.count({}, function(err, count) {
            }).then((count) => {
              return { count, data };
            });

          }).then ((res) => {
            let newEmailDetail = res.data.toObject();
            //let NewRestaurantRef = $ref(['restaurantsById', newEmailDetail["_id"]]);
            
            
            //newRestaurantDetail.id = newRestaurantDetail._id.toString();
            //delete newRestaurantDetail._id;

            //console.log("newRestaurantDetail.id");
            //console.log(newRestaurantDetail.id);

            let results = [
              {
                path: ['emailsManage', 'newEmail'],
                value: $atom(newEmailDetail)
              }
            ];

            return results;
          });
      }
    }

  ];
}

