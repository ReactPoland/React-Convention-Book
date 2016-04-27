### Focusing on the app's front-end

Currently our app is a simple starter kit, which is a skeleton for our further development. We need focus more our time into the customer's facing front-end because it's important to have good looking front-end in 2016 :-) thanks to Material UI we can re-use many things to make our app looking prettier.

The one important note, the Responsive Web Design is not in the scope at this point (and overally) of writing this book, so all the styles can be improved in that matter regarding mobile. The app that we are going to working on will be looking fine on tablets, the small mobile screens can be not so good.

------------------------------------------
------ TO DELETE BELOW -------------------
note to the editor: if there will be not enough books count, then we can add an extra bonus chapter for the Responsive Web Design (if needed).
------------------------------------------
------------------------------------------


#### Before working a prettier front-end
In our last chapter we have done a server side rendering which will affect our users in order that they will see their articles quicker and will improve our website SEO as whole HTML markup is rendering on the server-side.

The last thing to make our server-side rendering works in 100% is that has left for us is to unmock the server-side articles fetch in the ***/server/fetchServerSide.js***, the new code for fetching:
```
import configMongoose from './configMongoose';
let Article = configMongoose.Article;

export default () => {
  return Article.find({}, function(err, articlesDocs) {
    return articlesDocs;
  }).then ((articlesArrayFromDB) => {
    return {
      "article": articlesArrayFromDB
    };
  });
}
```

As you can find above, that function is returning a ***promise*** with ***Article.find*** (the find function comes from Mongoose). You can also find that we are returning an array of articles that are fetched from our MongoDB.


The next step is to tweak the ***handleServerSideRender*** function that is currently kept in the /server/server.js file ... the current function as below:

```
// this below already shall be in your code-base:
let handleServerSideRender = (req, res, next) => {
  let initMOCKstore = fetchServerSide(); // mocked for now

  // Create a new Redux store instance
  const store = createStore(rootReducer, initMOCKstore)
  const location = hist.createLocation(req.path);
```

... we need to replace with an improved one:

```
// this below is an improved version:
let handleServerSideRender = async (req, res, next) => {
  let articlesArray = await fetchServerSide();
  let initMOCKstore = {
    article: articlesArray
  }

  // Create a new Redux store instance
  const store = createStore(rootReducer, initMOCKstore)
  const location = hist.createLocation(req.path);
```

What is new in our improved handleServerSideRender? As you can see we have added ***async await***. I will recall that it is helping to make our code less painful with asynchronous calls like queries to the database (synchronous-looking generator style code). This ES7's feature helps us to write the asynchronous calls the way as it's a synchronous one - under the hood the async await is much more complicated (after it's transpiled into ES5 so it can be ran in any modern browser) but it's not in the scope of this chapter right now.



#### Our website header and articles list look improvements

Let's start with header, first please delete this below from server/server.js, we don't need anymore:
```
<h1>Server side publishing app</h1>
```

... you can also delete this header in ***src/layouts/PublishingApp.js***:
```
<h1>Our publishing app</h1>
```


After that go to the ***src/CoreLayout.js*** and please import a new AppBar component:
```
import AppBar from 'material-ui/AppBar';
```

.. and add this AppBar together with inline styles into the render:
```
  render () {
    const buttonStyle = {
      margin: 5
    };
    const homeIconStyle = {
      margin: 5,
      paddingTop: 5
    };
    
    let menuLinksJSX = (<span>
        <Link to='/register'><RaisedButton label="Register" style={buttonStyle}  /></Link> 
        <Link to='/login'><RaisedButton label="Login" style={buttonStyle}  /></Link> 
      </span>);

    let homePageButtonJSX = (<Link to='/'>
        <RaisedButton label={<ActionHome />} style={homeIconStyle}  />
      </Link>);


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title='Publishing App'
            iconElementLeft={homePageButtonJSX}
            iconElementRight={menuLinksJSX} />
            <br/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
```

What we have done above? We have added the inline styles for ***buttonStyle*** and ***homeIconStyle*** in order to make the ***menuLinksJSX*** and ***homePageButtonJSX*** looking better. This is how your app shall be looking after those AppBar changes:

![AppBar look v1](http://test.przeorski.pl/book/301_AppBar_app_look.png)






