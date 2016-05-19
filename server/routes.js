import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';

let $ref = jsonGraph.ref;
let $atom = jsonGraph.atom;
let $error = jsonGraph.error;
let Article = configMongoose.Article;




export default ( req, res ) => {
  let { token, role, username } = req.headers;
  let userDetailsToHash = username+role;
  let authSignToken = jwt.sign(userDetailsToHash, jwtSecret.secret);
  let isAuthorized = authSignToken === token;
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
    route: 'articles[{integers}]',
    get: (pathSet) => {
      let articlesIndex = pathSet[1];

      return {
        path: ['articles'],
        value: $error('auth error')
      }

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
    route: 'articlesById[{keys}]["_id","articleTitle","articleContent","articleContentJSON"]',
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
  },
  {
  route: 'articles.update',
  call: async (callPath, args) => 
    {
      let updatedArticle = args[0];
      let articleID = String(updatedArticle._id);
      let article = new Article(updatedArticle);
      article.isNew = false;

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then ((res) => {
        return [
          {
            path: ["articlesById", articleID],
            value: updatedArticle
          },
          {
            path: ["articlesById", articleID],
            invalidate: true
          }
        ];
      });
    }
  },
  {
  route: 'articles.delete',
  call: (callPath, args) => 
    {
      let toDeleteArticleId = args[0];
      return Article.find({ _id: toDeleteArticleId }).remove((err) => {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then((res) => {
        return [
          {
            path: ["articlesById", toDeleteArticleId],
            invalidate: true
          }
        ]
      });
    }
  }
  ];


  return PublishingAppRoutes;
}





