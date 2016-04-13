import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import routes from './routes.js';

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import createHashHistory from 'history/lib/createHashHistory';
import { ReactRouter }               from 'react-router';

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
  console.info(111111);
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <div>
        <ReactRouter>
          {reactRoutes}
        </ReactRouter>          
      </div>
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

handleRender(1, 1);

var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
 return new Router(routes);
}));

app.use(express.static('dist'));

app.get('/', (req, res) => { 
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
