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

import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';

global.navigator = { navigator: 'all' };

var app = express();
app.server = http.createServer(app);

// app.use(express.static('dist'));

app.use('/static', express.static('dist'));

//...other express configuration
const {RoutingContext, match} = require('react-router');
const hist = require('history');


function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="publishingAppRoot">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/app.js"></script>
      </body>
    </html>
    `
}


app.use((req, res, next) => {
  console.info('req.path');
  console.info('req.path');
  console.info(req.path);
  console.info('req.path');
  console.info('req.path');
  console.info('req.path');
  const store = createStore(rootReducer);
  
  const location = hist.createLocation(req.path);
  match({
    routes: reactRoutes,
    location: location,
  }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (err) {
      console.log(err);
      next(err);
      // res.send(500, error.message);
    } else if (renderProps === null) {
      res.status(404)
        .send('Not found');
    } else {

      let html = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps}/>
        </Provider>
      );

      const initialState = store.getState()

      res.send(renderFullPage(html, initialState));
    }
  });
});

    //...other express configuration



app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
