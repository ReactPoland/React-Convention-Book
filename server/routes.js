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
    let articlesCountInDB = 2; // hardcoded for example
    return {
      path: ['articles', 'length'],
      value: articlesCountInDB
    };
  }
}, 
{
  route: 'articles[{integers}]["id","articleTitle","articleContent"]',
  get: (pathSet) => {
  	let articlesIndex = pathSet[1];
    let articlesCountInDB = [{
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
    	let singleArticleObject = articlesCountInDB[index];
      let falcorSingleArticleResult = {
        path: ['articles', index],
        value: singleArticleObject
      };
      results.push(falcorSingleArticleResult);
    });
    console.info(results);
    return results;
  }
}];

export default PublishingAppRoutes;