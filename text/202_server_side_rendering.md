### Server Side Rendering

Server side rendering is very useful feature in text's content (like news portals) related startups/companies because it helps to be better indexed by different search engines. It's an essential feature for any news & content heavy websites, because it helps grow them organic traffic. In that book we will also run our app with server side rendering.  Second segment of companies where server side rendering may be very useful are entertaining one where use has less patience and he can close the www's browser if a webpage is loading slowly. In general, all B2C (consumer facing) apps shall use server side rendering to improve it's experience with the masses of people who are visitng their websites.

#### Mocking the database response

First of all, we will mock our database reponse on the backend in order to get prepared to go into server side rendering directly, we will change it later in that chapter.

```
$ [[you are in the server directory of your project]]
$ touch fetchServerSide.js
```

The fetchServerSide.js file will consist of all functions that will fetch data from our database in order to make the server side works.

As was mentioned earlier we will mock it for the meanwhile with following code in ***fetchServerSide.js***:
```
export default () => {
	return {
    "article":
    {
      "0": {
        "articleTitle": "SERVER-SIDE Lorem ipsum - article one",
        "articleContent":"SERVER-SIDE Here goes the content of the article"
      },
      
      "1": {
        "articleTitle":"SERVER-SIDE Lorem ipsum - article two",
        "articleContent":"SERVER-SIDE Sky is the limit, the content goes here."
      }
    }
  }
}
```

The goal of making again this mocked object once again, is that we will be able to see if our server-side rendering works correctly after implementation because as you probably have already spotted that we have added this ***SERVER-SIDE*** in the beginng of each title & content - so it will help us to learn that our app is getting the data from server side rendering. Later this function will be replaced with a query to MongoDB.

Next thing that will help us implement the server side rendering is to make a handleServerSideRender function that will be trigerred each time a request hits the server.

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
import { renderToStaticMarkup } from 'react-dom/server'
import ReactRouter from 'react-router';
import { RoutingContext, match } from 'react-router';
import * as hist  from 'history';
import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';
import fetchServerSide from './fetchServerSide';
```

Most of those stuff above are similar from client-side development in previous chapters. Important is to import history in the given way as in the example ***import * as hist  from 'history'***. The ***RoutingContext, match*** is the way of using React-Router on the server side. The ***renderToStaticMarkup*** function is going to generate for us a HTML markup on server-side. 


After we have added those new imports then under falcor's middleware setup:
```
// this already exsits in your codebase
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new FalcorRouter(routes); // this alrady exsits in your codebase
}));
```

... under that ***model.json***'s code, please add the following:

```
let handleServerSideRender = (req, res) =>
{
  return;
};

let renderFullHtml = (html, initialState) =>
{
  return;
};

app.use(handleServerSideRender);
```

The ***app.use(handleServerSideRender)*** is fired each time the server side recives a request from a client's application. Then we have prepared empty functions that we will use:

1) handleServerSideRender - it will use renderToString in order to create a valid server-side's html's markup
2) renderFullHtml - that helper's function will embed our new React's HTML markup into a whole html's document as you can later in a moment down below.

### The handleServerSideRender's function

At first we are going to create a new Redux store instance that will be created on every call to the backend. The main goal of this is to give the initial state information's to our application so it can create a valid markup based on the current request.

We will use the ***Provider***'s component that we already have used in our client-side's app, that will be wrapping the ***Root***'s component. That will make the store available to all our components.


The most important part here is ***ReactDOMServer.renderToString()*** which goal's to render the initial's HTML markup of our application, before we send the markup to the client-side.

Next step is to get the initial state from the Redux store by using function ***store.getState()***. That initial state will be passed along in our renderFullHtml's function as you can learn in a moment.


Before we will work on those two new functions (handleServerSideRender & renderFullHtml) , please replace also this in server.js:
```
app.use(express.static('dist'));
```

with a new:
```
app.use('/static', express.static('dist'));
```
... that only changes that everything what is in our dist project, then it will be available as a static file under localhost address (***http://localhost:3000/static/app.js****). This will help us make Single-Page-App after first server side initial rendering.


After your are done with the above work of express.static, then make this function more complete:
```
let renderFullHtml = (html, initialState) =>
{
  return; // this is already in your codebase
};
```

... the above empty function please replace with the following:
```
let renderFullPage = (html, initialState) =>
{
  return `
    <!doctype html>
    <html>
      <head>
        <title>Publishing App Server Side Rendering</title>
      </head>
      <body>
        <h1>Server side publishing app</h1>
        <div id="publishingAppRoot">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/app.js"></script>
      </body>
    </html>
    `
};
```
In short, this HTML code will be sent by our server when a user hits first time the website so we need to create the HTML markup with body and head in order to make it works. The ***Server side publishing app***'s header is here just for temporary time in order to check if we fetch the server side HTML's template correctly. Later you can find the ***$html*** with ***<div id="publishingAppRoot">${html}</div>*** - in that we will put the value that will be generated by the ***renderToStaticMarkup***'s function later. The last step in that renderFullPage function is to give the initial, server-side rendering's state into the window with: window.__INITIAL_STATE__ = ${JSON.stringify(initialState)} so the app can works correctly on the client-side with data fetched on the back-end side when the first request to the server has been done. 

OK, next let's focus on the handleServerSideRender's function, please replace this:
```
let handleServerSideRender = (req, res) =>
{
  return;
};
```

... with more complete version of that function as following:
```
let handleServerSideRender = (req, res, next) => {
  let initMOCKstore = fetchServerSide(); // mocked for now

  // Create a new Redux store instance
  const store = createStore(rootReducer, initMOCKstore);
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

      let html = renderToStaticMarkup(
        <Provider store={store}>
          <RoutingContext {...renderProps}/>
        </Provider>
      );

      const initialState = store.getState()

      let fullHTML = renderFullPage(html, initialState);
      res.send(fullHTML);
    }
  });
}
```
The ***let initMOCKstore = fetchServerSide();*** is fetching data from MongoDB (mocked for now, later we will improve it). Next we create a server-side's Redux story with ***store = createStore(rootReducer, initMOCKstore)***. We also need to prepare a correct location of our app's user consumable by the React-Router with ***location = hist.createLocation(req.path)*** (in req.path there is simple path which is in the browser like ***/register*** or ***/login*** or simply main page ***/***). The function ***match*** is provided by the React-Router in order to match the correct route on the server-side.

... and when we have matched the route on the server side then we see:
```
// this is already added to your codebase:
let html = renderToStaticMarkup(
  <Provider store={store}>
    <RoutingContext {...renderProps}/>
  </Provider>
);

const initialState = store.getState();

let fullHTML = renderFullPage(html, initialState);
res.send(fullHTML);
```

As you can see above we are creating the server-side HTML markup with the renderToStaticMarkup. Inside this function there is a Provider with the store that has been fetched with the ***let initMOCKstore = fetchServerSide()*** previously. Inside the Redux's Provider we have the ***<RoutingContext {...renderProps}/>*** which simply passed all required props down into our app so we can have correctly created markup server side.

After all that we only prepare the initialState of our's Redux Store with ***const initialState = store.getState();*** and later ***let fullHTML = renderFullPage(html, initialState);*** so we get everything we need to send it to the client with ***res.send(fullHTML)***.


We are done with server-side preparations. 

### Front-end tweaks in order to make the server-side rendering works


We need some tweaks on front-end. First of them, please go to the file in the ***src/layouts/CoreLayout.js***'s location and add these stuff:
```
import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });

class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
```
... from the above code, the new thing to add is:
```
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });
```

... besides that, please improve the render function to:
```
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <span>Links: <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link> | <Link to='/'>Home Page</Link></span>
            <br/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
```

We need the changes in the CoreLayout's component because Material UI Design from default is checking on what browser your run it and as you can predict, there is no browser on the server side so we need to provide that information in our app that the ***{ userAgent: 'all' }*** is set to all. It will help avoid us warning in the console that the server-side HTML markup is different from the one generated by client-side's browser.


We also improve our componentWillMount/_fetch function in the PublishingApp's component, so it will be fired only on the front-end, please go to the file ***src/layouts/PublishingApp.js*** then replace this old code:
```
componentWillMount() {
  this._fetch();
}
```

with the new improved one:
```
componentWillMount() {
  if(typeof window !== 'undefined') {
    this._fetch(); // we are server side rendering, no fetching
  }
}
```

That ***if(typeof window !== 'undefined')*** statement checks if there is window (on server side the window will be undefined), if yes then it starts fetching data via Falcor (when on client-side).

Next go to the ***containers/Root.js***'s file and make it as following:
```
import React                    from 'react';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import routes                   from '../routes';
import createHashHistory        from 'history/lib/createHashHistory';

export default class Root extends React.Component {
  static propTypes = {
    history : React.PropTypes.object.isRequired,
    store   : React.PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={this.props.history}>
            {routes}
          </Router>          
        </div>
      </Provider>
    );
  }
}
```

As you can find above, we have deleted this part of the code:
```
// deleted code from Root.js
let noQueryKeyHistory = createHashHistory({
  queryKey: false
});
```

and we changed this:
```
<Router history={noQueryKeyHistory}>
```
into this:

```
<Router history={this.props.history}>
```

Why we need to do all this above? It helps us to get rid off ***/#/*** sign from our client-side browser's url so next time when we hit for example ***http://localhost:3000/register*** then our ***server.js*** can see the user's current url with the ***req.path*** (***in our case when hitting the http://localhost:3000/register then the req.path is equal to /register***) that we use in the handleServerSideRender's function.


After all that, then you will be able to see in your client-browser as following:

![server side html markup](http://test.przeorski.pl/book/201_server_side_markup.png)

... and just after 1-2 seconds it will change to this below because of firing real ***this._fetch()*** function in the PublishingApp.js

![server side html markup](http://test.przeorski.pl/book/202_client_side_markup.png)

... and of course you can see the server-rendered markup when you will go to the page's HTML source:
![server side html markup](http://test.przeorski.pl/book/203_markup_html_source.png)


As you can see, the only missing piece in that server side rendering is to fetch real data from our MongoDB. In next chapter we will:

- 1) unmock this fetching in the ***server/fetchServerSide.js***

- 2) improve look of our current app

- 3) start improving whole application both on front-end and backend






