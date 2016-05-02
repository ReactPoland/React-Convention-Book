import configMongoose from './configMongoose';
let Article = configMongoose.Article;

export default () => {
  return Article.find({}, function(err, articlesDocs) {
    return articlesDocs;
  }).then ((articlesArrayFromDB) => {
    
    // let newArticlesMap = new Map();
    // articlesArrayFromDB.forEach((item) => {
    //   newArticlesMap.set(String(item['_id']), item);
    // });

    return articlesArrayFromDB;
  });
}