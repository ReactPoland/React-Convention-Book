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