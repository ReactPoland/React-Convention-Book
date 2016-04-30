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
  route: 'articles[{integers}]["id","articleTitle","articleContent"]',
  get: (pathSet) => {
    let articlesIndex = pathSet[1];

    return Article.find({}, function(err, articlesDocs) {
      return articlesDocs;
    }).then ((articlesArrayFromDB) => {
      let results = [];
      articlesIndex.forEach((index) => {
        console.info('*********');
        console.info(JSON.stringify(articlesArrayFromDB[index]));
        console.info('*********');
        let singleArticleObject = articlesArrayFromDB[index].toObject();
        console.info('--------');
        console.info(JSON.stringify(singleArticleObject.articleContent));
        console.info('--------');

        console.info(typeof singleArticleObject.articleContent);
        console.info(typeof singleArticleObject.articleContent.entityMap);
        console.info(typeof singleArticleObject.articleContent.entityMap);


        singleArticleObject.articleContent = $atom(singleArticleObject.articleContent);
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
}];

export default PublishingAppRoutes;