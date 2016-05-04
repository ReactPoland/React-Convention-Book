import configMongoose from './configMongoose';
let Article = configMongoose.Article;

export default () => {
  return Article.find({}, function(err, articlesDocs) {
    return articlesDocs;
  }).then ((articlesArrayFromDB) => {
	  const articlesMap = new Map();
	  articlesArrayFromDB.forEach((item, key) => {
	    if(key === item['_id']) {
	      articlesMap.set(key, item);
	    }	
	  });
    return articlesMap;
  });
}