import models from './modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;


module.exports = [
  {
  route: 'restaurants[{integers}].sections.delete',
  call: (callPath, args) => 
    {
      console.info("1) DELETE SEC: restaurants[{integers}].sections.delete");
      let toDeleteSectionId = args[0];
      return models.SectionCollection.find({ _id: toDeleteSectionId }).remove((err) => {
        console.info("section REMOVED");
        return [
          {
            path: ["sectionsById", toDeleteSectionId],
            invalidate: true
          }
        ]
      });
    }
  },
  {
  route: 'restaurants[{integers}].sections.update',
  call: async (callPath, args) => 
    {
      let updatedSections = args[0];
      let results = [];

      for(var key in updatedSections) {
        let updatedSection = updatedSections[key];
        console.info("updatedSection", updatedSection);
        let sectionID = updatedSection.id;
        let section = new models.SectionCollection(updatedSection);
        let sectionData = section.toObject();
        delete sectionData._id;
        /*
          to-do: not ideal because it doesn't handle when it fails adding to DB
         */
        models.SectionCollection.update(
          { _id: sectionID }, 
          sectionData, 
          { multi: false }, 
          function(err) {
            if(err) { throw err; }
            console.info("UPDATED SIR!"+sectionID);
        });

        let updatedSectionPath = {
          path: ["sectionsById", sectionID],
          invalidate: true
        };
        results.push(updatedSectionPath);
      }

      return results;
    }
  },
  {
  route: 'restaurants[{integers}].sections.add',
  call: (callPath, args) => 
    {
      console.info("BACKEND")
      let newSectionObj = args[0];
      console.info("newSectionObj");
      console.info(newSectionObj);
      console.info("newSectionObj ^^^^^");
      var section = new models.SectionCollection(newSectionObj);
      return section.save(function (err, data) {
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
          return models.SectionCollection.count({}, function(err, count) {
          }).then((count) => {
            return { count, data };
          });

        }).then ((res) => {
          let newSectionDetail = res.data.toObject();
          let NewSectionRef = $ref(['sectionsById', newSectionDetail["_id"]]);
          
          let results = [
            {
              path: ['restaurants', 0, 'sections', res.count-1],
              value: NewSectionRef
            },
            {
              path: ['restaurants', 0, 'sections', 'length'],
              value: res.count
            }
          ];

          return results;
        });
    }
  },
  {
    route: 'restaurants[{integers}].sections.length',
    get: (callPath, args) => {
      return models.SectionCollection.count({}, function(err, count) {
        return count;
      }).then ((count) => {
        return {
          path: ['restaurants', 0, 'sections', 'length'],
          value: count
        }
      });
    }
  }
];

