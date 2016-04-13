### Server Side Rendering

The first thing in order to make the server side rendering work is to make a handleServerSideRender function that will be trigerred each time a request hits the server.

In order to make the handleServerSideRender trigger every time the front-end calls our backend we need to use Express middleware using ***app.use***. So far we were using some external libraries like:
- ***app.use(cors());***
- ***app.use(bodyParser.json({extended: false}))***
- etc.

For the first time in that book, we will write our own small's middleware function that behave similar ways to the cors or bodyParser.


Before doing so, let's import our dependencies that are required in React's server side rendering (server/server.js):
```
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ReactRouter }               from 'react-router';
```

After we have added those new imports then under them do the following:

```
app.use(handleServerSideRender);

// We are going to fill these out in the sections to follow
function handleServerSideRender(req, res) { }
function renderFullHtml(html, initialState) { }
```
The ***app.use(handleServerSideRender)*** is fired each time the server side recives a request from a client's application. Then we have prepared empty functions that we will use:

1) handleServerSideRender - it will use renderToString in order to create a valid server-side's html's markup
2) renderFullHtml - that helper's function will embed our new React's HTML markup into a whole html's document as you can later in a moment down below.

### The handleServerSideRender's function

At first we are going to create a new Redux store instance that will be created on every call to the backend. The main goal of this is to give the initial state information's to our application so it can create a valid markup based on the current request.

We will use the ***Provider***'s component that we already have used in our client-side's app, that will be wrapping the ***Root***'s component. That will make the store available to all our components.


The most important part here is ***ReactDOMServer.renderToString()*** which goal's to render the initial's HTML markup of our application, before we send the markup to the client-side.

Next step is to get the initial state from the Redux store by using function ***store.getState()***. That initial state will be passed along in our renderFullHtml's function as you can learn in a moment.










