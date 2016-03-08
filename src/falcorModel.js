var Falcor = require('falcor'),
    FalcorDataSource = require('falcor-http-datasource');

const cache = {
  articles: [
    {
    	id: 987654,
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
    },
    {
    	id: 123456,
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
    }
  ]
}

const model = new Falcor.Model({
  "cache": cache
});

module.exports = model;