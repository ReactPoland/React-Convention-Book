import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import FalcorRouter from 'falcor-router';
import routes from './routes.js';

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import ReactRouter from 'react-router';

let initMOCKstore = {
	"routing":
		{
      "changeId":1,
      "path":"/#/"
    },
	"article":
	{
		"0": {
      "articleTitle": "Lorem ipsum - article one",
      "articleContent":"Here goes the content of the article"
    },
		
		"1": {
      "articleTitle":"Lorem ipsum - article two",
      "articleContent":"Sky is the limit, the content goes here."
    }
  }
};


import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(rootReducer)
  console.info(111111);
  console.info(store);
  console.log('routes',reactRoutes)
  console.info(111111);


  match({ reactRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.info('1 ---> error');
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.info('2 ---> redirect');
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      console.info('3 ---> renderProps');
      res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
    } else {
      console.info('4 ---> notFound');
      res.status(404).send('Not found')
    }
  })


  process.exit();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>

    </Provider>
  );

  console.info(22222);
  console.info(html);
  console.info(2222);

  // Grab the initial state from our Redux store
  const initialState = store.getState()
  console.info(33333);
  console.info(initialState);
  console.info(33333);
  // Send the rendered page back to the client
  // res.send(renderFullPage(html, initialState))
}

// handleRender(1, 1);


var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  console.info('req.url', req.url);
  console.info('req.url', req.url);
  console.info('req.url', req.url);

  return new FalcorRouter(routes);
}));

app.use(express.static('dist'));

app.get('/', (req, res) => { 
    console.info('req.url', req.url);
    console.info('req.url', req.url);
    console.info('req.url', req.url);

    Article.find(function (err, articlesDocs) {

        let ourArticles = articlesDocs.map(function(articleItem){
            return `<h2>${articleItem.articleTitle}</h2> ${articleItem.articleContent}`;
        }).join("<br/>");

        res.send(`<h1>Publishing App Initial Application!</h1> ${ourArticles}`);
    });
});



app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
