## Mastering React full-stack development

I see, you love React like we do ... and you want to become a full-stack developer. You want to work with databases, servers, system engineering and also you want to make a client work as well. Great, this book is for you!

We will guide you to the whole process of making the full-stack development process works. During this book we will create a publishing application. Why publishing app? In general, the publishing sites create content of thoudsands articles per year, some of those articles are extremely popular - so the full-stack setup has to be first-grade enterprise. We will show you how to build a scalable publishing apps and deploy it on Amazon AWS. You will also learn docker and continious integration stuff. This book will be a great reference for you in case if you will want to make a full-stack app on your own.

We are giving you "one-stop book" for full-stack development. 

### Technical stack we will use
In this book we do assume that you are familiar with JavaScript (ES5, ES6) and we will also introduce you to some mechanism from ES7 and ES8. 

For the client-side you will use React.js which already you have to be familiar of as we won't discuss React's API in details.

For data management on the client-side we will use Redux. We will also show you how to setup the server-side rendering with Redux.

As a database, you will learn how to use MongoDB alongside with Mongoose. The second one is an object data modeling library that provides a rigorous modeling enviroment for your data. It enforces a structure and in the same time it also allows to keep the flexibility that makes MongoDB so powerful.

Node.js and Express.js is a standard choice for a front-end developer in order start a full-stack development. I would mention that we have considered Koa.js for that book, but because we will use an innovative client<->backend data fetching mechanism created by Netflix, then our choice is Express as it has best libraries to support the Falcor's data fetching library.

I must to say to you something very important: WE WILL USE NETFLIX FALCOR and this choice will boost your productivity in full-stack development by 20-30% in comparision to old RESTful approach of builidng Single-Page-Apps. It's really exciting that I am honored to introduce you for this Falcor's data fetching library. 

I believe you will love Falcor because of it's simplicity and your observations about how much time it will save you when doing full-stack. I will explain in details later through the book why it is so efficient to use this data fetching library instead of standard process of building RESTful API.


Generally, everywhere we will use an object notation (JSON) - React as it's library, is using heavility it for diffing the Virtual DOM (under the hood). Redux for it's single state tree container uses a JSON tree as well. Netflix Falcor's library also is using an advanced concept called Virtual JSON graph (we will describe it in details later). Finally, mongoDB is also a documents' based database. 

JSON everywhere - this setup will improve our productivity by 25%+ mainly because of Falcor.

### MongoDB installation

What operation systems do you use? Windows, Linux or OS X?

The instructions below will be described for the OS X - if you have other operation system, then the other two (Windows and Linux Ubuntu) will be described later (so you can skit this OS X instructions).

Screenshot from the MongoDB website:
![MongoDB different operation systems](http://test.przeorski.pl/book/001_mongodb_versions_community.png)

All the MongoDB instructions you can find at https://docs.mongodb.org/manual/installation/

### Mongo on OS X
In that OS X tutorial, we will use the guide for "Install MongoDB Community Edition with Homebrew".

You need to have installed the Homebrew, if you don't have it then go to www.brew.sh and install it.

If for any reasons, this guide won't work for you, then you can find a manual instruction on the official MongoDB's website.

1) Update Homebrew’s package database.
In a system shell, issue the following command:

```
brew update
```

2) Install MongoDB.
You can install MongoDB via brew with several different options. Use one of the following operations:

a) Install MongoDB from Binaries (on localhost enviroment, we don't need the TLS/SSL - we will use it later when creating a production eviroment)
```
brew install mongodb
```

### Robomongo GUI for MongoDB

Robomongo is a cross-platform desktop client which may be comparised to MySQL or PostgreSQL for SQL databases.

When developing an app, it's good to have GUI and be able to quickly review collections in our database.

To obtain Robomongo (for all operation systems), please visit https://robomongo.org/ and install one on your machine. Community version of Robomongo costs $0.

In our case, we use version 0.9.0 RC4 of Robomongo. Currently there are three different versions of Robomongo available:
- OS X: robomongo-0.9.0-rc4-darwin-x86_64-8c830b6.dmg
- Linux: robomongo-0.9.0-rc4-linux-x86_64-8c830b6.tar.gz
- Windows: robomongo-0.9.0-rc4-windows-x86_64-8c830b6.exe

### Running MongoDB and viewing our collections in Robomongo GUI

After you have installed MongoDB and Robomongo on your machine, then
you need to run it. Run in your terminal the mongoDb with that command:

```
mongod
```
then you shall see:

![mongodb is running](http://test.przeorski.pl/book/002_mongodb_is_running.png)


and after that :

1) Open the Robomongo's client

2) Create a connection with default (make sure you are running mongoDB from terminal)

![Robomongo default create a new connection](http://test.przeorski.pl/book/003_create_new_connection.png)

### Summary of MongoDb & Robomongo setup
Currently, you have a localhost database set-up finished.


### Express setup with Mongoose

### Running MongoDB in the background
Once you have installed MongoDB following the instructions, then you have access to run:
```
mongod
```

which will make the database up and running for you and you want to leave it running at the background (open new tab in the terminal and leave the mongodb running in background in another one otherwise everything below won't work).

### We need to import the first example collection into the database. 

In the project's directory create a file called initData.js:
```
touch initData.js
```

And into that initiData.js file add the initial JSON with two artciles that is listed below:

In our case we are building the publishing app so it will be a list of articles. Below we will have an example collection of articles in a JSON's format:

```
[
	{
		articleId: "987654",
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	{
		articleId: "123456",
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
]
```
In general, we start from mocked collection of articles - later we will add a feature of adding more articles into the MongoDB's collection, but for now we will stick with only two artciles for the sake of brevity.




### HINT: to list your localhost databases do:
```
$ mongo
```
and while you will be in the mongo's shell, type:
```
show dbs
```
as on the full example below:
```
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2016-02-25T13:31:05.896+0100 I CONTROL  [initandlisten] 
2016-02-25T13:31:05.896+0100 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
> show dbs
local  0.078GB
>
```
... in our example it shows that we have one database in the localhost called local.

### Importing the articles to the MongoDB
Below we will use terminal (command prompt) in order to import the articles into database. Alternatively you can use Robomongo to do it via GUI as well.

```
mongoimport --db local --collection articles --jsonArray initData.js --host=127.0.0.1
```

Then you shall get in your terminal information:
```
connected to: 127.0.0.1
imported 2 documents

```

In case if you will get an error "Failed: error connecting to db server: no reachable servers" then make sure if you have running the mongod on the given host ip (127.0.0.1).

After importing those articles via the command line then you will see this reflected also in the Robomongo:

![articles import success](http://test.przeorski.pl/book/004_articles_imported_success.png)


### Server setup with NodeJS and Express.js

Once we have our articles' collection in the MongoDB, we can start working on our Express.js server in order to work on the collection.

First we need in an NPM project in our directory:
```
npm init --yes
```
The --yes flag means that we will use default settings for package.json.

Next let's create a server.js file in server directory:
```
mkdir server
cd server
touch index.js
```

Installing express and other initial dependencies:
```
npm i express@4.13.4 babel@4.7.16 babel-register@6.5.2 cors@2.7.1 body-parser@1.15.0 --save
```

@4.13.4 means that we will use this version of the Express' Framework. 

We also need libraries as following:
1) babel - [QUESTION: DO WE NEED DESCRIPTION?]
2) cors  - [QUESTION: DO WE NEED DESCRIPTION?]
3) body-parser - [QUESTION: DO WE NEED DESCRIPTION?]
4) babel-register - [QUESTION: DO WE NEED DESCRIPTION?]

After this your project's files structure shall looks like:
```
├── node_modules
│   ├── *******
├── initData.js
├── package.json
└── server
    └── index.js
```
The ******* is a wildcard which means that there are files reqired for our project, but we don't list it here as it would be too long.

### Working on our server (server.js & index.js)

In the index.js we need to add babel/register in order XYZ

The index.js file content:
```
require("babel/register");
require('./server');
```

and

The server.js file content:
```
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));

app.get('/', (req, res) => res.send('Publishing App Initial Application!'));

app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;

```

What's in the files:
Requiring the babel/register library is for being able using ES6 syntax in our code. In the index.js file, we have a "http" module which comes from NodeJS (https://nodejs.org/api/http.html#http_http). Next we have express, cors and body-parser.

Cors is a middleware for dynamically or statically enabling CORS (Cross-Origin Resource Sharing) in express applications - it will be useful in our development enviroment (we will delete it later for our production server).

Body-parser is a middleware for http's body parsing, it has some fancy settings that helps build us the app faster.


This how our app should looks on that stage of our development:
![our publishing app init screenshot](http://test.przeorski.pl/book/005_publishing_app_init2.png)


## Mongoose and express

Having the working simple express.js server, now we have to add Mongoose to our project.

```
npm i mongoose --save
```

Once we have installed mongoose and a running mongoDB database in the background, we can import it to our server.js file and do the coding:

```
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/local');

var articleSchema = {
	articleTitle:String,
	articleContent:String
}

var Article = mongoose.model('Article', articleSchema, 'articles')


var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));

app.use(express.static('dist'));

app.get('/', (req, res) => { 
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

```

### A summary how to run the project
Make sure that you have mongoDB running in the background on your machine with:
```
mongod
```

then you shall see in your console something like:
```
$ mongod
2016-03-09T10:49:02.943+0100 W -        [initandlisten] Detected unclean shutdown - /data/db/mongod.lock is not empty.
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] journal dir=/data/db/journal
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover begin
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] info no lsn file in journal/ directory
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover lsn: 0
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover /data/db/journal/j._0
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] recover cleaning up
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] removeJournalFiles
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] recover done
2016-03-09T10:49:02.966+0100 I JOURNAL  [durability] Durability thread started
2016-03-09T10:49:02.966+0100 I CONTROL  [initandlisten] MongoDB starting : pid=2322 port=27017 dbpath=/data/db 64-bit host=Kamils-MBP
2016-03-09T10:49:02.967+0100 I JOURNAL  [journal writer] Journal writer thread started
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] 
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] db version v3.0.6
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] git version: nogitversion
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] build info: Darwin Kamils-MacBook-Pro.local 14.5.0 Darwin Kernel Version 14.5.0: Wed Jul 29 02:26:53 PDT 2015; root:xnu-2782.40.9~1/RELEASE_X86_64 x86_64 BOOST_LIB_VERSION=1_49
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] allocator: system
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] options: {}
2016-03-09T10:49:03.087+0100 I NETWORK  [initandlisten] waiting for connections on port 27017
2016-03-09T10:49:08.501+0100 I NETWORK  [initandlisten] connection accepted from 127.0.0.1:50490 #1 (1 connection now open)
```

and then in the main directory run node with:
```
node server/index.js 
```
and your terminal shall show something like:
```
$ node server/index.js 
Started on port 3000
```

![articles import success](http://test.przeorski.pl/book/006_fetching_articles_from_mongoose.png)




## Redux basics concepts

In that first chapter we will cover only most basics concepts of Redux that will help us to make our simple publishing app. The app will be only in "read only" mode for that chapter, later in the book we will add more functionality like adding/edditing an article. You will discover all Redux's important rules and princibles during the whole book.

Basic topics covered in that sub-chapter:
- what is state tree
- how immutability works in Redux
- concept and basic use of Reducers

Let's start with the basics.

### The Single Immutable State Tree
The most important principle of Redux is that you are going to represent whole 
state of your application as a single javascript object. 

All changes (actions) in Redux are explicit so you can track a history of all your actions throught the appication with a dev tool.

![redux dev tool](http://test.przeorski.pl/book/007_example_redux_state_changes.png)

Above is a simple example dev tool use case which you will use in your development enviroment. It will help you to track the changes of state in your app. The example shows how we have incremented the counter value in our state by +1 three times. Of course our publishing app structure will be much more complcated than this example above. You will learn more about that dev tool later in the book.


### Immutability - actions & state tree is read only

TODO more description of immutability (for less experienced readers)

You cannot modify/mutate the values in your state tree the same was as it was in Facebook's FLUX (and other) implementations. 

An action the same way as in other FLUX implementations is a plain object that describes the change - like adding an article (below we mock the payload for the sake of brevity):

```
{
	type: "ADD_ARTICLE",
	payload: "_____HERE_GOES_INFORMATION_ABOUT_THE_CHANGE_____"
}
```
An action is a minimal representation of the change for our app state tree. 

Let's prepare actions for our publishing app.


### Pure and impure functions
Pure function is a function that doesn't have any side effects like for example
I/O (reading a file or a HTTP request). Unpure functions have that side effects so for example if you make a call to the HTTP request it can return different values for exactly the same arguments Y,Z (`function(X,Y)`) because of an endpoints is returning us random value or can be down because of an server error etc. 

Pure functions are always predictable for the same X,Y arguments. In the Redux we use only PURE FUNCTIONS in Reducers and Actions (otherwise Redux's lib won't work properly).

In that book you will learn whole sturcture where to make API calls so if you will follow the book, then you don't have worry too much of that principle in Redux.

### The Reducer function
Reducer from Redux can be compared to Single Store from Facebook's FLUX. Important is that a Reducer always take a previous state and returns a new reference to a new object (with use of Object.assign and other like that) so we can have immutable JS that helps us build more predictable state of our application in comparision to older's FLUX implementations that are mutating variables in the store.

This creating a new references is optimized because redux does use old references to values from reducers that didn't change. That causes that even if each action is creating a whole new object via reducer, then non-changes values has a previous reference in the memory so we don't overuse the computation power of the machine. Everything is fast.

In our app we will have article reducer which will help us to list, add, edit and delete our articles from the view layer.


### Big picture of our client-side files structure
This is how us going to be our client-side application sturcutre for giving you big picture of what we are going to work on:

TODO




### First Reducer and WebPack config

First let's create a reducer for our publication app:

```
mkdir src
cd src
mkdir reducers
cd reducers
touch article.js
```

So our first reducer's location is ***src/reducers/article.js*** and the content of our reducers/article.js:
```
const articleMock = {
	"987654": {
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	"123456": {
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
};

const article = (state = articleMock, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
			return Object.assign({}, state);
		default:
			return state;
	}
}

export default article
```
On the above code we have our artickeMock keept in the browser memory (it's the same as in initData.js) - later we will fetch this data from our backend's database. 

The arrow function ***const articles*** is getting action.type which will come from CONSTANTS (we will create them later) the same way as in Facebook's FLUX implementation. 

For the default return in the switch statement, we provide the ***state*** from ***state = articleMock*** (***return state;*** part above). This will return the initial state on the our first publishing app startup before any other action will occur. To be exact, the default in our case will do exactly the same as the action ***RETURN_ALL_ARTICLES*** before we will start fetching data from the backend (after the articles' fetching mechanism from backend will be implemented, then the default will return an empty object).


Because of our webpack's configuration (described below) we need an index.html in dist. Let's create a dist/index.html file:

```
pwd
/Users/przeor/Desktop/React-Convention-Book/src/reducers
cd ../..
mkdir dist
cd dist
touch index.html
```

and the dist/index.html content is:
```
<!doctype html>
<html lang="en">
<head>
  <title>Publishing App</title>
  <meta charset="utf-8">

</head>
<body>
  <div id="publishingAppRoot"></div>
</body>
</html>
```


We have ***an article Reducer and dist/index.html***, but before we will start building our Redux's publishing app we need to configure WebPack for our built automation.

Install webpack first (you may need sudo root's access for it):
```
npm i --save webpack@1.12.14 webpack-dev-server@1.14.1 
```

...then in the main directory next to the package.json and initData.js files, please follow:
```
touch webpack.config.js
```

and then please create the webpack's configs:
```
module.exports = {
    entry: ['babel-polyfill', './src/App.js'],
    output: {
        path: './dist',
        filename: 'app.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    }
}
```

Simply, that webpack's configs says that entry of commonJS module is at ```entry: './src/App.js'``` location. Webpacks builds a whole app following all imports from the App.js and the final output is located at ***path: './dist',***. Our app that is located at ***contentBase: './dist'*** will live on ports 3333. We also configure that we will use ES2015 and react so WebPack will compile for us ES2015 into ES5 and React's JSX into javascript. If you are interested more in WebPack configuration options then please read it's documentation.

### Rest of important dependencies installation and "npm dev"
```
npm i --save react@0.14.7 react-dom@0.14.7 react-redux@4.4.0 redux@3.3.1
```

and

```
npm i --save-dev babel-core@6.6.5 babel-polyfill@6.6.1 babel-loader@6.2.4 babel-preset-es2015@6.6.0 babel-preset-react@6.5.0 babel-preset-stage-0
```

Explanation: we need the ***babel-preset-stage-0*** is for ES7 features. The ***babel-preset-es2015*** and ***babel-preset-react*** are required for JSX and ES6 support. All those babel tools are used by WebPack (check the config file).


We also need to update our package.json file (add scripts):

```
  "scripts": {
    "dev": "webpack-dev-server"
  },
```

Our complete package.json should looks as following with all front-end dependencies:

```
{
  "name": "React-Convention-Book",
  "version": "1.0.0",
  "description": "",
  "main": "initData.js",
  "scripts": {
    "dev": "webpack-dev-server"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ReactConvention/React-Convention-Book.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ReactConvention/React-Convention-Book/issues"
  },
  "homepage": "https://github.com/ReactConvention/React-Convention-Book#readme",
  "dependencies": {
    "babel": "^4.7.16",
    "babel-register": "^6.5.2",
    "body-parser": "^1.15.0",
    "cors": "^2.7.1",
    "express": "^4.13.4",
    "mongoose": "^4.4.5",
    "react": "^0.14.7",
    "react-dom": "^0.14.7",
    "react-redux": "^4.4.0",
    "redux": "^3.3.1",
    "webpack": "^1.12.14",
    "webpack-dev-server": "^1.14.1"
  },
  "devDependencies": {
    "babel-core": "^6.6.5",
    "babel-loader": "^6.2.4",
    "babel-polyfill": "^6.6.1",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0"
  }
}

```


### Working on src/App.js, src/views/PublishingApp.js

Let's create our App.js where the main part of our app will live at ***src/App.js***:

```
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import article from './reducers/article'
import PublishingApp from './layouts/PublishingApp'

let store = createStore(article)

render(
    <Provider store={store}>
        <PublishingApp />
    </Provider>,
    document.getElementById('publishingAppRoot')
);
```

New part is the ***store = createStore(articles);*** part - this utility from Redux lets you keep application state object, dipatch an action and as an argument you give a reducer that tells how the app is updated with actions. 

The react-redux is useful binding of Redux into React (so we will write less code and be more productive). 

```
<Provider store>
```
The ***Provider store*** help us to make the Redux store available to the connect() calls in the children components (below). 


```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```
The ***connect*** will be used in any component that has to listen to the Reducer's changes in our app. You will see how to use it later in that chapter.




For the store we use ```let store = createStore(article)``` - just for the sake of brevity, I will mention that there are several methods in the store that we will use in next steps of building our app from scratch:

```
store.getState();
```
The getState function gives you current's state of the application.

```
store.dispatch({ type: 'RETURN_ALL_ARTICLES' });
```
The dispatch function can help you change state of your app.

```
store.subscribe(() => {
	
});
```
The subscribe allows you register a callback that Redux will call each time when an action has been dispatch so the view layer can know about the change in the application state and refresh it's view. 



### Wrapping up React + Redux application

Let's finish our first React+Redux app. For a summary let's see our current directories sturcture:
```

├── dist
│   └── index.html
├── initData.js
├── node_modules
│   ├── ********** (A LOT OF LIBRARIES HERE)
├── package.json
├── server
│   ├── index.js
│   └── server.js
├── src
│   ├── App.js
│   └── reducers
│       └── article.js
└── webpack.config.js
```

Now we need to create the main view of our app. We will put this into the layout directory in our first version.

```
pwd
/Users/przeor/Desktop/React-Convention-Book/src
mkdir layouts
cd layouts
touch PublishingApp.js
```

and the content of ***PublishingApp.js*** is:
```
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
  	console.log(this.props);	
    return (
      <div>
          Our publishing app
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);
```

The above introduces the ES7 syntax ***...*** next to ...
```
const mapStateToProps = (state) => ({
  ...state
});
```
... is a spread operator which is well described on the Mozilla's Documentation as "an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected"... in our case this ***...*** operator spreads one object ***state*** into second one (in our case empty object { }). It's written like this here because in future we will specify multiple reducers that has to be mapped from our app's ***state*** into the component ***this.props***.


### Finishing our first static publishing app
The only last thing to finish our static app is to
render the articles that comes from ***this.props***.

Thanks to redux the object mocked in the reducer is 
available so if you will check console.log(this.props)
in the render function of the PublishingApp.js then
you would be able to access our articles object:
```
const articleMock = {
	"987654": {
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	"123456": {
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
};
```

... in our case, we need to change the React's render function
as following (in src/views/PublishingApp.js):
```
  render () {
  	let articlesJSX = [];
  	for(let articleKey in this.props) {
  		let articleDetails = this.props[articleKey];
  		let currentArticleJSX = (
  			<div key={articleKey}>
  				<h2>{articleDetails.articleTitle}</h2>
  				<h3>{articleDetails.articleContent}</h3>
  			</div>);
  		articlesJSX.push(currentArticleJSX);
  	}
    return (
      <div>
          <h1>Our publishing app</h1>
          {articlesJSX}
      </div>
    );
  }
```
On the above's code snippet we are iterating ***for(let articleKey in this.props)*** over the articleMock object (passed from reducer's state in this.props) and creating an array of articles (in JSX) with ***articlesJSX.push(currentArticleJSX);***. After it is created, then we have added the articlesJSX into the return statement: 
```
      <div>
          <h1>Our publishing app</h1>
          {articlesJSX}
      </div>
```

This comment will start your project on 3333 ports:
```
npm dev
```

After you will check the localhost:3333, the new static redux's app shall be looking as following:
![our first redux publishing app](http://test.przeorski.pl/book/008_first_redux_publishing_app.png)


Great, so we have a static app in Redux! It's time to fetch data from our MongoDB database with use of Falcor. Please follow the instructions in next sub-chapter.




## Falcor basics concepts

Falcor is like a glue between:
- BACKEND and it's database structure (remember importing initData.js into the mongodb)
- and FRONTEND Redux single state tree container

It glues the pieces the way that it's much more effective than building an old fashioned REST API for a single-page-application.

Like in the previous' Redux sub-chapter, in that one we will also learn only most basics concepts of Falcor that will help us build full-stack simple application with "read only" mode. Later during the book you will learn how to make an add/edit article with Falcor. 

Below we will focus on most important aspects as:
- what is Falcor's model
- retrieving values from Falcor (frontend & backend)
- concept and basic use of JSON graph
- concept and basic use of sentinels
- how to retrieve data from backend
- how to configure our first route with a middleware for expressjs called ***falcor-router'

### What is Falcor and why we need it in our full-stack publishing app?

Let’s first consider what is the difference between web-pages and web-applications:

- 1) Since the World-Wide-Web was invented, web pages serve SMALL amounts of LARGE resources (like html, pdf, png file). For example, you can request a PDF, video, or text file from a server.
- 2) Since circa 2008, development of web apps is getting more and more popular. Web-applications serve LARGE amounts of SMALL resources. What does it mean for us? You have a lot of small REST API calls to the server with AJAX calls. The old approach of MANY API REQUESTS creates latency, which slows down the mobile/web app.

Why do we use OLD REST API requests (like in 2005) in apps written in 2016+? This is where Falcor shines; it solves the problem of latency and tight coupling backend to frontend.

### Tight-coupling (and latency) versus one model everywhere

If you are familiar with front-end development, you know how to make requests to an API. This old way of doing things always force you to tight couple backend API with frontend API utilities. It's always like that:

1) You make an API endpoint for example:
https://applicationDomain.com/api/recordDetails?id=92

2)  and on the front-end you consume the data with HTTP API requests:
```
{
	id: "92",
	title: "example title",
	content: "example content"
}
```

In large applications it's ***hard*** to maintain real DRY RESTful API and that problem causes to have plenty of endpoints which are not optimized - so the front-end sometimes has to do many round-trips in order to fetch the data required for a certain view (and sometimes it fetches much more than it needs which causes even more latency for the end user of our application).

Imagine that you have a large aplications with 50+ different API ENDPOINTS. After your first version of your application is finished, your client or boss finds a better way to structure the user-flow in the app. What does it mean? That you have to work on changing both front-end and backend endpoints in order to satisfy the changes in the user interface layer. That's called tight coupling between front-end and back-end.

What Falcor improves in those two areas that cause the ineficiency in working with RESTful APIs?

### One model everywhere explained

It would be super easy to build your web applications if all of your data was accessible in-memory on the client. 

Falcor provides utilities that helps you feel that all your data is under your fingertips without requirement of coding backend API endpoints and client-side consuming utilities.

No more tight-coupling on client and server side.

Falcor helps you represent all of your app's data as one virtual JSON model on the server. 

When coding client, Falcor makes you feel as if the whole JSON model of your application is reachable locally and allows you to read data the same way as you would from an in-memory JSON - you will learn it very soon!.

Because of Falcor's library for browsers and a falcor-express middleware you can retrieve your data from the model as on demand from the cloud.

Falcor transparently handles all the network communication and keep your client-side app in sync with the server and databases.

In that chapter we will also learn how to use falcor-router.


### Client side Falcor

Let's install the Falcor from NPM first.
```
pwd
/Users/przeor/Desktop/React-Convention-Book
npm i --save falcor@0.1.16 falcor-http-datasource@0.1.3
```

The falcor-http-datasource helps us to retrieve data from server to client-side out of the box (without worring about http API requests) - we will use this later when moving client-side model to backend.

Let's create our app's Falcor model on the client-side:
```
cd src
touch falcorModel.js
```

and then the content of the falcorModel.js will be:
```
const falcor = require('falcor');
const FalcorDataSource = require('falcor-http-datasource');

let cache = {
  articles: [
    {
        id: 987654,
        articleTitle: "Lorem ipsum - article one",
        articleContent: "Here goes the content of the article"
    },
    {
        id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here."
    }
  ]
};

const model = new falcor.Model({
  "cache": cache
});

export default model;
```

Above you can find an well known brief and readable model of our publishing application with two articles in it. 


Now we will fetch that data from frontend's Falcor's model in our ***src/layouts/PublishingApp.js*** React's component, we will add a new function called *_fetch()* which will be responsible to fetch the all articles on our application start.

We need to import our falcor's model first so in the top of the PublishingApp.js file we need to add:
```
import falcorModel from '../falcorModel.js';
```

and in our ***PublishingApp*** app we need to add two following functions ***componentWillMount*** and ***_fetch*** (more explanation below):

```
class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._fetch();
  }

  async _fetch() {
    let articlesLength = await falcorModel.
      getValue("articles.length").
      then(function(length) {  
        return length;
      });

    let articles = await falcorModel.
      get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
      then(function(articlesResponse) {  
        return articlesResponse.json.articles;
      });
  }
  // below here are next methods o the PublishingApp
```
Above you see the asynchronous function called _fetch. This is special syntax which allows you to use await keyword like we do at ***let articlesLength = await falcorModel*** and ***let articles = await falcorModel***.

Using ***async await*** allows us using them over Promises - that causes our code to be more readable and avoid callback's hell.

The async/await feature is taken from EcmaScript 7 inspired by C#. It allows you to write functions that appear to be block at each asynchronous operation that is waiting for the reasult before continuing next operation. 

In our example, the code will execute as following:

1) First it will call Falcor's mode for articles count with: 
```
let articlesLength = await falcorModel.
  getValue("articles.length").
  then(function(length) {  
    return length;
  });
```

In the articlesLength variable we will have a count of articles.length from our model (in our case it will be number two).

2) After we know that we have two articles in our model, then the next block of code is executing:
```
let articles = await falcorModel.
  get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
  then(function(articlesResponse) {  
    return articlesResponse.json.articles;
  });
```

The get's method on falcorModel ***get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]).*** is also an asynchronous operation (the same way asynchronous as a http request). In that get's paramether we provide the location of our articles in our model (in src/falcorModel.js), so we are proviting the path:

```
falcorModel.get(
['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]
)
```

Explanation of the above's falcor path below based on our model, let's recall it again:
```
{
  articles: [
    {
        id: 987654,
        articleTitle: "Lorem ipsum - article one",
        articleContent: "Here goes the content of the article"
    },
    {
        id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here."
    }
  ]
}
```
What we are saying to falcor
1) First give find articles get in our object with: 
```
['articles']
```
2) Next please find in that articles, all the articles it has with a range ***{from: 0, to: articlesLength-1}*** (the ***articlesLength*** we have fetched earlier) with path:
```
['articles', {from: 0, to: articlesLength-1}]
```

3) The last step you need to say to falcor what properities from the object you want to fetch from our model, so the complete path in that falcorModel.get query is:
```
['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]
```
The array of ***['id','articleTitle', 'articleContent']*** says that you want those three properties out of every article.

In the end, we receive from Falcor an array of articles objects:
![falcor's first response](http://test.przeorski.pl/book/009_falcor_response_object.png)


After we have fetched the data from our Falcor's model, we need to dispatch an action that will change accordingly the article's reducer and ultimately re-render our list of articles from our Falcor's model instead from the ***const articleMock*** (in src/reducers/article.js).

But before we will be able to dispatch an action we need:

1) Create actions directory with article.js:
```
pwd
$ /Users/przeor/Desktop/React-Convention-Book
cd src
mkdir actions
cd actions
touch article.js
```

and create the content for our ***src/actions/article.js*** files as following:

```
export default {
  articlesList: (response) => {
    return {
      type: 'ARTICLES_LIST_ADD',
      payload: { response: response }
    }
  }
}
```
There isn't too much in that actions/article.js file ... if you are familiar to FLUX already then it's very similar. ***One important rule for actions in Redux is that it has to be PURE FUNCTION***. For now we will hard-code a constant called ***ARTICLES_LIST_ADD*** into actions/article.js (later in the book we will create a separate constants directory).


In the ***src/layouts/PublishingApp.js*** file we need add in top of the file's a new import code:
```
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';
```

when you have added the two above in our PublishingApp then  modify our exsiting function in the same file from:
```
const mapDispatchToProps = (dispatch) => ({
});
```
and add ***articleActions: bindActionCreators(articleActions, dispatch)*** so we will be able to bind article's actions into our component ***this.props***:
```
const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});
```

Thanks to the aboves  changes (***articleActions: bindActionCreators(articleActions, dispatch)***), in our component will be able to dispatch an action from props because now when you will do ***this.props.articleActions.articlesList(articles)*** then the articles object fetched from falcor will be available in our Reducer (and from there, there is only one step to make our app fetch data working).


Now, after you are done with this changes then add an action into our component in _fetch function: 
```
this.props.articleActions.articlesList(articles);
```

so our whole function for fetching shall be looking as following:
```
  async _fetch() {
    let articlesLength = await falcorModel.
      getValue("articles.length").
      then(function(length) {  
        return length;
      });

    let articles = await falcorModel.
      get(['articles', {from: 0, to: articlesLength-1}, ['id','articleTitle', 'articleContent']]). 
      then(function(articlesResponse) {  
        return articlesResponse.json.articles;
      });

    this.props.articleActions.articlesList(articles);
  }
```

and also don't forget about calling _fetch from ComponentWillMount:
```
  componentWillMount() {
    this._fetch();
  }
```

At this point, we shall be able to receive an action in our Redux's reducer. Let's improve our ***src/reducers/article.js*** file:
```
const article = (state = {}, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
			return Object.assign({}, state);
		case 'ARTICLES_LIST_ADD':
			console.info("ARTICLES_LIST_ADD", action.payload.response);
			return Object.assign({}, action.payload.response);
		default:
			return state;
	}
}

export default article
```

1) As you can find out we don't need ***articleMock*** anymore so we have deleted it from the src/reducers/article.js

2) We have added a new case ***ARTICLES_LIST_ADD***:
```
	case 'ARTICLES_LIST_ADD':
		let articlesList = action.payload.response;
		return Object.assign({}, articlesList);
```

and it returns a new articlesList object (with a new reference in the memory thanks to Object.assign).


### A summary of client-side Falcor + Redux
If you will run ***http://localhost:3000/index.html*** then you will see:

Currently, we have a two separate applications:
1) one in front-end with use of Redux and client-side Falcor
2) one in back-end with use of MongoDB, Mongoose and Express

We need to stick both together, so we will have one source of state for our applications (that comes from MongoDB).



### Moving Falcor's model to backend:

We also need to update our package.json file:

```
  "scripts": {
    "dev": "webpack-dev-server",
    "start": "npm run webpack; node server",
    "webpack": "webpack --config ./webpack.config.js"
  },
```

Because we are starting full-stack development part, we need to add "npm start" to our scripts in package.json - this will help compile client-side, put them into the ***dist*** folder (generated via webpack) and then create static files in the dist and use this folder as the source of static files (check server/server.js for ***app.use(express.static('dist'));***).

Next important thing is to install new dependencies that are required for Falcor's on the backend:

```
npm i --save falcor-express@0.1.2 falcor-router@0.3.0
```

When you finnaly have installed new dependencies and configured the basic scripts for running the backend and frontend on the same port, then edit the ***server/server.js*** as following:

1) On top of our file import new libraries in the ***server/server.js***:
```
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
```


2) and then between the two:
- ***app.use(bodyParser.json({extended: false}));***
- and ***app.use(bodyParser.json({extended: false}));***

add a new code for managing Falcor's on the backend:
```
app.use(bodyParser.json({extended: false}));

let cache = {
  articles: [
    {
        id: 987654,
        articleTitle: "Lorem ipsum - article one",
        articleContent: "Here goes the content of the article"
    },
    {
        id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here."
    }
  ]
};

var model = new falcor.Model({
  cache: cache
});

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    return model.asDataSource();
}));


app.use(express.static('dist'));
```

The above code is almost the same as the one in the src/falcorModel.js file. The only difference will be that now the Falcor will fetch data from backend's mocked object called cache in ***server.js***.

If you will run your app with:
```
npm start
```

then you will see in your browser's dev tools a new http request made by Falcor as for example in our case:
![falcor dev tool network](http://test.przeorski.pl/book/010_falcor_dev_tool_network_screenshot.png)


If you follow all the instructions correctly, then you can also make a request to your server directly from your browser by:
```
http://localhost:3000/model.json?paths=[["articles",{"from":0,"to":1},["articleContent","articleTitle","id"]]]&method=get
```
then you shall see a jsonGraph in the response:
![falcor dev tool network](http://test.przeorski.pl/book/011_falcor_get_example_from_server.png)

You don't have too worry about those two above. It's just an example how Falcor is communicating between backend and frontend in the falcor's language. You don't have to worry anymore about exposing API endpoints and programming front-end to understand what data the backend's providing. Falcor is doing all this out-of-the-box and you will learn more details during making this publishing application.



### Configuring Falcor's router (ExpressJS)

Currently, our model on the backend is hard coded so it keeps in the RAM memory of a server. We need to add ability to read the data from our MongoDB's articles collection - this is where the falcor-router comes handy.


We need to create our routes definition file that will be consumed by falcor-router's lib:
```
$ pwd
/Users/przeor/Desktop/React-Convention-Book
$ cd server
$ touch routes.js
```

We have created the server/routes.js file, the content for that router will be as following:

```
let PublishingAppRoutes = [{
  route: 'articles.length',
  get: () => {
    let articlesCountInDB = 2; // hardcoded for example
    return {
      path: ['articles', 'length'],
      value: articlesCountInDB
    };
  }
}];

export default PublishingAppRoutes;
```


As you can see, we have created our first route in the that will match the articles.length from our ***_fetch*** function (in layouts/PublishingApp.js).

We have hardcoded number two in ***articlesCountInDB***, later we will make a query to our database there.

The new stuff above are: 
1) ***route: 'articles.length',*** this is simply a route for match by falcor.

To be more precise, the falcor routes' paths are exactly the same stuff that you have provided in your src/layouts/PublishingApp.js (_fetch function) as for example to match this front-end call:
```
  // location of that code snipper: src/layouts/PublishingApp.js
  let articlesLength = await falcorModel.
    getValue("articles.length").
    then(function(length) {  
      return length;
    });
```

2) ***path: ['articles', 'length'],*** - this property tell's falcor's path (it's consumed by Falcor on backend and frontend). We need to provide that because sometimes, one route can return many different objects as server articles (***you will see it in next route, we will create***).

3) ***value: articlesCountInDB*** is a return value. In this case it is an INT number, but it can also be an object with several properties as you will learn later.


### Second route for returning our two articles from backend

Our second route (and last one in chapter #1) will be:

```
{
  route: 'articles[{integers}]["id","articleTitle","articleContent"]',
  get: (pathSet) => {
    let articlesIndex = pathSet[1];
    let articlesArrayFromDB = [{
      "articleId": "987654",
      "articleTitle": "BACKEND Lorem ipsum - article one",
      "articleContent": "BACKEND Here goes the content of the article"
    }, {
      "articleId": "123456",
      "articleTitle": "BACKEND Lorem ipsum - article two",
      "articleContent": "BACKEND Sky is the limit, the content goes here."
    }]; // That are our mocked articles from MongoDB

    let results = [];
    articlesIndex.forEach((index) => {
      let singleArticleObject = articlesArrayFromDB[index];
      let falcorSingleArticleResult = {
        path: ['articles', index],
        value: singleArticleObject
      };
      results.push(falcorSingleArticleResult);
    });

    return results;
  }
}
```

New thing on the second route is Pathset, if you will log that into console then you will see in our case (when trying to run our full-stack app):
```
[ 
  'articles',
  [ 0, 1 ],
  [ 'articleContent', 'articleTitle', 'id' ] 
]
```
The Pathset says to us what are indexes request from client-side (***[ 0, 1 ],*** in our example). 

Because in this case we are returning an array of articles (multiple articles), then we need to create a result variable:
```
    let results = [];
```
iterate over requested indexes:
```
    articlesIndex.forEach((index) => {
      let singleArticleObject = articlesArrayFromDB[index];
      let falcorSingleArticleResult = {
        path: ['articles', index],
        value: singleArticleObject
      };
      results.push(falcorSingleArticleResult);
    });
```

EXPLANATION: in above code snipped we iterate over array of requested indexes (do you remember about ***{from: 0, to: articlesLength-1}*** in PublishingApp.js?). Based on the indexes (***[0, 1]***) we fetch mocked data via ***let singleArticleObject = articlesArrayFromDB[index];***. Later we put into the ***path*** and index  (***path: ['articles', index],***) so Falcor knows to what path in our JSON graph object, the ***value: singleArticleObject*** belongs to.


... and return that array of articles:
```
    console.info(results)
    return results;
```

that console.info will show us what has been returned by that path:
```
[{
  path: ['articles', 0],
  value: {
    articleId: '987654',
    articleTitle: 'BACKEND Lorem ipsum - article one',
    articleContent: 'BACKEND Here goes the content of the article'
  }
}, {
  path: ['articles', 1],
  value: {
    articleId: '123456',
    articleTitle: 'BACKEND Lorem ipsum - article two',
    articleContent: 'BACKEND Sky is the limit, the content goes here.'
  }
}]
```


### Last thing to make full-stack's Falcor run

Currently, we still have a mocked data in our routes, but before we will start making calls to MongoDB we need to wrap-up the current setup, so you will be able to see it running in your browser.

Open your server/server.js and make sure you import those two things:
```
import Router from 'falcor-router';
import routes from './routes.js';
```

OK, so we have imported our falcor-router and routes.js - now we need to use them, so modify this old code:
```
// THIS IS OLD CODE, remove it and replace with new
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    return model.asDataSource();
}));
```

the above replace into new code as following:

```
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
 return new Router(routes);
}));
```

The above will work only when the falcor-router has been already installed and imported in server.js' file. This is a library for DataSource which creates a Virtual JSON Graph document on your app server. As you see in server.js so far, we have DataSource provided by our hard-coded model ***return model.asDataSource();***. The router above will make the same, but now you will be able to match routes based on your app requirements.

Also as you can see, the new Router takes an arguments of our routes - ***return new Router(routes);***.

If you followed the instructions correctly, you will be able to run the project:
```
npm start
```

and on ports 3333 you will see:

![falcor router wrap up - app's screenshot](http://test.przeorski.pl/book/012_falcor_router_wrapup.png)



### Adding MongoDB/Mongoose calls based on Falcor's routes

Let's get back to our ***server/routes.js*** file:

We need to move over (delete from server.js and move into routes.js) this code:
```
// this goes to server/routes.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/local');

var articleSchema = {
  articleTitle:String,
  articleContent:String
}

var Article = mongoose.model('Article', articleSchema, 'articles');
```


... and in first ***route articles.length*** you need to replace the mocked number two (articles count) into Mongoose's count method:
```
  route: 'articles.length',
    get: () => {
    return Article.count({}, function(err, count) {
      return count;
    }).then ((articlesCountInDB) => {
      return {
        path: ['articles', 'length'],
        value: articlesCountInDB
      }
    })
  }
```

IMPORTANT: please note that we are returning in ***get*** a promise (Mongoose from it's asynchronous nature, always return a promise during making any database's request as on that example Article.count).


The method ***Article.count*** simply retrieves the integer number of articles' count from our ***Article model*** (that was prepared in the beggining of that book in MongoDB/Mongoose sub-chapter).


The second route ***route: 'articles[{integers}]["id","articleTitle","articleContent"]',*** has to be changed as following:

```
{
  route: 'articles[{integers}]["id","articleTitle","articleContent"]',
  get: (pathSet) => {
    let articlesIndex = pathSet[1];

    return Article.find({}, function(err, articlesDocs) {
      return articlesDocs;
    }).then ((articlesArrayFromDB) => {
      let results = [];
      articlesIndex.forEach((index) => {
        let singleArticleObject = articlesArrayFromDB[index].toObject();
        let falcorSingleArticleResult = {
          path: ['articles', index],
          value: singleArticleObject
        };
        results.push(falcorSingleArticleResult);
      });
      console.info(">>>> results", results);
      return results;
    })
  }
}
```
We return a promise again with ***Article.find***. Also we have deleted mocked response from database and instead of that we are using ***Article.find*** method.

The array of articles is returned in ***}).then ((articlesArrayFromDB) => {*** where next we simply iterate and create a results' array.

Please note that on ***let singleArticleObject = articlesArrayFromDB[index].toObject();*** we use a method ***.toObject***. This is very important to make this work.


### First working full-stack app
After that you shall have complete full-stack version of the app working:

![final full-stack app](http://test.przeorski.pl/book/013_chapter_final_app.png)

Almost on everystep the UI part of our app is identical. The above screenshot is taken on the publishing app which:

1) Fetch data from DB with use of Falcor-Express && Falcor-Router
2) The data moves from backend (source is MongoDB) to frontend we populate Redux's src/reducers/article.js state tree
3) We render the DOM elements based on our single state tree.


Let's expand on that simple publishing app in next chapters. We also will make that application looking nicer with Material Design CSS (http://material-ui.com).
























