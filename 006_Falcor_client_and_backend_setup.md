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




















