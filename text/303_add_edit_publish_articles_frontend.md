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

#### Improving the handleServerSideRender



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



#### Changing routes in Falcor (frontend and backend)

You need also replace in two placed the ***id***'s variable name into the ***_id*** (the _id is a default name for the ID of a document in a Mongo's collection):

1) Changes in ***server/routes.js*** from old code below:

```
route: 'articles[{integers}]["id","articleTitle","articleContent"]',
```

... into a new one:
```
route: 'articles[{integers}]["_id","articleTitle","articleContent"]',
```

The only change is that we will return _id instead of id.

2) We need to fetch the _id in the src/layouts/PublishingApp.js so please change this below:
```
get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
```

.. into the new one with _id:
```
get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent']]). 
```




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



### Dashboard - add article button, logout and header's improvements

Our plan for now is to:
1) create logout mechanism
2) make our header aware if a user is logged in or not and based on that information show different buttons in the header (Login/Register when is not logged in and Dashboard/Logout when a user is logged in)
3) we will create an add article button in our dashboard and create a mocked view with a mocked WYSWIG (later we will unmock them)


The WYSWIG mock will be located in ***src/components/articles/WYSWIGeditor.js*** so you need to create a new directory and file in components with following commands:
```
$ [[you are in the src/components/ directory of your project]]
$ mkdir articles
$ cd articles
$ touch WYSWIGeditor.js
```

... and then our WYSWIGeditor.js mock content is:
```
import React from 'react';

class WYSWIGeditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>WYSWIG editor</h1>;
  }
};

export default WYSWIGeditor;
```

The next step is to create a logout view at ***src/views/LogoutView.js*** location:
```
$ [[you are in the src/views/ directory of your project]]
$ cd articles
$ touch WYSWIGeditor.js
```

... and the ***src/views/LogoutView.js*** content is:
```
"use strict";

import React from 'react';
import { Paper } from 'material-ui';

class LogoutView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(typeof localStorage !== 'undefined' && localStorage.token) {
      delete localStorage.token;
      delete localStorage.username;
      delete localStorage.role;
    }
  }

  render () {
    return (
      <div style={{width: 400, margin: "auto"}}>
        <Paper zDepth={3} style={{padding: 32, margin: 32}}>
          Logout successful.
        </Paper>
      </div>
    );
  }
}

export default LogoutView;
```

The logout view above is a simple view without connect function to the redux (like in comparision the ***LoginView.js***). We are using some styling to make it nice with ***Paper***'s component from Material-UI.

The ***componentWillMount*** function is deleting from localStorage information when user's lands on the logout page. As you can see it also checks if there is locaStorage with ***if(typeof localStorage !== 'undefined' && localStorage.token) *** because as you can imagine when you do server-side rendering then the ***localStorage*** is an undefined (server side doesn't have localStorage and window in comparision to the client-side).


#### IMPORTANT: Before creating an add article feature on front-end

We came into the point, where you need to delete all documents from your articles collection, otherwise if not then you may have some trouble with next steps as we are going to use a Draft-JS's library and some other stuff that will need a new schema on the backend. We will create that backend's schema in the next chapter as this chapter is focused on front-end.

PLEASE delete all documents in your articles' MongoDB's collection right now, but please keep the users' collection as it was (please don't delete users' from database).

#### The AddArticleView's component

After we having the LogoutView and the WYSWIGeditor's components, let's create the last piece of missing components in our process - it's the ***src/views/articles/AddArticleView.js***, so let's create a directory and file now:
```
$ [[you are in the src/views/ directory of your project]]
$ mkdir articles
$ cd articles
$ touch AddArticleView.js
```

After you have that file in your views/articles' directory then we need to put the content into that:
```
"use strict";

import React from 'react';
import { connect } from 'react-redux';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor.js';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({

});

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleView);
```

As you can see above it's a simple React's view and it imports the WYSWIGeditor that we have created a moment ago (***import WYSWIGeditor from '../../components/articles/WYSWIGeditor.js'***). We have some inline styles in order to make the view looking nicer for our user.


Let's create two new routes for a logout and for an add article feature with modyfing the routes file at the ***src/routes/index.js**'s location:
```
import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';

/* wrappers */
import CoreLayout                   from '../layouts/CoreLayout';

/* home view */
import PublishingApp                    from '../layouts/PublishingApp';

/* auth views */
import LoginView                    from '../views/LoginView';
import LogoutView                    from '../views/LogoutView';
import RegisterView                    from '../views/RegisterView';

import DashboardView                    from '../views/DashboardView';
import AddArticleView                    from '../views/articles/AddArticleView';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={PublishingApp} name='home' />
    <Route component={LoginView} path='login' name='login' />
    <Route component={LogoutView} path='logout' name='logout' />
    <Route component={RegisterView} path='register' name='register' />
    <Route component={DashboardView} path='dashboard' name='dashboard' />
    <Route component={AddArticleView} path='add-article' name='add-article' />
  </Route>
);
```

Above in our ***src/routes/index.js*** we have added two routes:
```
<Route component={LogoutView} path='logout' name='logout' />
```
and
```
<Route component={AddArticleView} path='add-article' name='add-article' />
```

Please don't forget to import those two views' components with:
```
import LogoutView                    from '../views/LogoutView';
import AddArticleView                    from '../views/articles/AddArticleView';
```

Right now we have created the views and we have created routes into that view. The last piece is to show links into those two routes in our app.

First let's create the ***src/layouts/CoreLayout.js***'s component so it will have a login/logout's login so a logged user will see other buttons than a non-logged user. Please modify the render function in the CoreLayout's component to this new below:
```
   render () {
    const buttonStyle = {
      margin: 5
    };
    const homeIconStyle = {
      margin: 5,
      paddingTop: 5
    };
    
    let menuLinksJSX;
    let userIsLoggedIn = typeof localStorage !== 'undefined' && localStorage.token && this.props.routes[1].name !== 'logout';
    
    if(userIsLoggedIn) {
      menuLinksJSX = (<span>
          <Link to='/dashboard'><RaisedButton label="Dashboard" style={buttonStyle}  /></Link> 
          <Link to='/logout'><RaisedButton label="Logout" style={buttonStyle}  /></Link> 
        </span>);
    } else {
      menuLinksJSX = (<span>
          <Link to='/register'><RaisedButton label="Register" style={buttonStyle}  /></Link> 
          <Link to='/login'><RaisedButton label="Login" style={buttonStyle}  /></Link> 
        </span>);
    }

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
... as you can find above the new part of the mode is this:
```
  let menuLinksJSX;
  let userIsLoggedIn = typeof localStorage !== 'undefined' && localStorage.token && this.props.routes[1].name !== 'logout';
  
  if(userIsLoggedIn) {
    menuLinksJSX = (<span>
        <Link to='/dashboard'><RaisedButton label="Dashboard" style={buttonStyle}  /></Link> 
        <Link to='/logout'><RaisedButton label="Logout" style={buttonStyle}  /></Link> 
      </span>);
  } else {
    menuLinksJSX = (<span>
        <Link to='/register'><RaisedButton label="Register" style={buttonStyle}  /></Link> 
        <Link to='/login'><RaisedButton label="Login" style={buttonStyle}  /></Link> 
      </span>);
  }
```

We have created a ***let userIsLoggedIn = typeof localStorage !== 'undefined' && localStorage.token && this.props.routes[1].name !== 'logout';***. The userIsLoggedIn's variable is finding if we are not on the server side (then it's doesn't have localStorage as mentioned already in that chapter). Then it checks if the ***localStorage.token*** and if yes, then it checks in case if a user didn't click the logout's button with the ***this.props.routes[1].name !== 'logout'***. The ***this.props.routes[1].name***'s value/information is provided by the redux's router and react-router - and this is always the name of our current route on the client-side so we can render the proper buttons based on that inforamtion.

As you can find, we have added that ***if(userIsLoggedIn)*** statement and a new part are the dashboard && logout RaisedButtons with links to the correct routes.


The last piece to wrap up at this stage is to modify the ***src/views/DashboardView.js***'s component. Import the Link from react-router by adding Link. Also we need to import new material-UI's components in order to make the DashboardView nicer:
```
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
```

After you have imported all this above in your ***src/views/DashboardView.js*** then we need to start work on improving the render function:

```
  render () {
    
    let articlesJSX = [];
    for(let articleKey in this.props.article) {
      let articleDetails = this.props.article[articleKey];
      let currentArticleJSX = (
        <ListItem
          key={articleKey}
          leftAvatar={<img src="/static/placeholder.png" width="50" height="50" />}
          primaryText={articleDetails.articleTitle}
          secondaryText={articleDetails.articleContent}
        />
      );

      articlesJSX.push(currentArticleJSX);
    }
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <Link to='/add-article'>
          <RaisedButton 
            label="Create an article" 
            secondary={true} 
            style={{margin: '20px 20px 20px 20px'}} />
        </Link>

        <List>
          {articlesJSX}
        </List>
      </div>
    );
  }
```

Above is our new render function of the DashboardView. We are using the ListItem's component to make our nice lists. We have also added the link and button to the ***/add-article***'s routes. There are some inline styles but feel free to style this app on your own.

Below you can find screenshots how the app looks after all those changes:



Add an article button with a new view of articles:
![306_add_article_button_articles_list](http://test.przeorski.pl/book/306_add_article_button_articles_list.png)

Mocked WYSWIG on the /add-article view:
![307_mocked_wyswig](http://test.przeorski.pl/book/307_mocked_wyswig.png)

Our new logout view page:
![308_logout_view](http://test.przeorski.pl/book/308_logout_view.png)


#### Start working on our WYSWIG

Let's install a Draft-JS' library which is "a framework for building rich text editors in React, powered by an immutable model and abstracting over cross-browser differences" as stated on their website.

In general, Draft-JS is made by friends from Facebook and it helps making powerfull WYSWIG's tools. It will be useful in our Publishing's App as we want give a good tools for our editors in order to create interesting articles on our platform.

Let's install it first:
```
npm i --save draft-js@0.5.0
```

We will use version ***0.5.0*** of draft-js in our book. Before we start coding let's install one more dependency which will be helpful later in fetching the articles' from DB via Falcor by:

```
npm i --save falcor-json-graph@1.1.7
```

In general, the ***falcor-json-graph@1.1.7*** provides us ability to use different sentinels provided via this Falcor's helper library (which will be described in details in the next chapter).


#### Stylesheet for the DraftJS' WYSWIG

It's the only place where I will put a CSS's stylesheet because of the Draft-JS, you need to create a new css file in the dist folder at ***dist/styles-draft-js.css***'s location:

```
.RichEditor-root {
  background: #fff;
  border: 1px solid #ddd;
  font-family: 'Georgia', serif;
  font-size: 14px;
  padding: 15px;
}

.RichEditor-editor {
  border-top: 1px solid #ddd;
  cursor: text;
  font-size: 16px;
  margin-top: 10px;
  min-height: 100px;
}

.RichEditor-editor .RichEditor-blockquote {
  border-left: 5px solid #eee;
  color: #666;
  font-family: 'Hoefler Text', 'Georgia', serif;
  font-style: italic;
  margin: 16px 0;
  padding: 10px 20px;
}

.RichEditor-controls {
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
}

.RichEditor-styleButton {
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
}

.RichEditor-activeButton {
  color: #5890ff;
}
```

... and after you have created this file at ***dist/styles-draft-js.css*** then we need to import this in the server/server.js where we are creating the HTML's header so that code below which already exsits in server.js' file:
```
let renderFullPage = (html, initialState) =>
{
  return `
    <!doctype html>
    <html>
      <head>
        <title>Publishing App Server Side Rendering</title>
        <link rel="stylesheet" type="text/css" href="/static/styles-draft-js.css" />
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
};
```
... then you need to include the link to the stylesheet with:
```
<link rel="stylesheet" type="text/css" href="/static/styles-draft-js.css" />
```

Nothing fancy so far... after we are done with the styles for our Rich Text's WYSWIG editor then let's make a fun.


#### Coding Draft-JS' skeleton
Let's get back to the ***src/components/articles/WYSWIGeditor.js***'s file - it's currently mocked, but we will improve it right now.

Just to make you aware, we will make a skeleton of WYSWIG right now - we will improve it later in that book. At this point, the WYSWIG won't have any functionalities like making text bold or creating a lists with OL or UL's elements.


```
import React from 'react';
import {
  Editor, 
  EditorState, 
  ContentState, 
  RichUtils, 
  convertToRaw,
  convertFromRaw
} from 'draft-js';


export default class  WYSWIGeditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));

    this.state = {
      editorState: initialEditorFromProps
    };

    this.onChange = (editorState) => { 
      var contentState = editorState.getCurrentContent();

      let contentJSON = convertToRaw(contentState);
      props.onChangeTextJSON(contentJSON, contentState);
      this.setState({editorState}) 
    };
  }

  render() {
    return <h1>WYSWIG editor</h1>;
  }
}
```

Above we have created only a constructor of our new Draft-JS's WYSWIG. The ***let initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));*** is simply creating an empty WYSWIG container - later we will improve it so we will be able to receive a ContentState from database when we would like to edit our WYSWIG.

The ***editorState: initialEditorFromProps*** is our current state. Our ***this.onChange = (editorState) => { *** is firing on each change, so our view component at ***src/views/articles/AddArticleView.js*** will know about any changes in the WYSWIG.

Anyway, you shall check the documentation of Draft-JS at https://facebook.github.io/draft-js/ 

This is just beginning, next step is to add under the onChange two new:
``` 
this.focus = () => this.refs['WYSWIGeditor'].focus();
this.handleKeyCommand = (command) => this._handleKeyCommand(command);
```

and a new function in our WYSWIGeditor class:
```
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
```


After all those changes this is how should looks like your construction of the WYSWIGeditor:
```
export default class  WYSWIGeditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));

    this.state = {
      editorState: initialEditorFromProps
    };

    this.onChange = (editorState) => { 
      var contentState = editorState.getCurrentContent();

      let contentJSON = convertToRaw(contentState);
      props.onChangeTextJSON(contentJSON, contentState);
      this.setState({editorState}) 
    };

    this.focus = () => this.refs['refWYSWIGeditor'].focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }
```

... and rest of this class is as following:
```

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    return <h1>WYSWIG editor</h1>;
  }
}
```

Next step is to improve the render function with the following code:
```
  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className="RichEditor-root">
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref='refWYSWIGeditor' />
          </div>
        </div>
      </div>
    );
  }
```

Above what we do is simply using the Draft-JS's API in order to make a simple RichEditor - later we will make it more functional, but for now let's focus on something simple.

#### Improving the views/articles/AddArtivleView's component

Before we will move forward with adding all the WYSWIG's features like bolding, we need to improve the ***views/articles/AddArtivleView.js*** with few things:

1) Install a library which will convert Draft-JS' state into a plain HTML with:
```
npm i --save draft-js-export-html@0.1.13
```
We will use this library in order to save a read-only plain HTML for our regular readers.

2) next import that into the src/views/articles/AddArtivleView.js:

```
import { stateToHTML } from 'draft-js-export-html';
```

3) Improve the AddArticleView with changing a constructor and adding a new function called ***_onDraftJSChange***:
```

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);

    this.state = {
      contentJSON: {},
      htmlContent: ''
    };
  }

  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }
```

##### THE EXPLANATION: 
We need to save on each change a state of ***this.setState({contentJSON, htmlContent});***. This is because contentJSON will be saved into database in order to have an immutable information about our WYSWIG and the htmlContent will be server for our readers. Both variables htmlContent and contentJSON will be keept in the articles' collection.


4) The last thing in the AddArticleView is to modify render to new code as following:
```
  render () {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor
          initialValue=''
          title="Create an article"
          onChangeTextJSON={this._onDraftJSChange} />
      </div>
    );
  }
```

After all those changes, the new view that you shall see is:

![draftjs v1 wyswig](http://test.przeorski.pl/book/309_draftjs_wyswig_v1.png)



#### Adding more feautres like bold text in our WYSWIG

Let's starting working on version two of our WYSWIG, with more options as on the example below:

![draftjs v2 wyswig](http://test.przeorski.pl/book/310_draftjs_wyswig_v2.png)

After you will follow the steps below you will be able to format your text as below and extract HTML's markup from it as well so we can save both JSON's state of our WYSWIG and plain HTML in our MongoDB's articles collection.


First we need to create the WYSWIG buttons in the ***src/components/articles/wyswig/WYSWIGbuttons.js***'s location:

```
$ [[you are in the src/components/articles directory of your project]]
$ mkdir wyswig
$ cd wyswig
$ touch WYSWIGbuttons.js
```

The content of this file will be the buttons' component:
```
import React from 'react';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
```

The code above is giving us a reusable button with a certain label at ***this.props.label***.

Next under that component you can put following object:
```

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'}
];
```

This object is block types that we can create in our Draft-JS' WYSWIG, it is used in the component below:
```
export const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
```

Above is a whole bunch of buttons for BlockStyles' formatting, we will import it in the WYSWIGeditor in a while as you can see we are exporting it with ***export const BlockStyleControls = (props) => {*** that statement.

Under the ***BlockStyleControls***'s component put next object, but this time for inline styles like BOLD (etc.):
```
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'}
];
```

As you can see above in our WYSWIG an editor will be able to use bold, italic and underline.

... and the last component for those inline styles that you can put under all this is:
```
export const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
```

As you can see this is very simple, each time in the blocks and inline styles we are mapping the defined styles and based on each iteration we are creating a ***StyleButton***.

Next step is to import both ***InlineStyleControls*** and ***BlockStyleControls*** in our WYSWIGeditor's component (***src/components/articles/WYSWIGeditor.js***):
```
import { BlockStyleControls, InlineStyleControls } from './wyswig/WYSWIGbuttons';
```

then in the WYSWIGeditor's constructor:
```
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
```
... bind to the ***toggleInlineStyle*** and ***toggleBlockType*** a this.

and create these two new functions:
```
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
```

Above both functions are using Draft-JS' RichUtils in order to set flags inside our WYSWIG that we are using certain formatting options from ***BLOCK_TYPES*** and ***INLINE_STYLES*** that we have defined in the ***import { BlockStyleControls, InlineStyleControls } from './wyswig/WYSWIGbuttons';***.


After we are done with improving our WYSWIGeditor's construction and the _toggleBlockType and _toggleInlineStyle functions then we can start improving our render function:

```
  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType} />
            
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle} />

          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref='WYSWIGeditor' />
          </div>
        </div>
      </div>
    );
  }
```

As you can notice above we have only added the ***BlockStyleControls*** and ***InlineStyleControls*** component. Please also notice that we are using callbacks with the ***onToggle={this.toggleBlockType}*** and ***onToggle={this.toggleInlineStyle}*** - this is for communicating between our WYSWIGbuttons and the Draft-JS' RichUtils about what a user has clicked and in which mode is currently (like bold, header1, UO or OL list, and so on, and so on).


#### Push a new article into article's reducer

We need to create a new action called ***pushNewArticle*** in the ***src/actions/article.js***'s location:
```
export default {
  articlesList: (response) => {
    return {
      type: 'ARTICLES_LIST_ADD',
      payload: { response: response }
    }
  },
  pushNewArticle: (response) => {
    return {
      type: 'PUSH_NEW_ARTICLE',
      payload: { response: response }
    }
  }

}
```

Next step is to improve the ***src/components/ArticleCard.js*** component with improving the render function of it:
```
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
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </Paper>);
  }
```

Above we have replaced old ***{content}*** to:
```
<div dangerouslySetInnerHTML={{__html: content}} />
```

This will help us to show our readers the HTML code generated by our WYSWIG.



#### MapHelpers for improving our reducers

In general, all reducer MUST return a new reference into an object when it has changed. In our first example, we have used Object.assign:

```
// this already exsits in your codebase
case 'ARTICLES_LIST_ADD':state, articlesList);
  let articlesList = action.payload.response;
  return Object.assign({}, articlesList);
```
We will replace this Object.assign approach to new one with ES6's maps:

```
case 'ARTICLES_LIST_ADD':
  let articlesList = action.payload.response;
  return mapHelpers.addMultipleItems(state, articlesList);
```

Above you can find a new ***ARTICLES_LIST_ADD*** with ***mapHelpers.addMultipleItems(state, articlesList)***. 

In order to make our map helpers, we need to create a new directory called ***utils*** and a file called ***mapHelpers.js*** (src/utils/mapHelpers.js):

```
$ [[you are in the src/ directory of your project]]
$ mkdir utils
$ cd utils
$ touch mapHelpers.js
```

... and then you can put a first function into that ***src/utils/mapHelpers.js***'s file:
```
const duplicate = (map) => {
  const newMap = new Map();
  map.forEach((item, key) => {
    if(item['_id']) {
      newMap.set(item['_id'], item);
    }
  });
  return newMap;
};

const addMultipleItems = (map, items) => {
  const newMap = duplicate(map);

  Object.keys(items).map((itemIndex) => {
    let item = items[itemIndex];
    if(item['_id']) {
      newMap.set(item['_id'], item);
    }
  });

  return newMap;
};
```

EXPLANATION:

1) The ***duplicate*** simply creates a new reference in a memory in order to have our immutability required in the Redux's applications. We also are checking if there is no edge case with ***if(key === item['_id'])*** that the key is different from our object id (the sign '_' in '_id' is intentional as this is how Mongoose marks the id from our DB).

2) The ***addMultipleItems*** function is adding items to the new duplicated map (for example after successful fetch of articles).


Next code that we require in the same file at ***src/utils/mapHelpers.js***:
```
const addItem = (map, newKey, newItem) => {
  const newMap = duplicate(map);
  newMap.set(newKey, newItem);
  return newMap;
};

const deleteItem = (map, key) => {
  const newMap = duplicate(map);
  newMap.delete(key);

  return newMap;
};


export default {
  addItem,
  deleteItem,
  addMultipleItems
};
```

As you can see, we have added a single item add function and a delete function. After that we are exporting all those from the ***src/utils/mapHelpers.js***.


Next step is that we need to improve the ***src/reducers/article.js***'s reducer in order to use those map utils in it:
```
import mapHelpers from '../utils/mapHelpers';

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_LIST_ADD':
      let articlesList = action.payload.response;
      return mapHelpers.addMultipleItems(state, articlesList);
    case 'PUSH_NEW_ARTICLE':
      let newArticleObject = action.payload.response;
      return mapHelpers.addItem(state, newArticleObject['_id'], newArticleObject);
    default:
      return state;
  }
}

export default article
```

What's new in the ***src/reducers/article.js***'s file? So as you can see we have improved the ***ARTICLES_LIST_ADD*** (already discussed in previous pages). We have added a new ***PUSH_NEW_ARTICLE*** - this will push a new object into our reducer's state tree. It's similar to push an item to the array, but instead we use our reducer and maps.

#### The CoreLayout improvements

Because we are switching to the ES6's Map in front-end we need also to make sure that after we receive an Object with server-side rendering, then it is also a Map (not a plain JS object).

```
"use strict"; 
  
import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });

import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import ActionHome from 'material-ui/lib/svg-icons/action/home';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});
```

Above on top of the CoreLayout we have added the redux's tools so we will have a state tree and the actions available in the CoreLayout's component.

Then also in the CoreLayout please add this componentWillMount's function:
```
  componentWillMount() {
    if(typeof window !== 'undefined' && !this.props.article.get) {
      this.props.articleActions.articlesList(this.props.article);
    }
  }
```

This function is responsible to check if an article props are an ES6's Map or not. If not then we send an action to articlesList which makes the job done, and after that we have maps in our ***this.props.article***.

The last thing is to improve export's in the CoreLayout:
```
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
```

Above helps us to connect to the Redux's single-state-tree and the actions.

#### Explanation, why maps over a JS object?
In general, an ES6 Map has some features for easy data manipulation like functions ***.get***, ***.set*** which makes programming more pleasurable. It also helps us to have esier code to ready with keeping our immutability required by Redux. 

Maps' methods are much easier to use than ***slice/concat/Object.assign's*** etc. I am sure that there are always some cons/pros for each approach, but in our app we will use ES6 Map-wise approach in order to keep things simpler after we are set-up in 100% with it.


#### Improving the PublishingApp and DashboardView

In the ***src/layouts/PublishingApp.js*** we need to improve our render function:
```
render () {

  let articlesJSX = [];

  this.props.article.forEach((articleDetails, articleKey) => {
    let currentArticleJSX = (
      <div key={articleKey}>
        <ArticleCard 
          title={articleDetails.articleTitle}
          content={articleDetails.articleContent} />
      </div>
    );

    articlesJSX.push(currentArticleJSX);
  });

  return (
    <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        {articlesJSX}
    </div>
  );
}
```

As you can see above, we switched old ***for(let articleKey in this.props.article) {*** into new ***this.props.article.forEach*** because we have switched from objects to using maps.

The same we need to do in the ***src/views/DashboardView.js***'s render function:
```
  render () {
    
    let articlesJSX = [];
    this.props.article.forEach((articleDetails, articleKey) => {
      let currentArticleJSX = (
        <ListItem
          key={articleKey}
          leftAvatar={<img src="/static/placeholder.png" width="50" height="50" />}
          primaryText={articleDetails.articleTitle}
          secondaryText={articleDetails.articleContent}
        />
      );

      articlesJSX.push(currentArticleJSX);
    });

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <Link to='/add-article'>
          <RaisedButton 
            label="Create an article" 
            secondary={true} 
            style={{margin: '20px 20px 20px 20px'}} />
        </Link>

        <List>
          {articlesJSX}
        </List>
      </div>
    );
  }
```

The same reason as in the PublishingApp's component, we switched to using ES6's ***new Map*** we use new ES6 forEach:

```
this.props.article.forEach((articleDetails, articleKey) => {
```


#### Tweaks in the AddArticleView

After we are finished with preparing our app for saving a new article into the article's reducer, then we need to tweak the ***src/views/articles/AddArticleView.js*** component.

1) New imports in the ***AddArticleView.js***:
```
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import articleActions from '../../actions/article.js';
import RaisedButton from 'material-ui/lib/raised-button';
```

As you can see above, we are importing RaisedButton and Link which will be useful for redirecting an editor to the dashboard's view after a successful article addition. Then we import ***the articleActions*** because we need make the ***this.props.articleActions.pushNewArticle(newArticle);*** action on article submit. The ***bindActionCreators*** already shall be imported in your AddArticleView if you followed instructions from previous chapters.

2) Use the ***bindActionCreators*** for having the ***articleActions*** in the AddArticleView's component by replacing this below:

```
// this is old code, you shall have it already
const mapDispatchToProps = (dispatch) => ({
});
```

... to a new with the bindActionCreators:
```
const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});
```

3) An updated constructor of the AddArticleView's component:
```
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleSubmit = this._articleSubmit.bind(this);

    this.state = {
      title: 'test',
      contentJSON: {},
      htmlContent: '',
      newArticleID: null
    };
  }
```
The ***_articleSubmit*** will be required after an editor wants add an article. We also have added some default states for our title, contentJSON (we will keep there the Draft-JS' article state), htmlContent and the newArticleID.

4) Next step is to create the _articleSubmit's function:
```
  _articleSubmit() {
    let newArticle = {
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    let newArticleID = "MOCKEDRandomid"+Math.floor(Math.random() * 10000);

    newArticle['_id'] = newArticleID;
    this.props.articleActions.pushNewArticle(newArticle);
    this.setState({ newArticleID: newArticleID});
  }
```

As you can see above, we get's the state of our current writings with the this.state.title, this.state.htmlContent, this.state.contentJSON and then based on that we create a newArticle model:
```
let newArticle = {
  articleTitle: this.state.title,
  articleContent: this.state.htmlContent,
  articleContentJSON: this.state.contentJSON
}
```

Then we mock the new article's ID (later we will save it into the DB) with ***newArticle['_id'] = newArticleID;*** and push it into our article's reducer with ***this.props.articleActions.pushNewArticle(newArticle);***. The only thing is to set-up our new articleID with ***this.setState({ newArticleID: newArticleID});***.

5) The last step is to update our render method of the AddNewArticle's component:
```
  render () {
    if(this.state.newArticleID) {
      return (
        <div style={{height: '100%', width: '75%', margin: 'auto'}}>
          <h3>Your new article ID is {this.state.newArticleID}</h3>
          <Link to='/dashboard'>
            <RaisedButton
              secondary={true}
              type="submit"
              style={{margin: '10px auto', display: 'block', width: 150}}
              label='Done' />
          </Link>
        </div>
      );
    }

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSWIGeditor
          name="addarticle"
          title="Create an article"
          onChangeTextJSON={this._onDraftJSChange} />
          <RaisedButton
            onClick={this._articleSubmit}
            secondary={true}
            type="submit"
            style={{margin: '10px auto', display: 'block', width: 150}}
            label={'Submit Article'} />
      </div>
    );
  }
```

Above in the render, we have one statement that checks if an article's editor has already created an article (clicked Submit Article's button) with ***if(this.state.newArticleID)***. If yes, then an editor see his new article's ID and a button that links to the ***/dashboard*** (Link to='/dashboard').

And the second return is in case if an editor is in "edit mode", if yes then he can submit it by clicking on the ***RaisedButton***'s component with onClick method's called ***_articleSubmit***.

#### Ability to edit an article

We can add an article, but we can't edit it, yet. Let's implement that feature.

First thing to do is to create a route in the ***src/routes/index.js***:
```
import EditArticleView                    from '../views/articles/EditArticleView';
```

.. and then edit the routes:
```
export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={PublishingApp} name='home' />
    <Route component={LoginView} path='login' name='login' />
    <Route component={LogoutView} path='logout' name='logout' />
    <Route component={RegisterView} path='register' name='register' />
    <Route component={DashboardView} path='dashboard' name='dashboard' />
    <Route component={AddArticleView} path='add-article' name='add-article' />
    <Route component={EditArticleView} path='/edit-article/:articleID' name='edit-article' />
    
  </Route>
);
```

As you can see we have added the ***EditArticleView's route*** with ***path='/edit-article/:articleID'*** - as you should know already, the articleID will be sent to us with props as ***this.props.params.articleID*** (this is default feature of the redux-router).

The next step is to create the ***src/views/articles/EditArticleView.js*** which is a new component (for now mocked one):
```
"use strict";

import React from 'react';
import Falcor from 'falcor';
import { Link } from 'react-router';
import falcorModel from '../../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../../actions/article.js';
import WYSWIGeditor from '../../components/articles/WYSWIGeditor';
import { stateToHTML } from 'draft-js-export-html';
import RaisedButton from 'material-ui/lib/raised-button';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class EditArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <h1>An edit article MOCK</h1>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleView);
```

Above you can find a standard view component with render function that returns a mock (we will improve it later). We have already put all required imports in place (we will use all them in next iteration of that EditArticleView's component).

#### Let's add a dashboard link to an article's edition

A small tweak in the ***src/views/DashboardView.js***:

```
  let articlesJSX = [];
  this.props.article.forEach((articleDetails, articleKey) => {
    let currentArticleJSX = (
      <Link to={`/edit-article/${articleDetails['_id']}`}>
        <ListItem
          key={articleKey}
          leftAvatar={<img src="/static/placeholder.png" width="50" height="50" />}
          primaryText={articleDetails.articleTitle}
          secondaryText={articleDetails.articleContent}
        />
      </Link>
    );

    articlesJSX.push(currentArticleJSX);
  });
```
Above the only thing that we have changes is adding a Link with the ***to={`/edit-article/${articleDetails['_id']}`***. This will redirect a user to the article's edition view after clicking on a ListItem.


#### Creating a new action and reducer (EDIT_ARTICLE)

Modify the ***src/actions/article.js*** file and add this new action called EDIT_ARTICLE:
```
export default {
  articlesList: (response) => {
    return {
      type: 'ARTICLES_LIST_ADD',
      payload: { response: response }
    }
  },
  pushNewArticle: (response) => {
    return {
      type: 'PUSH_NEW_ARTICLE',
      payload: { response: response }
    }
  },
  editArticle: (response) => {
    return {
      type: 'EDIT_ARTICLE',
      payload: { response: response }
    }
  }
}
```

Next step is to improve our reducer at ***src/reducers/article.js***:
```
import mapHelpers from '../utils/mapHelpers';

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_LIST_ADD':
      let articlesList = action.payload.response;
      return mapHelpers.addMultipleItems(state, articlesList);
    case 'PUSH_NEW_ARTICLE':
      let newArticleObject = action.payload.response;
      return mapHelpers.addItem(state, newArticleObject['_id'], newArticleObject);
    case 'EDIT_ARTICLE':
      let editedArticleObject = action.payload.response;
      return mapHelpers.addItem(state, editedArticleObject['_id'], editedArticleObject);
    default:
      return state;
  }
}

export default article
```

As you can find above, we have added a new switch case for ***EDIT_ARTICLE***. We use our mapHelpers.addItem - in general, if an _id does exsits in a Map then it replaces a value (it works great for editing actions).


#### Edit mode in the ***src/components/articles/WYSWIGeditor.js***

Let's implement now ability to use edit mode in our WYSWIGeditor components by improving our construction in the WYSWIGeditor.js:
```
export default class  WYSWIGeditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorFromProps;

    if(typeof props.initialValue === 'undefined' || typeof props.initialValue !== 'object') {
      initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));
    } else {
      let isInvalidObject = typeof props.initialValue.entityMap === 'undefined' || typeof props.initialValue.blocks === 'undefined';
      if(isInvalidObject) {
        alert('Invalid article-edit error provided, exit');
        return;
      }
      let draftBlocks = convertFromRaw(props.initialValue);
      let contentToConsume = ContentState.createFromBlockArray(draftBlocks);
      initialEditorFromProps = EditorState.createWithContent(contentToConsume);
    }
     
    this.state = {
      editorState: initialEditorFromProps
    };

    this.focus = () => this.refs['WYSWIGeditor'].focus();
    this.onChange = (editorState) => { 
      var contentState = editorState.getCurrentContent();

      let contentJSON = convertToRaw(contentState);
      props.onChangeTextJSON(contentJSON, contentState);
      this.setState({editorState}) 
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
  }
```

Above you can find how your constructor shall looks like after changes. 

As you already know, the Draft-JS is required to be an object so we check in first if statement if it is, and then if not we put empty WYSWIG '' as a default (check the ***if(typeof props.initialValue === 'undefined' || typeof props.initialValue !== 'object')***).

In the else statement we do:
```
let isInvalidObject = typeof props.initialValue.entityMap === 'undefined' || typeof blocks === 'undefined';
if(isInvalidObject) {
  alert('Error: Invalid article-edit object provided, exit');
  return;
}
let draftBlocks = convertFromRaw(props.initialValue);
let contentToConsume = ContentState.createFromBlockArray(draftBlocks);
initialEditorFromProps = EditorState.createWithContent(contentToConsume);
```

Above we check if we have got a valid for a Draft-JS's JSON object, if not we need to make a critical error and return, because otherwise in case of that error the whole browser can crash (we need to handle that edge case with ***if(isInvalidObject)***).

After we have a valid object, then we recover the state of our WYSWIG with use of convertFromRaw, ContentState.createFromBlockArray and EditorState.createWithContent's functions provided by the Draft-JS's library.


#### Improvements in the EditArticleView

The last improvements before finishing the article edit mode is improving the ***src/views/articles/EditArticleView.js***:

```
class EditArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleEditSubmit = this._articleEditSubmit.bind(this);
    this._fetchArticleData = this._fetchArticleData.bind(this);

    this.state = {
      articleFetchError: null,
      articleEditSuccess: null,
      editedArticleID: null,
      articleDetails: null,
      title: 'test',
      contentJSON: {},
      htmlContent: ''
    };
  }
```

This is our constructor, we will have some state's variables as articleFetchError, articleEditSuccess, editedArticleID, articleDetails, title, contentJSON, htmlContent.

In general, all those variables are self-explaining. Regarding the ***articleDetails*** here we will keep the whole object fetched from a reducer/mongoDB (things like title, contentHTML and contentJSON is keept in the articleDetails' state as you can find in a moment).


After you are done with the EditArticleView's constructor add new functions:
```
  componentWillMount() {
    this._fetchArticleData();
  }

  _fetchArticleData() {
    let articleID = this.props.params.articleID;
    if(typeof window !== 'undefined' && articleID) {
        let articleDetails = this.props.article.get(articleID);
        if(articleDetails) {
          this.setState({ 
            editedArticleID: articleID, 
            articleDetails: articleDetails
          });
        } else {
          this.setState({
            articleFetchError: true
          })
        }
    }
  }

  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }

  _articleEditSubmit() {
    let currentArticleID = this.state.editedArticleID;
    let editedArticle = {
      _id: currentArticleID,
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    this.props.articleActions.editArticle(editedArticle);
    this.setState({ articleEditSuccess: true });
  }
```

1) On the ***componentWillMount*** we will fetch data about the article with ***_fetchArticleData***

2) The ***_fetchArticleData*** is getting the article's ID from props via react-redux (***let articleID = this.props.params.articleID;***)

3) Then we check if we are not on the server-side with ***if(typeof window !== 'undefined' && articleID)***

4) Then we use Map's function ***.get*** in order to get details from a reducer (***let articleDetails = this.props.article.get(articleID);***)

5) And based on the case, we setState of our component with:
```
if(articleDetails) {
  this.setState({ 
    editedArticleID: articleID, 
    articleDetails: articleDetails
  });
} else {
  this.setState({
    articleFetchError: true
  })
}
```

Above you can find that in the ***articleDetails*** we keep all data fetched from reducer/DB. In general now it's only front-end side because a backend side fetching of an edited article will be introducer later in that book.


The ***_onDraftJSChange***'s function is similar to the one in AddArticleView' component.

The ***_articleEditSubmit*** is quite standard so I will keep you to read the code on your own - I will only mention that the ***_id: currentArticleID*** is very important, because it's used later in our reducer/mapUtils in order to update the article correctly in the article's reducer.


#### EditArticleView's render improvements

Last part if to improve our render function in the EditArticleView's component:
```
render () {
    if(this.state.articleFetchError) {
      return <h1>Article not found (invalid article's ID {this.props.params.articleID})</h1>;
    } else if(!this.state.editedArticleID) {
        return <h1>Loading article details</h1>;
    } else if(this.state.articleEditSuccess) {
      return (
        <div style={{height: '100%', width: '75%', margin: 'auto'}}>
          <h3>Your article has been edited successfully</h3>
          <Link to='/dashboard'>
            <RaisedButton
              secondary={true}
              type="submit"
              style={{margin: '10px auto', display: 'block', width: 150}}
              label='Done' />
          </Link>
        </div>
      );
    }

    let initialWYSWIGValue = this.state.articleDetails.articleContentJSON;

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Edit an exisitng article</h1>
        <WYSWIGeditor
          initialValue={initialWYSWIGValue}
          name="editarticle"
          title="Edit an article"
          onChangeTextJSON={this._onDraftJSChange} />
          <RaisedButton
            onClick={this._articleEditSubmit}
            secondary={true}
            type="submit"
            style={{margin: '10px auto', display: 'block', width: 150}}
            label={'Submit Edition'} />
      </div>
    );
  }
```

We are managing different state's of our component with ***if(this.state.articleFetchError***, ***else if(!this.state.editedArticleID)*** and ***else if(this.state.articleEditSuccess)***.

```
<WYSWIGeditor
  initialValue={initialWYSWIGValue}
  name="editarticle"
  title="Edit an article"
  onChangeTextJSON={this._onDraftJSChange} />
```

In that part's above, the major changes is adding a new prop called ***initialValue*** which passed down to the WYSWIGeditor the Draft-JS's JSON object.

#### Delete an article action

Let's create a new action for delete at ***src/actions/article.js***:
```
  deleteArticle: (response) => {
    return {
      type: 'DELETE_ARTICLE',
      payload: { response: response }
    }
  }
```

Next let's add a DELETE_ARTICLE switch case into the ***src/reducers/article.js***:
```
import mapHelpers from '../utils/mapHelpers';

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_LIST_ADD':
      let articlesList = action.payload.response;
      return mapHelpers.addMultipleItems(state, articlesList);
    case 'PUSH_NEW_ARTICLE':
      let newArticleObject = action.payload.response;
      return mapHelpers.addItem(state, newArticleObject['_id'], newArticleObject);
    case 'EDIT_ARTICLE':
      let editedArticleObject = action.payload.response;
      return mapHelpers.addItem(state, editedArticleObject['_id'], editedArticleObject);
    case 'DELETE_ARTICLE':
      let deleteArticleId = action.payload.response;
      return mapHelpers.deleteItem(state, deleteArticleId);
    default:
      return state;
  }
}

export default article
```

The last step in implementing a delete button is to modify the ***src/views/articles/EditArticleView.js***'s component.

1) Import PopOver (it will ask second time if a use is sure to delete an article):
```
import Popover from 'material-ui/lib/popover/popover';
```

2) Improve the constructor of EditArticleView:
```
class EditArticleView extends React.Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this._articleEditSubmit = this._articleEditSubmit.bind(this);
    this._fetchArticleData = this._fetchArticleData.bind(this);
    this._handleDeleteTap = this._handleDeleteTap.bind(this);
    this._handleDeletion = this._handleDeletion.bind(this);
    this._handleClosePopover = this._handleClosePopover.bind(this);

    this.state = {
      articleFetchError: null,
      articleEditSuccess: null,
      editedArticleID: null,
      articleDetails: null,
      title: 'test',
      contentJSON: {},
      htmlContent: '',
      openDelete: false,
      deleteAnchorEl: null
    };
  }
```

The new thing above are: _handleDeleteTap, _handleDeletion, _handleClosePopover and the state (htmlContent, openDelete, deleteAnchorEl).

3) Then add three new functions in the EditArticleView:
```
  _handleDeleteTap(event) {
    this.setState({
      openDelete: true,
      deleteAnchorEl: event.currentTarget
    });
  }

  _handleDeletion() {
    let articleID = this.state.editedArticleID;
    this.props.articleActions.deleteArticle(articleID);

    this.setState({
      openDelete: false
    });
    this.props.history.pushState(null, '/dashboard');
  }

  _handleClosePopover() {
    this.setState({
      openDelete: false
    });
  }
```

4) Improve the return in the render's function:
```
    let initialWYSWIGValue = this.state.articleDetails.articleContentJSON;

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Edit an exisitng article</h1>
        <WYSWIGeditor
          initialValue={initialWYSWIGValue}
          name="editarticle"
          title="Edit an article"
          onChangeTextJSON={this._onDraftJSChange} />
          <RaisedButton
            onClick={this._articleEditSubmit}
            secondary={true}
            type="submit"
            style={{margin: '10px auto', display: 'block', width: 150}}
            label={'Submit Edition'} />
        <hr />
        <h1>Delete permamently this article</h1>
          <RaisedButton
            onClick={this._handleDeleteTap}
            label="Delete" />
          <Popover
            open={this.state.openDelete}
            anchorEl={this.state.deleteAnchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this._handleClosePopover}>
            <div style={{padding: 20}}>
              <RaisedButton 
                onClick={this._handleDeletion} 
                primary={true} 
                label="Permament delete, click here"/>
            </div>
          </Popover>
      </div>
    );
```

Regarding the render, new things are all things under the new hr's tag:

a) ***Header1:*** Delete permamently this article

b) ***RaisedButton:*** Delete

c) ***Popover:*** it's a component from material-ui. You can find more documentaction of that component at http://www.material-ui.com/v0.15.0-alpha.1/#/components/popover ... you can find below how it should looks in the browser

d) ***RaisedButton:*** Permament delete, click here


#### Images of current state of our app:

a) AddArticleView's component:

![311_adding_article_formatted](http://test.przeorski.pl/book/311_adding_article_formatted.png)

b) AddArticleView's component after a submit button has been hit:

![312_after_add_article](http://test.przeorski.pl/book/312_after_add_article.png)

c) Dashboard's component:

![313_dashboard_list_articles](http://test.przeorski.pl/book/313_dashboard_list_articles.png)

d) EditArticleView's component:

![314_edit_article](http://test.przeorski.pl/book/314_edit_article.png)

e) A delete button on the EditArticleView's component:

![315_delete_1](http://test.przeorski.pl/book/315_delete_1.png)

f) A delete button on the EditArticleView's component after first click (Popover's component):

![316_delete_popover](http://test.przeorski.pl/book/316_delete_popover.png)

g) A PublishingApp's component (main page):

![317_home_page_articles](http://test.przeorski.pl/book/317_home_page_articles.png)

