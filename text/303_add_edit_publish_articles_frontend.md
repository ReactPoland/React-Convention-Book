### Focusing on the app's front-end

Currently our app is a simple starter kit, which is a skeleton for our further development. We need focus more our time into the customer's facing front-end because it's important to have good looking front-end in 2016 :-) thanks to Material UI we can re-use many things to make our app looking prettier.

The one important note, the Responsive Web Design is not in the scope at this point (and overally) of writing this book, so all the styles can be improved in that matter regarding mobile. The app that we are going to working on will be looking fine on tablets, the small mobile screens can be not so good.

------------------------------------------
------ TO DELETE BELOW -------------------
note to the editor: if there will be not enough books count, then we can add an extra bonus chapter for the Responsive Web Design (if needed).
------------------------------------------
------------------------------------------


#### Before improving front-end, the back-end wrap-up
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

What is new in our improved handleServerSideRender? As you can see we have added ***async await***. I will recall that it is helping to make our code less painful with asynchronous calls like queries to the database (synchronous-looking generator style code). This ES7's feature helps us to write the asynchronous calls the way as it's a synchronous one - under the hood the async await is much more complicated (after it's transpiled into ES5 so it can be ran in any modern browser) but we won't get into details of how async await because it's not in the scope of this chapter right now.



#### Our website header and articles list look improvements

We are fine with all wrap ups of server-side rendering and fetching articles from DB then let's start with the front-end.

First please delete this below from server/server.js, we don't need anymore:
```
<h1>Server side publishing app</h1>
```

... you can also delete this header in ***src/layouts/PublishingApp.js***:
```
<h1>Our publishing app</h1>
```

... and H1 markups in the Registration and Login View (***src/LoginView.js***):
```
<h1>Login view</h1>
```
and registration in the ***src/RegisterView.js***:
```
<h1>Register</h1>
```


All both h1 paragraphs are not needed as we want to have nice looking design instead of old one.


After that go to the ***src/CoreLayout.js*** and please import a new AppBar component from the Material UI:
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


Next step in order to improve look of our home page is to make articles' card based on the Material Design CSS as well. Let's create a component's file first:

```
$ [[you are in the src/components/ directory of your project]]
$ touch ArticleCard.js
```

... then into that file ***ArticleCard.js***, let's init the ArticleCard's component with the following content:
```
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText 
} from 'material-ui/Card';
import { Paper } from 'material-ui';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>here goes the article card</h1>;
  }
};
export default ArticleCard;
```

... as you can find above, we have imported required components from the ***material-ui/Card*** that will help our home page's articles list looking nice. The next step is to improve our ArticleCard's render function with the following:
```
render() {
  let title = this.props.title || 'no title provided';
  let content = this.props.content || 'no content provided';

  let paperStyle = {
    padding: 10, 
    width: '100%', 
    height: 300
  };

  let leftDivStyle = {
    width: '30%', 
    float: 'left'
  }
  
  let rightDivStyle = {
    width: '60%', 
    float: 'left', 
    padding: '10px 10px 10px 10px'
  }

  return (
    <Paper style={paperStyle}>
      <CardHeader
        title={this.props.title}
        subtitle="Subtitle"
        avatar="/static/avatar.png"
      />

      <div style={leftDivStyle}>
        <Card >
          <CardMedia
            overlay={<CardTitle title={title} subtitle="Overlay subtitle" />}>
            <img src="/static/placeholder.png" height="190" />
          </CardMedia>
        </Card>
      </div>
      <div style={rightDivStyle}>
        {content}
      </div>
    </Paper>);
}
```

... as you can find above, we have created an article card, there are some inline styles for ***Paper component***, ***left and right div***. Feel free to change the styles if you want.

In general, we are missing two static images in the above's render function ***src="/static/placeholder.png"*** and ***avatar="/static/avatar.png"***. Let's add them now with the following steps:

1) Please make a png file with the name of ***placeholder.png*** in the ***dist*** directory. In my case this is how my placeholder.png is looking:

![placeholder.png](http://test.przeorski.pl/book/302_placeholder_img.png)

2) Please also create an avatar.png in the ***dist*** that will be exposed in ***/static/avatar.png***. I won't put here the example, as you can find it's my personal photo ;-)


EXPLANATION: the /static/ file in express.js is exposed in the ***/server/server.js*** file with the following code ***app.use('/static', express.static('dist'));*** (you shall already have it in there as we added this in a previous chapter).

After all the last thing is that you need to import ArticleCard and modify render of the ***layouts/PublishingApp.js*** from the old simple view to the new one:

with adding the import on top of the file:
```
import ArticleCard from '../components/ArticleCard';
```

... and then replacing the render to new one:
```
render () {

  let articlesJSX = [];
  for(let articleKey in this.props.article) {
    let articleDetails = this.props.article[articleKey];
    let currentArticleJSX = (
      <div key={articleKey}>
        <ArticleCard 
          title={articleDetails.articleTitle}
          content={articleDetails.articleContent} />
      </div>
    );

    articlesJSX.push(currentArticleJSX);
  }
  return (
    <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        {articlesJSX}
    </div>
  );
}
```

Above the new code is only putting this new ArticleCard component:
```
<ArticleCard 
  title={articleDetails.articleTitle}
  content={articleDetails.articleContent} />
```
and we also have added some styles to the ***div style={{height: '100%', width: '75%', margin: 'auto'}}***.

After all those above steps, following them one-to-one in terms of styles, this is what you will see:

![home page look v2](http://test.przeorski.pl/book/303_improved_home_page.png)

Register user view:
![register](http://test.przeorski.pl/book/304_registration_view.png)

Login user view:
![login](http://test.przeorski.pl/book/305_login_view.png)



### Dashboard - listing articles & buttons for an add, edit and delete









