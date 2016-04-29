import models from '../modelsMongoose';
var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;

export default ( sessionObject ) => {
  // sessionObject = { isAuthorized, role, username, restaurantid };

  return [
    {
    route: 'restaurants[{keys}].news.delete',
    call: (callPath, args) =>
      {
        let toDeleteNewsItemId = args[0];
        return models.NewsItemCollection.find({ _id: toDeleteNewsItemId }).remove((err) => {
          return [
            {
              path: ["newsById", toDeleteNewsItemId],
              invalidate: true
            }
          ]
        });
      }
    },
    {
    route: 'restaurants[{keys}].news.update',
    call: async (callPath, args) =>
      {
        let updatedNews = args[0];
        let results = [];

        for(var key in updatedNews) {
          let updatedNewsItem = updatedNews[key];
          let newsItemID = updatedNewsItem.id;
          updatedNewsItem.ownedByRestaurantID = sessionObject.restaurantid;
          let newsItem = new models.NewsItemCollection(updatedNewsItem);
          let newsItemData = newsItem.toObject();
          delete newsItemData._id;
          /*
            to-do: not ideal because it doesn't handle when it fails adding to DB
           */
          models.NewsItemCollection.update(
            { _id: newsItemID },
            newsItemData,
            { multi: false },
            function(err) {
              if(err) { throw err; }
              console.info("UPDATED SIR!"+newsItemID);
          });

          let updatedNewsItemPath = {
            path: ["newsById", newsItemID],
            invalidate: true
          };
          results.push(updatedNewsItemPath);
        }

        return results;
      }
    },
    {
    route: 'restaurants[{keys}].news.add',
    call: (callPath, args) =>
      {
        console.info('!!!!works!!!');

        let newNewsItemObj = args[0];
        newNewsItemObj.ownedByRestaurantID = sessionObject.restaurantid;

        var newsItem = new models.NewsItemCollection(newNewsItemObj);
        return newsItem.save(function (err, data) {
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
            return models.NewsItemCollection.count({}, function(err, count) {
            }).then((count) => {
              return { count, data };
            });

          }).then ((res) => {
            let newNewsItemDetail = res.data.toObject();
            let NewNewsItemRef = $ref(['newsById', newNewsItemDetail["_id"]]);

            let results = [
              {
                path: ['restaurants', sessionObject.restaurantid, 'news', res.count-1],
                value: NewNewsItemRef
              },
              {
                path: ['restaurants', sessionObject.restaurantid, 'news', 'length'],
                value: res.count
              }
            ];

            return results;
          });
      }
    }
  ];
}
