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
      console.info('>>>> results', JSON.stringify(results));
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
    console.info(1);
    let newArticleObj = args[0];
    console.info(2);
    var article = new Article(newArticleObj);
    console.info(3);
    return article.save(function (err, data) {
      console.info(4);
      if (err) {
        console.info("ERROR", err);
        return err;
      }
      else {
        return data;
      }
    }).then ((data) => {
      console.info(5);
      return Article.count({}, function(err, count) {
      }).then((count) => {
        console.info(6);
        return { count, data };
      });
    }).then ((res) => {
      console.info(7);
      let newArticleDetail = res.data.toObject();
      console.info(8);
      let NewArticleRef = $ref(['articlesById', newArticleDetail["_id"]]);
      console.info(9);
      
      let results = [
        {
          path: ['articles', res.count-1],
          value: NewArticleRef
        },
        {
          path: ['articles', 'newArticleID'],
          value: newArticleDetail["_id"]
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