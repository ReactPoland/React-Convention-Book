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
import { renderToStaticMarkup } from 'react-dom/server'
import ReactRouter from 'react-router';
import { RoutingContext, match } from 'react-router';
import * as hist  from 'history';
import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';
import fetchServerSide from './fetchServerSide';



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
