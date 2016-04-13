### Server Side Rendering

The first thing in order to make the server side rendering work is to make a handleServerSideRender function that will be trigerred each time a request hits the server.

In order to make the handleServerSideRender trigger every time the front-end calls our backend we need to use Express middleware using ***app.use***. So far we were using some external libraries like:
- ***app.use(cors());***
- ***app.use(bodyParser.json({extended: false}))***
- etc.

For the first time in that book, we will write our own small's middleware function that behave similar ways to the cors or bodyParser.


Before doing so, let's import our dependencies that are required in React's server side rendering:
```
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ReactRouter }               from 'react-router';
```


