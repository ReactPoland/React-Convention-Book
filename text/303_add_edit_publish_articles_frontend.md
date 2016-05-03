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
    if(key === item['_id']) {
      newMap.set(key, item);
    }
  });
  return newMap;
};

const addMultipleItems = (map, items) => {
  const newMap = duplicate(map);

  Object.keys(items).map((itemIndex) => {
    let item = items[itemIndex];
    newMap.set(item['_id'], item);
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









NEXT STEPS AFTER FINISHED BOOK:
1) finish fetching with $atom at server/routes.js

