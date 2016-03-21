import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test');



var articleSchema = {
  articleTitle:String,
  articleContent:String
}

var Article = mongoose.model('Article', articleSchema, 'articles');

Article.count({}, function(err, count) {
    return count;
  }).then ((articlesCountInDB) => {
    console.info("articlesCountInDB", articlesCountInDB);
  })


var menuItemSchema = {
  title: String,
  description: String,
  type: String,
  description2: String,
  description3: String,
  allergens: Array
}

var MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menuItems');

module.exports = { 
  MenuItem
};