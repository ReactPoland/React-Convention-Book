import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import faker from 'faker';
import routes from './routes.js';

var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({
  extended: false
}));


app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new Router(routes);
}));

app.use(express.static('dist'));

app.get('/', (req, res) => {
  Article.find(function(err, articlesDocs) {

    let ourArticles = articlesDocs.map(function(articleItem) {
      return `<h2>${articleItem.articleTitle}</h2> ${articleItem.articleContent}`;
    }).join("<br/>");

    res.send(`<h1>Publishing App Initial Application!</h1> ${ourArticles}`);
  });
});

app.get('/fake-user', (req, res) => {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

var mockedUser = {
  username: 'kamil',
  password: '123'
};

app.get('/login', authenticate, (req, res) => {
  res.json(mockedUser);
});

// UTIL FUNCTIONS
const authenticate = (req, res, next) => {
  console.info("TEST");
  let body = req.body;
  if (!body.username || !body.password) {
    res.status(400).end('Username or password is missing');
  }
  if(body.username !== mockedUser.username || body.password !== mockedUser.password) {
    res.status(401).end('Username or password is incorrect')
  }
  next();
}

app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;