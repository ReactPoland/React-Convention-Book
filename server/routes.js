import { Article } from './configMongoose';
import sessionRoutes from './routesSession';

let PublishingAppRoutes = [
    ...sessionRoutes,
  {
  route: 'articles.length',
    get: () => {
      console.info('length');
      console.info('length');
      console.info('length');
      console.info('length');
      return Article.count({}, function(err, count) {
        console.info(1);
        return count;
      }).then ((articlesCountInDB) => {
        console.info('articlesCountInDB', articlesCountInDB);
        console.info('articlesCountInDB', articlesCountInDB);
        console.info('articlesCountInDB', articlesCountInDB);

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
        let singleArticleObject = articlesArrayFromDB[index].toObject();
        let falcorSingleArticleResult = {
          path: ['articles', index],
          value: singleArticleObject
        };
        results.push(falcorSingleArticleResult);
      });
      console.info(">>>> results", results);
      return results;
    })
  }
}];

export default PublishingAppRoutes;