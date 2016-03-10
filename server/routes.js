import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/local');

var articleSchema = {
  articleTitle:String,
  articleContent:String
}

var Article = mongoose.model('Article', articleSchema, 'articles');

let PublishingAppRoutes = [{
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

      console.info("articlesArrayFromDB", articlesArrayFromDB);

      articlesArrayFromDB = [{
        "articleId": "987654",
        "articleTitle": "BACKEND Lorem ipsum - article one",
        "articleContent": "BACKEND Here goes the content of the article"
      }, {
        "articleId": "123456",
        "articleTitle": "BACKEND Lorem ipsum - article two",
        "articleContent": "BACKEND Sky is the limit, the content goes here."
      }]; // That are our mocked articles from MongoDB



      let results = [];
      articlesIndex.forEach((index) => {
        let singleArticleObject = articlesArrayFromDB[index];
        let falcorSingleArticleResult = {
          path: ['articles', index],
          value: singleArticleObject
        };
        console.info("index"+index, falcorSingleArticleResult);
        results.push(falcorSingleArticleResult);
      });
      console.info(">>>> results", results);
      console.info("********");
      return results;
    })
  }
}];

export default PublishingAppRoutes;