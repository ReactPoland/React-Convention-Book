import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';

let $atom = jsonGraph.atom;
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

    return Article.find({}, function(err, articlesDocs) {
      return articlesDocs;
    }).then ((articlesArrayFromDB) => {
      let results = [];
      articlesIndex.forEach((index) => {
        let singleArticleObject = articlesArrayFromDB[index].toObject();

        if(typeof singleArticleObject.articleContentJSON !== 'undefined') {
          singleArticleObject.articleContentJSON = $atom(singleArticleObject.articleContentJSON);
        }

        let falcorSingleArticleResult = {
          path: ['articles', index],
          value: singleArticleObject
        };

        results.push(falcorSingleArticleResult);
      });
      console.info(">>>> results", JSON.stringify(results));
      return results;
    })
  }
},
{
  route: 'articlesById[{keys}]["id","articleTitle","articleContent","articleContentJSON"]',
  get: function(pathSet) {
    console.info(1);
    let articlesIDs = pathSet[1];
    console.info(2);
    return models.Article.find({
          '_id': { $in: articlesIDs}
      }, function(err, articlesDocs) {
        console.info(3);
        return articlesDocs;
      }).then ((articlesArrayFromDB) => {
        console.info(4);
        let results = [];

        articlesArrayFromDB.map((articleObject) => {
          let articleResObj = articleObject.toObject();

          console.info('articleResObj');
          console.info(articleResObj);
          console.info('articleResObj');

          results.push({
            path: ["articlesById", articleResObj.id],
            value: articleResObj
          });
        });

        return results;
      });
  }
},

];

export default PublishingAppRoutes;