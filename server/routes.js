import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';

let $atom = jsonGraph.atom;
let Article = configMongoose.Article;




export default ( req, res ) => {
  let { token, role, username } = req.headers;
  let userDetailsToHash = username+role;
  let authSignToken = jwt.sign(userDetailsToHash, jwtSecret.secret);
  let isAuthorized = authSign === token;
  let sessionObject = {isAuthorized, role, username};

  console.info(`The ${username} is authorized === `, isAuthorized);

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
    route: 'articles[{integers}]["_id","articleTitle","articleContent"]',
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
        return results;
      })
    }
  }
  ];


  return PublishingAppRoutes;
}





