import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';

let $atom = jsonGraph.atom;
let $ref = jsonGraph.ref;
let Article = configMongoose.Article;

let PublishingAppRoutes = [
    ...sessionRoutes,
{
  route: 'articles.length',
    get: () => {
      return Article.count({}, function(err, count) {
        return count;
      }).then ((articlesCountInDB) => {
        return {
          path: ['articles', 'length'],
          value: articlesCountInDB
        }
      })
  }
}, 
{
  route: 'articles[{integers}]',
  get: (pathSet) => {
    let articlesIndex = pathSet[1];

    return Article.find({}, '_id', function(err, articlesDocs) {
      return articlesDocs;
    }).then ((articlesArrayFromDB) => {
      let results = [];
      articlesIndex.forEach((index) => {
        let currentMongoID = String(articlesArrayFromDB[index]['_id']);
        let articleRef = $ref(['articlesById', currentMongoID]);

        let falcorSingleArticleResult = {
          path: ['articles', index],
          value: articleRef
        };

        results.push(falcorSingleArticleResult);
      });
      return results;
    })
  }
},
{
  route: 'articlesById[{keys}]["id","articleTitle","articleContent","articleContentJSON"]',
  get: function(pathSet) {
    let articlesIDs = pathSet[1];
    return Article.find({
          '_id': { $in: articlesIDs}
      }, function(err, articlesDocs) {
        return articlesDocs;
      }).then ((articlesArrayFromDB) => {
        let results = [];

        articlesArrayFromDB.map((articleObject) => {
          let articleResObj = articleObject.toObject();
          let currentIdString = String(articleResObj['_id']);

          if(typeof articleResObj.articleContentJSON !== 'undefined') {
            articleResObj.articleContentJSON = $atom(articleResObj.articleContentJSON);
          }

          results.push({
            path: ['articlesById', currentIdString],
            value: articleResObj
          });
        });
        return results;
      });
  }
},
{
  route: 'articles.add',
  call: (callPath, args) => {
    let newArticleObj = args[0];
    var article = new Article(newArticleObj);

    return article.save(function (err, data) {
      if (err) {
        console.info("ERROR", err);
        return err;
      }
      else {
        return data;
      }
    }).then ((data) => {
      return Article.count({}, function(err, count) {
      }).then((count) => {
        return { count, data };
      });
    }).then ((res) => {
      let newArticleDetail = res.data.toObject();
      let newArticleID = String(newArticleDetail["_id"]);
      let NewArticleRef = $ref(['articlesById', newArticleID]);
      
      let results = [
        {
          path: ['articles', res.count-1],
          value: NewArticleRef
        },
        {
          path: ['articles', 'newArticleID'],
          value: newArticleID
        },
        {
          path: ['articles', 'length'],
          value: res.count
        }
      ];
      return results;
    });
  }
}
];

export default PublishingAppRoutes;