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


var mockedUser = {
  username: 'kamil',
  password: '123'
};


// UTIL FUNCTIONS
const authenticate = (req, res, next) => {
  console.info("TEST", 1);
  let body = req.body;
  if (!body.username || !body.password) {
    console.info("TEST", 2);
    res.status(400).end('Username or password is missing');
    return;
  }
  if(body.username !== mockedUser.username || body.password !== mockedUser.password) {
    res.status(401).end('Username or password is incorrect');
    return;
  }
  next();
}


app.get('/login', authenticate, (req, res) => {
  console.info("TEST", 3);
  res.json(mockedUser);
});



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


app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;