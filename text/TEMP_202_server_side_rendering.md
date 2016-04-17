####

The following is the outline for what our server side is going to look like. We are going to set up an Express middleware using app.use to handle all requests that come in to our server. If you’re unfamiliar with Express or middleware, just know that our handleRender function will be called every time the server receives a request.

```
// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) { /* ... */ }
function renderFullPage(html, initialState) { /* ... */ }
```

### Handling the Request

The first thing that we need to do on every request is create a new Redux store instance. The only purpose of this store instance is to provide the initial state of our application.

When rendering, we will wrap <App />, our root component, inside a <Provider> to make the store available to all components in the component tree, as we saw in Usage with React.

The key step in server side rendering is to render the initial HTML of our component before we send it to the client side. To do this, we use ReactDOMServer.renderToString().

We then get the initial state from our Redux store using store.getState(). We will see how this is passed along in our renderFullPage function.


```
import { renderToString } from 'react-dom/server'

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}
```



### Inject Initial Component HTML and State

The final step on the server side is to inject our initial component HTML and initial state into a template to be rendered on the client side. To pass along the state, we add a <script> tag that will attach initialState to window.__INITIAL_STATE__.

The initialState will then be available on the client side by accessing window.__INITIAL_STATE__.

We also include our bundle file for the client-side application via a script tag. This is whatever output your bundling tool provides for your client entry point. It may be a static file or a URL to a hot reloading development server.


```
function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}
```
