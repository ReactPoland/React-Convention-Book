### Publishing App - Falcor's related concepts more in-depth

Currently, our app has ability to add/edit/delete articles, but only on front-end with help of Redux's reducers etc. We need to add some full-stack mechanism to make this able to CRUD the database. We will also need to add some security features on back-end so non-authenticated users won't be able to CRUD the MongoDB's collections.

Let's hold-on with coding for a moment. Before we will start developing full-stack Falcor's mechanism, let's discuss about our React, Node and Falcor's setup more in details.

It's important to understand why we have choosen Falcor in our technical stack. In general, we in our custom software development's company (you can find more at www.MobileWebPro.pl) use Falcor as it has many great advantages for our clients in terms of productivity of developing full-stack Mobile/Web applications. Some of them:

1. The simplicity of the concept

2. Speed-up by 30%+ the development in comparision to RESTful's approach

3. Low learning curve so a developer who learn Falcor's can get effective very quickly

4. Sexy way of data-fetching which is quite mind-blowing


I will keep these 3 points above short and sweet. Later in that chapter you will learn more about potential problems that you may be aware of when using Falcor & Node.

Currently, we have done kind of full-stack starter kit with React+Redux+Falcor+Node+Express+MongoDB. It's not perfect, yet. We will try to make it better in that chapter


#### The problem that Falcor aims to solve

Before single-page-application's world, there weren't problems with fetching data on client, as whole data ALWAYS was fetched on server and then also the server was rending the HTML's markup to the client. Each time, someone has clicked on an URL's link (href), then our browser was requesting totally new HTML's markup from the server.

Based on that above's principals of non-SPA applications, Ruby on Rails has become the king of Web Development's technical stack... but later, things has changed.

Since 2009-2010 we were creating more and more javascript's client applications which were more likely fetched once from the backend as for example a ***bundle.js***. It's called single-page-apps.

Because of that SPApps' trends, some new problems occured which weren't known for non-SPApps' developers like fetching data from API endpoint on backend in order to consume that JSON's data on the client-side.


In general, old fashioned workflow for RESTful was as following:

1) Create endpoints on backend

2) Create fetching mechanism on front-end

3) Fetch data from backend by coding POST/GET requests on the front-end based on the API's specification

4) When you fetched the JSON from backend to front-end, then you can consume the data and use it in order to create the UI view based on a certain use case



That all points are kind of frustrating in case, if someone like a client or boss has changed their mind. As because you were implementing whole code on backend and frontend to satisfy the one use case, but after the changes both endpoints are getting obscure.


#### Solution is one data model which provides more flexibility

Falcor - one model everywhere, it's the main tag line of this great library. In general, the main goal since we use it is to create a single JSON model that is exactly the same on front-end and back-end. What that means for us? That in anything changes, we need to change the model which is exactly the same on back-end and front-end - so in case of any changes, we need to tweak our model without worring about how the data is provided on back-end and fetched on front-end.

Data fetching is a problem for developers. Falcor is here to help to make it simpler. You can fetch data from backend to frontend with writing less code's lines than ever!


It's May 2016 and the only viable competitor that we see on the horizon is a facebook's libraries called Relay (on client-side) and GraphQL (on back-end). 

Let's try to compare these both.



### Falcor vs. Relay/GraphQL

As any tool, there are always pros and cons.

For certain Falcor is always better than Relay/GraphQL in small/mid sized projects at least until you have masters' developers (or you a master yourself) who knows Relay/GraphQL very well. Why? 

In general, the Relay (for front-end) and GrapQL (for backend) are two different set tools that YOU must be efficient to use it properly.

Very often  in commercial's enviroment you don't have too much time to learn things from scratch. This reasons is also behind the success of React. Why React has succeded? React is much easier to grasp in order to be an efficient front-end developer. Then a CTO or Technical Director hires a newbie developer who knows jQuery (for example), then the CTO can easily project that this junior guy will be effective in React in 7-14 days - I was teaching junior frontend devs with basic knowledge of JavaScript/jQuery, and I found out that they quite quickly become efficient in creating client-side apps with React.

The same situation as with React, we may find with Falcor. Falcor in comparision to Relay+GraphQL, is like simplicity of React compared to monolith framework of Angular.

This single factor described in previous three paragraphs cause that Falcor is better for small/mid size projects with limited budget.

You may find some opportunities to learn Relay/GraphQL in bigger companies with much bigger budgets like Facebook when you have 6 months to master a technology.

FalcorJS can be mastered effectively in two weeks, but GraphQL+Relay not.

#### Big picture similarities

Both are trying to solve the same problem. They are efficient by design for both developers and network (trying to optimize amount of queries in comparision to RESTful's approach).

They have ability to query backend server in order to fetch data and also have batching ability (so you can fetch more than two different sets of data with one network's requrest). Both have some caching abilities.


#### Technical differences overview

Regarding the technical overview, we can find out that in general Relay allows you to query not-defined number of items from the GraphQL's server. In Falcor for comparision, you need first ask backend how much items it has before being able to query for the collections' objects details (like articles in our book's case).

In general, the biggest difference here is that GraphQL/Relay is a query language's tool and Falcor is not. What means a query language? This means that you can make a queries from front-end similar to SQL like:
```
post: () => Relay.QL`
  fragment on Articles {
    title,
    content
  }
`,
```

This above can be made as a query from front-end via Relay.QL, then the GraphQL is processing the query the same way as SQL is processing a query like this:
```
SELECT title, content FROM Articles
```

The things may get harder, if there is for example 1 000 000 articles in the DB, and you didn't expected so many on front-end.

In Falcor you do it differently as you already learned:
```
let articlesLength = await falcorModel.
  getValue("articles.length").
  then(function(length) {  
    return length;
  });

let articles = await falcorModel.
  get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent']]). 
  then(function(articlesResponse) {  
    return articlesResponse.json.articles;
  });
```

As in the above's Falcor example, you must first know how many records are in the MongoDB as in our case.


That above is one of most important differences, that creates some sort of challenges for both sides.

For GraphQL and Relay, the question is if whether the power from that query languages is worth the complexity that creates the learning curve... because of that complexity may not be worth it for small/mid sized projects.

Basic differences have been discussed, let's focus on Falcor and improving our current PublishingApp.

### Improving our application and making it more reliable

We need to improve things like:

1) after a login, we shall send user details in each request (the token, username and a role - you can find a screenshot in next sub-chapter called "Improving our falcor code on front-end")

2) securing the backend so we check the authorization before running add/edit/delete on backend

3) we need to give ability to catch errors on backend and give a notification to user on front-end that something didn't work correctly


#### Securing the auth required's routes

Currently our app has ability to add/edit/delete a route, the problem with our current implementation is that currently, we don't check if a client who is making any CRUD operation has privilitages to do so... 

The solution of securing the falcor-routes requires some changes in our current implementation, so on each request before doing the opration we will check if we have got from the client a correct token, and if the user who is making the call has ability to edit (in our case it means that if anyone has a role as an editor and is authenticated correctly with his username and password, then he can add/edit/delete an article).

#### What is JSON Graph and a JSON envelop in Falcor

As the falcor's documentation state: "JSON Graph is a convention for modeling graph information as a JSON object. Applications that use Falcor represent all their domain data as a single JSON Graph object".

In general, JSON Graph's in falcor is a valid JSON with some new features. To be more exact, JSON Graph introduces new types of data besides string, number or boolean. The new data types in Falcor is called a sentinel. We will try to explain them later in that chapter.

Generally, the second thing that is important to understand in falcor are the JSON envelops. The great thing is that it works out of the box, so you don't have to worry too much about it... but if you want to know what iti is the short and sweet answer is: the JSON envelops helps sending JSON's model via http's protocol. It's a way between transfering the data from front-end to backend (with .call, .set, .get methods). The same, before backend (after processing a request's detail) before sending the improved model's details to the client-side, the falcor put it into an "envelope" so it can be easily transfered via network. 

The good analogy (but not perfect) for the JSON envelop is that, you put a written list into envelop because you don't want to send some valuable information over from point A to point B - the network doesn't care what you send in that envelop. The most important thing is that the sender and the receiver knows the context of the application model.

You can find more information about the JSON's graph and envelop at: http://netflix.github.io/falcor/documentation/jsongraph.html

### Improving our falcor code on front-end

Currently, after a user authorize himself, all the data is saved into localStorage. We need to close the loop by sending that data like token, username and role back to the backend with each request so we can check again if a user is authenticated correctly. If not, then we need to send an authentication error with the request and show it back in front-end.

This below is specifically important for security reasons, so none non-authorized can add/edit/delete an article in our database.

![localStorage data](http://test.przeorski.pl/book/401_data_from_localstorage.png)

Above you can find where you can get the info about the localStorage's data.


Below this is our ***current code in src/falcorModel.js***:
```
// this code is already in the codebase
const falcor = require('falcor');
const FalcorDataSource = require('falcor-http-datasource');

const model = new falcor.Model({
  source: new FalcorDataSource('/model.json')
});

export default model;
```

We need to improve this above to a new improved version:
```
import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

class PublishingAppDataSource extends FalcorDataSource {
  onBeforeRequest ( config ) {
    const token = localStorage.token;
    const username = localStorage.username;
    const role = localStorage.role;

    if(token && username && role) {
      config.headers['token'] = token;
      config.headers['username'] = username;
      config.headers['role'] = role;
    }
  }
}

const model = new falcor.Model({
  source: new PublishingAppDataSource('/model.json')
});

export default model;
```

What we have done above? The ***extends*** keyword from EcmaScript6 shows an example of where the simplicity of the class syntax shines. Extending the ***FalcorDataSource*** means that ***PublishingAppDataSource***  inhertis everything that the ***FalcorDataSource*** has plus make the ***onBeforeRequest***'s method with our custom behaviour (***mutates the config.headers***). The ***onBeforeRequest*** is checking the mutated by us config before a our xhr instance is created - this helps us to modify the ***the XMLHttpRequest with token && username && role*** in case if our app's user has logged in the meantime, so we can send that information to the back-end.

After you will implement the above's code in the falcorMode.js and a user will be logged those variables will be added to each request:

![localStorage data](http://test.przeorski.pl/book/402_requests_heaers_arrows.png)


#### Improving the server.js & routes.js

In general, currently we exports array of objects from the ***server/routes.js*** file. We need to improve it, so we will return a function which will modify our array of objects so we will be able to have possesion over which routes is returned to which user and in case if a user has not a valid token or not enough privilages, we will return an error. This will improve secrutity of our whole app.

In the server/server.js file, change this old code:
```
// this shall be already in your codebase
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new FalcorRouter(routes);
}));
```

.. to this improved one:
```
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new FalcorRouter(
      []
        .concat(routes(req, res))
    );
}));
```

In our new version we assume that ***routes*** variable is a function with the ***req, res*** vars. 

Let's improve the routes itself so we won't return an array anymore, but a function that return an array (so we will end-up with more flexibility).


The next step is to improve the server/routes.js in order to make a function that recives the currentSession's object which will keep all the information about a request. We need to change this below in the routes.js:
```
// this code is already in your codebase:
let PublishingAppRoutes = [
    ...sessionRoutes,
  {
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
},
// 
// ...... here is more code between, it has been truncated in order to save space
//
export default PublishingAppRoutes; 
```
PLEASE NOTE: above is just a part of the routes.js file, but for sake of brevity there is a comment ***...... here is more code between*** which strips code between.

.. and instead of exporting array of routes, we need to export a function that will return routes based on a current request's headers details. 

The top part of the ***server/routes.js*** file (with imports):

```
import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';

let $atom = jsonGraph.atom; // this will be explained later in that chapter
let Article = configMongoose.Article;
```


... and after that, follow with exporting a new function:
```
export default ( req, res ) => {
  let { token, role, username } = req.headers;
  let userDetailsToHash = username+role;
  let authSignToken = jwt.sign(userDetailsToHash, jwtSecret.secret);
  let isAuthorized = authSignToken === token;
  let sessionObject = {isAuthorized, role, username};

  console.info(`The ${username} is authorized === `, isAuthorized);

  let PublishingAppRoutes = [
      ...sessionRoutes,
    {
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
  }];


  return PublishingAppRoutes;
}
```

First of all, we receive the req (request's details) and res (object that represents the HTTP response) variables into that arrow functions.  Based on the information provided by ***req*** we get the headers' details (***let { token, role, username } = req.headers;***). Next we have the ***userDetailsToHash*** and then we check what shall be the correct authToken with ***let authSignToken = jwt.sign(userDetailsToHash, jwtSecret.secret)***. Later we check if the user is authorized with "***let isAuthorized = authSign === token***". Then we create a sessionObject which will be re-used accross all falcor's routes later (***let sessionObject = {isAuthorized, role, username};***).

Currently, we have there a one route (***articles.length***) which was described in chapter 2 (so it's nothing new so far).

As you can see above in the code, instead of exporting the ***PublishingAppRoutes*** directly, we are exporting the arrow function ***export default ( req, res )***.


We need to re-add (under articles.lenght) second route called ***articles[{integers}]["_id","articleTitle","articleContent"]***, with the following code in the server/routes:
```
  {
    route: 'articles[{integers}]["_id","articleTitle","articleContent"]',
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
        return results;
      })
    }
  }
```

This is the route that fetches the artciles from databases and returns a falcor-route for it - it's exactly the same as introduced before, the only different is that now it's part of the function (***export default ( req, res ) => { ... }***).


Before we will start implement add/edit/delete on the backend with falcor-router, we need to introduce ourselves to the concept of sentinels as it will be very important for wellbeing of our full-stack application which will be explained in a moment why.


### Falcor's Sentinels implementation

What are the sentinels? They are "New Primitive Value Types". The same way as you have types in a regular JSON as String, Number, Object etc. , but more specific for Virtual-JSON in Falcor (examples are $ref, $atom, $error's sentinels).

At this stage, it's important to understand how the Falcor's sentinels are working. There different types of sentinels in Falcor are:


#### $ref's sentinel

Regarding to the documentation: "A Reference is a JSON object with a “$type” key that has a value of “ref” and a “value” key that has a Path array as its value".

In Falcor "a Reference is like a symbolic link in the UNIX file system" - as the documentation states and this comparision is very good. 

... and an example of a $ref:
```
{ $type: "ref", value: ['articlesById', 'STRING_ARTCILE_ID_HERE'] }
```

***IMPORTANT:*** if you use $ref(['articlesById','STRING_ARTCILE_ID_HERE']) it's equals to the above's example. The $ref is a function which changes the array's detail into that $type and value's notation object.

You can find both approaches in order to deploy/use the $refs in any Falcor's related projects, but in our project we will stick to the ***$ref(['articlesById','STRING_ARTCILE_ID_HERE'])***'s convention.

Just to make it clear this is how to import a $ref's sentinel in our codebase:
```
// wait, this is just an example, don't code this below:
import jsonGraph from 'falcor-json-graph';
let $ref = jsonGraph.ref;
// now you can use $ref([x, y]) function
```

... so after you import that ***falcor-json-graph*** then you can use the $ref's sentinel. You shall already have installed the falcor-json-graph's lib as the installation has been described in the previous chapter, if not then please use this (just in case):

```
npm i --save falcor-json-graph@1.1.7
```


BUT, what does the 'articlesById' mean in that whole $ref's gig? And what does mean the 'STRING_ARTCILE_ID_HERE' in the above example? Let's give me an example from our project that may make it more clear for you.

#### $ref sentinel's example explained

Let's assume that we have two articles in our MongoDB:
```
// this is just explanation example, don't write this below
// we assume below that _id comes from MongoDB
[
  {
    _id: "987654",
    articleTitle: "Lorem ipsum - article one",
    articleContent: "Here goes the content of the article"
  },
  {
    _id: "123456",
    articleTitle: "Lorem ipsum - article two",
    articleContent: "Sky is the limit, the content goes here."
  }
]
```

... so based on our array's example with mocked articles (ids 987654 & 123456), the $refs will be looking as following:
```
// JSON envelope is an array of two $refs
[
  $ref([ articlesById,'987654' ]),
  $ref([ articlesById,'123456' ])
]
```

or even more detailed answer is:
```
// JSON envelope is an array of two $refs (other notation than above, but the same end effect)
[
  { $type: "ref", value: ["articlesById", '987654'] },
  { $type: "ref", value: ["articlesById", '123456'] }
]
```

IMPORTANT: the '***articlesById***' is a new route that is not created, YET (we will do it in a moment).

... but why do we need those $refs in our articles?


In general, you can keep a reference (as in UNIX a symbolic link) in many places to one object in the database - in our case it's an article with certain _id in the articles' collection.


When the $refs come handy? Imagine that in our Publishing App's model we will add a Recently Visited's articles feature and we will give ability to like an article (like on facebook).


... based on those two new features our new model will be looking as following (this is just example, don't code it):
```
// this is just explanatory example code:
let cache = {
  articles: [
    {
        id: 987654,
        articleTitle: "Lorem ipsum - article one",
        articleContent: "Here goes the content of the article"
        numberOfLikes: 0
    },
    {
        id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here.",
        numberOfLikes: 0
    }
  ],
  recentlyVisitedArticles: [
    {
        id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here.",
        numberOfLikes: 0
    }
  ]
};
```

... so based on the our example's model above, if someone will like an article with id=123456 then we will need to update the model in two places - that's exactly where the $ref is coming handly.


#### Improving our articles' numberOfLikes with $ref's sentinel

Let's improve our example to the new one:
```
let cache = {
  articlesById: {
    987654: {
        _id: 987654,
        articleTitle: "Lorem ipsum - article one",
        articleContent: "Here goes the content of the article"
        numberOfLikes: 0
    },
    123456: {
        _id: 123456,
        articleTitle: "Lorem ipsum - article two from backend",
        articleContent: "Sky is the limit, the content goes here.",
        numberOfLikes: 0
    }
  },
  articles: [
    { $type: "ref", value: ["articlesById", '987654'] },
    { $type: "ref", value: ["articlesById", '123456'] }
  ],
  recentlyVisitedArticles: [
    { $type: "ref", value: ["articlesById", '123456'] }
  ]
};
```

In our new improved $ref's version example, you can find the notation where you need to say to falcor what is the id of the article you want to have in articles or recentlyVisitedArticles. The falcor's following on his own the $ref's by knowing the route name (the ***articlesById***'s route in this case) and and id of the object we are looking for (in our example 123456 or 987654). We will use it in practice in a moment.


Please understand that above this is simplifed version how it works, but the best analogy to use in order to understand the $refs are the UNIX's symbolic links.


#### Practical use of $ref in our project
OK, there was a lot of theory, let's start the coding time!  We will improve our mongoose's model. 

Then add the $ref's sentinels described before into the ***server/routes.js***'s file.

```
// example of ref, don't write it yet:
let articleRef = $ref(['articlesById', currentMongoID]);
```

We will also add two falcor-routes ***articlesById*** and ***articles.add***. On the front-end we will make some improvements to ***src/layouts/PublishingApp.js*** and ***src/views/articles/AddArticleView.js***.

Let's start the fun.


#### Mongoose config improvements

First thing we will do is to improve the Mongoose model at ***server/configMongoose.js***:
```
// this is old codebase, you already shall have it:
import mongoose from 'mongoose';

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local',
};

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);

var articleSchema = {
  articleTitle:String,
  articleContent:String
}
```

... to the new improved version as following:
```
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local',
};

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);

var articleSchema = new Schema({
    articleTitle:String,
    articleContent:String,
    articleContentJSON: Object
  }, 
  { 
    minimize: false 
  }
);
```

As you can find above we import new ***var Schema = mongoose.Schema***. And later we improve our articleSchema with:

1) 'articleContentJSON: Object' - this is required, because state of the draft-js will be kept in a JSON's object. This will be useful if a user will create an article, save it to the database and later would like to edit the article, then we are using this articleContentJSON in order to restore the content state of the draft-js' editor.

2) second thing is providing options with ***{ minimize: false }***. This is required, because from default the Mongoose get rid off of all empty objects like { emptyObject: {}, nonEmptyObject: { test: true } } then if this minimize=false isn't set up then we would get incomplete objects in our database (this is very important step to have this flag here). There are some draft-js objects which are required, but by default are empty (spcifically the ***entityMap*** property of a draft-js object).


#### The server/routes.js improvements

In the server/routes.js's file, we need to start using the $ref's sentinel. Your import in that file should looks as following:
```
import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph'; // this is new
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';

let $ref = jsonGraph.ref; // this is new
let $atom = jsonGraph.atom; // this is new
let Article = configMongoose.Article;
```

Above the only thing new is that we import ***import jsonGraph from 'falcor-json-graph';*** and then we add ***let $ref = jsonGraph.ref;*** and ***$atom = jsonGraph.atom***.

We have added the $ref in our routes.js' scope. Then we need to prepare a new route ***articlesById[{keys}]["_id","articleTitle","articleContent","articleContentJSON"]*** as following:
```
  {
    route: 'articlesById[{keys}]["_id","articleTitle","articleContent","articleContentJSON"]',
    get: function(pathSet) {
      let articlesIDs = pathSet[1];
      return Article.find({
            '_id': { $in: articlesIDs}
        }, function(err, articlesDocs) {
          return articlesDocs;
        }).then ((articlesArrayFromDB) => {
          let results = [];

          articlesArrayFromDB.map((articleObject) => {
            let articleResObj = articleObject.toObject();
            let currentIdString = String(articleResObj['_id']);

            if(typeof articleResObj.articleContentJSON !== 'undefined') {
              articleResObj.articleContentJSON = $atom(articleResObj.articleContentJSON);
            }

            results.push({
              path: ['articlesById', currentIdString],
              value: articleResObj
            });
          });
          return results;
        });
    }
  },
```

The articlesById[{keys}] route is defined and the keys are the IDs of request url that we need to return in the request as you can see with ***let articlesIDs = pathSet[1];***. 

To be more specific regarding the pathSet, based on this example:
```
// just an example below:
[
  { $type: 'ref', value: ['articlesById', '123456'] },
  { $type: 'ref', value: ['articlesById', '987654'] }
]
```

in this case, the falcor-router will follow to the ***articlesById*** and in the pathSet you will get this (below you can see exact value of the pathSet).
```
["articlesById" ['123456', '987654']]
```

... and of course value of the articlesIDs from  ***let articlesIDs = pathSet[1];*** you can find below:
```
['123456', '987654']
```

So as you can find later, we use this  ***articlesIDs*** next:
```
// this is already in your codebase:
return Article.find({
            '_id': { $in: articlesIDs}
        }, function(err, articlesDocs) {
```

As you can see in the ***'_id': { $in: articlesIDs}*** we are passing an array of articlesIDs - based on those ids, we will receive an array of certain articles found by ids (the SQL's WHERE equivalent). Next step is that we iterate here over received articles:

```
// this already is in your codebase:
articlesArrayFromDB.map((articleObject) => {
```

... and then push the object into the results array:
```
// this already is in your codebase:
let articleResObj = articleObject.toObject();
let currentIdString = String(articleResObj['_id']);

if(typeof articleResObj.articleContentJSON !== 'undefined') {
  articleResObj.articleContentJSON = $atom(articleResObj.articleContentJSON);
}

results.push({
  path: ['articlesById', currentIdString],
  value: articleResObj
});
```

Almost nothing new above. The only new thing is that statement:
```
// this already is in your codebase:
if(typeof articleResObj.articleContentJSON !== 'undefined') {
  articleResObj.articleContentJSON = $atom(articleResObj.articleContentJSON);
}
```
.. and specifically we are using here explicitly the $atom's sentinel from falcor with ***$atom(articleResObj.articleContentJSON);***.

#### EXPLAINED: JSON Graph Atoms
The $atom is a metadata attached to the values, which has to be handled differently by the model. You can very simply return a value of a Number of a String with falcor. It's more tricky for falcor to return an Object. Why?

The falcor is diffing with heavy usage of javascript's objects and arrays, and when we tell that an object/array is wrapped by an $atom (as ***$atom(articleResObj.articleContentJSON) in our example***) then the falcor knows that he shouldn't go deeper into that array/object - it's made that way by design for performance reasons.

What performance reasons? For example if you will return an array of 10000 very deep objects and without wrapping that array of 10000 very deep objects, it may take very, very long time to build and diff the model. Generally, for performance reasons any objects and arrays that you want to return via falcor-router to the front-end have to be wrapped by an $atom before doing so, otherwise you will get an error like below (if you won't wrap by $atom this object):

```
Uncaught MaxRetryExceededError: The allowed number of retries have been exceeded.
```

This error will be shown on the client-side while falcor will try to fetch that deeper object without being wrapped by an $atom beforehand on the backend.


#### Improving the articles[{integers}] route

We need now to return a $ref to articlesById instead of a whole articles' details, so we need to change this old code below:
```
// this already shall be in your codebase:
  {
    route: 'articles[{integers}]["_id","articleTitle","articleContent"]',
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
        return results;
      })
    }
  }
```

... and that above, we improve to a new one as following:
```
  {
    route: 'articles[{integers}]',
    get: (pathSet) => {
      let articlesIndex = pathSet[1];

      return Article.find({}, '_id', function(err, articlesDocs) {
        return articlesDocs;
      }).then ((articlesArrayFromDB) => {
        let results = [];
        articlesIndex.forEach((index) => {
          let currentMongoID = String(articlesArrayFromDB[index]['_id']);
          let articleRef = $ref(['articlesById', currentMongoID]);

          let falcorSingleArticleResult = {
            path: ['articles', index],
            value: articleRef
          };

          results.push(falcorSingleArticleResult);
        });
        return results;
      })
    }
  },
```

What has been changed? Look at ***route: 'articles[{integers}]["_id","articleTitle","articleContent"]' in the old codebase***: currently, our route ***'articles[{integers}]'*** doesn't return (in new version) directly the data for ***["_id","articleTitle","articleContent"]*** so we had to delete in order to get falcor know about this fact (the articlesById is returning detailed information now). 


Next thing that has been changed is that we create a new $ref's sentinel with the following:
```
// this is already in your codebase:
let currentMongoID = String(articlesArrayFromDB[index]['_id']);
let articleRef = $ref(['articlesById', currentMongoID]);
```

As you see by doing the above, we are informing (with $ref) falcor-router that if front-end will request any more information about article[{integers}] then the falcor-router shall follow the ***articlesById***'s route in order to retrieve that data from database.


... later you can find out that this old path's value:
```
// old version
let singleArticleObject = articlesArrayFromDB[index].toObject();

let falcorSingleArticleResult = {
  path: ['articles', index],
  value: singleArticleObject
};
```

has been replaced by the value to the articleRef:
```
// new improved version
let articleRef = $ref(['articlesById', currentMongoID]);

let falcorSingleArticleResult = {
  path: ['articles', index],
  value: articleRef
};
```

As you can spot the difference, in the old version we were returning exactly the all information about an article (variable singleArticleObject), but in the new version we return only the $ref (articleRef).


Re-call: $refs makes falcor-router automaticlly follow on the back-end so if there are any refs in the first route, the falcor resolves all the $refs until he will get all pending data, after that falcor is returning the data in one request which saves a lot of latency (instead of doing several http requests, everything followed with $refs is fetched in a one browser<->backend call.



#### New route in the server/routes.js: articles.add

The only thing left that we need to do is to add into the router a new articles.add routes:
```
  {
    route: 'articles.add',
    call: (callPath, args) => {
      let newArticleObj = args[0];
      var article = new Article(newArticleObj);

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
        else {
          return data;
        }
      }).then ((data) => {
        return Article.count({}, function(err, count) {
        }).then((count) => {
          return { count, data };
        });
      }).then ((res) => {
        //
        // we will add more stuff here in a moment, below
        //
        return results;
      });
    }
  }
```

As you can find above, we receive from front-end a new article's details with ***let newArticleObj = args[0];*** and later we create a new Article's model with ***var article = new Article(newArticleObj);***. After that, we article variable has method '.save' that is made in the first query below.


We do two queries that returns a Promise from Mongoose. First query:
```
return article.save(function (err, data) {
```

This .save method is simply helps us insert the document into the database. After we have saved the article, we need to count how many there are in our database, so we do a second query:
```
return Article.count({}, function(err, count) {
```

After we have saved the article and counted it, we return that information ***return { count, data };***. The last thing is to return the new article ID and the count number from backend to frontend with the falcor-router help so we replace this comment:
```
//
// we will add more stuff here in a moment, below
//
```

... with a new code that helps us make things happen:
```
  let newArticleDetail = res.data.toObject();
  let newArticleID = String(newArticleDetail["_id"]);
  let NewArticleRef = $ref(['articlesById', newArticleID]);
  let results = [
    {
      path: ['articles', res.count-1],
      value: NewArticleRef
    },
    {
      path: ['articles', 'newArticleID'],
      value: newArticleID
    },
    {
      path: ['articles', 'length'],
      value: res.count
    }
  ];

  return results;
```
As you can see above we get the ***newArticleDetail*** details here. Next we take the new id with ***newArticleID*** and make sure that it's a string. After all that we define a new $ref with ***let NewArticleRef = $ref(['articlesById', newArticleID]);***.

In the results' variable you can find three new pathes:

1) path: ['articles', res.count-1] - that paths builds up the model, so we can have all the information in the falcor's model after we receive the respond on the client-side

2) path: ['articles', 'newArticleID'] - this helps us quickly to fetch the new ID on front-end

3) path: ['articles', 'length'] - and this of course, updates the length of our articles' collection, so the front-end's falcor model can have the up-to-date information after we have added a new article.

That's all in order to make a back-end routes for adding an article. Let's now start working on the front-end so we will be able to push all our new articles into database.



#### Front-end changes in order to add article

In the file ***src/layouts/PublishingApp.js*** improve the old:
```
get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent']]).
```
to a improved version with the articleContentJSON:
```
get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent', 'articleContentJSON']]). 
```

Next step is to improve our _submitArticle function in the ***src/views/articles/AddArticleView.js***:
```
// this is old function to replace:
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

... and replace this above to improved version:
```
  async _articleSubmit() {
    let newArticle = {
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    let newArticleID = await falcorModel
      .call(
            'articles.add',
            [newArticle]
          ).
      then((result) => {
        return falcorModel.getValue(
            ['articles', 'newArticleID']
          ).then((articleID) => {
            return articleID;
          });
      });

    newArticle['_id'] = newArticleID;
    this.props.articleActions.pushNewArticle(newArticle);
    this.setState({ newArticleID: newArticleID});
  }
```

As you can find it above, we have added async keyword before the function name (async _articleSubmit()). The new thing is that request:
```
// this already is in your codebase:
let newArticleID = await falcorModel
  .call(
        'articles.add',
        [newArticle]
      ).
  then((result) => {
    return falcorModel.getValue(
        ['articles', 'newArticleID']
      ).then((articleID) => {
        return articleID;
      });
  });
```

Above we await for falcorModel.call. In the .call arguments we adds newArticle. Then after the promise is resolved we check what is the newArticleID with:
```
// this already is in your codebase:
return falcorModel.getValue(
        ['articles', 'newArticleID']
      ).then((articleID) => {
        return articleID;
      });
```

... later we simply use exactly the same stuff as in old version:
```
newArticle['_id'] = newArticleID;
this.props.articleActions.pushNewArticle(newArticle);
this.setState({ newArticleID: newArticleID});
```
... this above simply push updated newArticle with a real ID from MongoDB via the articleActions into the article's reducer. We also setState with the newArticleID so you can see that the new article has been created correctly with a real mongo's id.


#### Important note about routes returns

You should be aware that in the every route we shall return an object or an array of objects - and both approaches are fine even with one route to return so for example:
```
// this already is in your codebase (just an example)
    {
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
  }, 
```
... that above can also return an array with one object as following:
```
      get: () => {
        return Article.count({}, function(err, count) {
          return count;
        }).then ((articlesCountInDB) => {
          return [
            {
              path: ['articles', 'length'],
              value: articlesCountInDB
            }
          ]
        })
    }
```
As you can see that even with one articles.length, we are returning an array (instead of a signle object), and this will also works. 



... and for the same reason as described above this is why in the articlesById we have pushed into array multiple routes:
```
// this is already in your codebase
let results = [];

articlesArrayFromDB.map((articleObject) => {
  let articleResObj = articleObject.toObject();
  let currentIdString = String(articleResObj['_id']);

  if(typeof articleResObj.articleContentJSON !== 'undefined') {
    articleResObj.articleContentJSON = $atom(articleResObj.articleContentJSON);
  }
  // pushing multile routes
  results.push({
    path: ['articlesById', currentIdString],
    value: articleResObj
  });
});
return results; // returning array of routes' objects
```

That's one thing that may be worth mentioning in that falcor's chapter.

#### Full-stack: edit and delete an article

Let's create a route in the server/routes.js file for updating an exsiting document (edit's feature):
```
  {
  route: 'articles.update',
  call: async (callPath, args) => 
    {
      let updatedArticle = args[0];
      let articleID = String(updatedArticle._id);
      let article = new Article(updatedArticle);
      article.isNew = false;

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then ((res) => {
        return [
          {
            path: ["articlesById", articleID],
            value: updatedArticle
          },
          {
            path: ["articlesById", articleID],
            invalidate: true
          }
        ];
      });
    }
  },
```

... as you can see above we still use ***article.save*** approach similar to the articles.add route. The important thing to note, that Mongoose requires the isNew flag to be false (article.isNew = false;) - if you won't give this flag, then you will get an error similar to this:
```
{"error":{"name":"MongoError","code":11000,"err":"insertDocument :: caused by :: 11000 E11000 duplicate key error index: staging.articles.$_id _ dup key: { : ObjectId('1515b34ed65022ec234b5c5f') }"}}
```

Rest of the code is quite simple, we do save on the article's model and then return the updated model via falcor-router with:
```
// this is already in your code base:
return [
  {
    path: ["articlesById", articleID],
    value: updatedArticle
  },
  {
    path: ["articlesById", articleID],
    invalidate: true
  }
];
```
The new thing is the invalidate flag. As it states in the documentation "invalidate method synchronously removes several Paths or PathSets from a Model cache". In other words, you need to know the falcor's model on front-end that something has been changed in the ["articlesById", articleID]'s path so you will have synced data on both backend and frontend.


#### Delete an article

In order to implement delete's feature we need to create a new route:
```
  {
  route: 'articles.delete',
  call: (callPath, args) => 
    {
      let toDeleteArticleId = args[0];
      return Article.find({ _id: toDeleteArticleId }).remove((err) => {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then((res) => {
        return [
          {
            path: ["articlesById", toDeleteArticleId],
            invalidate: true
          }
        ]
      });
    }
  }
```

This also uses invalidate, but this time this the only thing that we return here as the document has been deleted, so the only thing we need to do is to inform the browser's cache that the old article has been invalidated and there is none to replace it as in the update's example.

#### Front-end: edit and delete

We are fine with the backend as we have implemented the update and delete's routes. In the file ***src/views/articles/EditArticleView.js*** you need to replace:
```
// this is old already in your codebase:
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

... to new updated async _articleEditSubmit's function:
```
  async _articleEditSubmit() {
    let currentArticleID = this.state.editedArticleID;
    let editedArticle = {
      _id: currentArticleID,
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    }

    let editResults = await falcorModel
      .call(
            ['articles', 'update'],
            [editedArticle]
          ).
      then((result) => {
        return result;
      });

    this.props.articleActions.editArticle(editedArticle);
    this.setState({ articleEditSuccess: true });
  }
```

.. as you can find above, the most important thing is that we implemented the .call function in the _articleEditSubmit's function that sends details of an edited object with the editedArticle's variable.


In the same file, change also the _handleDeletion from old:
```
// old version
  _handleDeletion() {
    let articleID = this.state.editedArticleID;
    this.props.articleActions.deleteArticle(articleID);

    this.setState({
      openDelete: false
    });
    this.props.history.pushState(null, '/dashboard');
  }
```

.. to the new improved version:

```
  async _handleDeletion() {
    let articleID = this.state.editedArticleID;

    let deletetionResults = await falcorModel
      .call(
            ['articles', 'delete'],
            [articleID]
          ).
      then((result) => {
        return result;
      });

    this.props.articleActions.deleteArticle(articleID);
    this.setState({
      openDelete: false
    });
    this.props.history.pushState(null, '/dashboard');
  }
```

Similar thing with the deletion, the only difference is that we send with .call only the articleID of a deleted article.


#### Securing the CRUD routes

We need to implement a way to secure the all add/edit/delete routes and also make an universal DRY (don't repeat yourself) way to inform the user of errors that occured on the backend. Example errors that may occure on front-end and we need to inform the user with an error message in our React's client-side app:
1) auth error - your are not authorized to perform the action
2) timeout error - let's imagine that you use an external API's service, we need to inform the user of any potential errors
3) data doesn't exsits - there may be a case that a user will call for an id of an article that doesn't exsits in our DB, let's inform him

In general, our goal for now is to make one universal way of moving all potential errors' messages on backend to the client-side so we will improve general experience with our application.


#### $error sentinel basics

There is an $error sentinel (variable type related to Falcor) which is generally an approach of returning errors. 

Generally, as you already should know Falcor is batching requests so that means that in one request you can get:

Example below what you can fetch in one go:
1) One dataset - complete ready to retrive
2) Second dataset - second dataset, may contains an error.

We don't want to influence fetching process of one dataset, when there is an error in the second's dataset (you need to remember, that those two datasets from our example is fetched in one request).

## TODO MORE from documentation regarding $error


#### DRY errors management on the client side

Let's start with improvements the CoreLayout (src/layouts/CoreLayout.js). Under the AppBar import a new snackbar component from:
```
import AppBar from 'material-ui/lib/app-bar';
import Snackbar from 'material-ui/lib/snackbar';
```

... then under the imports outside the CoreLayout create a new function and export it:
```
let errorFuncUtil =  (errMsg, errPath) => {
}
 
export { errorFuncUtil as errorFunc };
```

... then improve the CoreLayout constructor so we will use the exported function called errorFuncUtil as a callback in base if there will be any error provided by the falcor's $error sentinel:

```
// old constructor
constructor(props) {
  super(props);
}
```
and the new one:
```
constructor(props) {
  super(props);
  this.state = {
    errorValue: null
  }

  if(typeof window !== 'undefined') {
    errorFuncUtil = this.handleFalcorErrors.bind(this);
  }
}
```

As you can find above, we have introduced a new errorValue's state (default state is null). Then on front-end only (because of if(typeof window !== 'undefined')) we are assign the this.handleErrors.bind(this) into our errorFuncUtil.

As you will find in a moment, this is that way because the exported errorFuncUtil will be imported in our falcorModel.js where we will use a best DRY possible way to inform our CoreLayout about any error occured on backend with falcor. The great thing about this, that we will implement it just once, but it will be very universal way for informing our client's side app users of any errors (and it will also save us our efforts of development in future as any error will be handled by the approach that we are implementing now).

We need add a new function to our CoreLayout called handleFalcorErrors:
```
handleFalcorErrors(errMsg, errPath) {
  let errorValue = `Error: ${errMsg} (path ${JSON.stringify(errPath)})
  this.setState({errorValue});
}
```

The handleFalcorErrors function is setting the new state of our error. We will compose our error for user with a errMsg (we create this on backend as you will learn in a moment) and the errPath (option, but this is the falcor-route path where the error has occured).

OK - we have everything in place, the only thing with the CoreLayout function that is missing is the improved render. 

The new render of the CoreLayout:
```
  render () {
    let errorSnackbarJSX = null;
    if(this.state.errorValue) {
      errorSnackbarJSX = <Snackbar
        open={true}
        message={this.state.errorValue}
        autoHideDuration={8000} />;
    }

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
          {errorSnackbarJSX}
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

As you can find above, the new parts are related to the Material-UI snackbar component so this:
```
let errorSnackbarJSX = null;
if(this.state.errorValue) {
  errorSnackbarJSX = <Snackbar
    open={true}
    message={this.state.errorValue}
    autoHideDuration={8000} />;
}
```
the code's snippet above is preparing our erroSnackbar's JSX
and this:
```
<MuiThemeProvider muiTheme={muiTheme}>
  <div>
    {errorSnackbarJSX}
    <AppBar
      title='Publishing App'
      iconElementLeft={homePageButtonJSX}
      iconElementRight={menuLinksJSX} />
      <br/>
      {this.props.children}
  </div>
</MuiThemeProvider>
```

There is one important thing above, you need to put the errorSnackbarJSX under the div's tag. Why? The MuiThemeProvider's children ALWAYS has to be a single node, if you will put it differently, then there will be an error related the MuiThemeProvider's component. Please make sure the {errorSnackbarJSX} is placed exactly the same as in our's book example.


You have everything in place related to the CoreLayout's improvements.

#### Tweaks: FalcorModel.js on front-end 

In the ***src/falcorModel.js***'s file improve the below's code:
```
// already in your codebase, old code:
import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

class PublishingAppDataSource extends FalcorDataSource {
  onBeforeRequest ( config ) {
    const token = localStorage.token;
    const username = localStorage.username;
    const role = localStorage.role;

    if (token && username && role) {
      config.headers['token'] = token;
      config.headers['username'] = username;
      config.headers['role'] = role;
    }
  }
}

const model = new falcor.Model({
  source: new PublishingAppDataSource('/model.json')
});

export default model;
```

... and this above codes from falcorModel.js has to be improved by adding a new option into the falcor.Model:

```
import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';
import { errorFunc } from './layouts/CoreLayout';

class PublishingAppDataSource extends FalcorDataSource {
  onBeforeRequest ( config ) {
    const token = localStorage.token;
    const username = localStorage.username;
    const role = localStorage.role;

    if (token && username && role) {
      config.headers['token'] = token;
      config.headers['username'] = username;
      config.headers['role'] = role;
    }
  }
}

let falcorOptions = {
  source: new PublishingAppDataSource('/model.json'),   
  errorSelector: function(path, error) {
    errorFunc(error.value, path);
    error.$expires = -1000 * 60 * 2;
    return error;
  } 
};

const model = new falcor.Model(falcorOptions);

export default model;
```

First thing that we added is an import of errorFunc on top of that file:
```
import { errorFunc } from './layouts/CoreLayout';
```

Besides the errorFunc, we have introduced the falcorOptions' variable. The source stays the same as in the previous version. We have added the errorSelector, which is ran everytime when a client-side is calling the backend, and the falcor-router on the backend returns an $error sentinel. 

More details on the error selector you can find at: https://netflix.github.io/falcor/documentation/model.html#the-errorselector-value

### Back-end implementations of the $error's sentinel

We will do it in steps:

1) an error example, just to test our client-side code 

2) after we are sure that the error handling is working correctly, we will secure the endpoints properly




#### Testing our $error related code

Let's start with imports in the ***server/routes.js***'s file:
```
import configMongoose from './configMongoose';
import sessionRoutes from './routesSession';
import jsonGraph from 'falcor-json-graph';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';

let $ref = jsonGraph.ref;
let $atom = jsonGraph.atom;
let $error = jsonGraph.error;
let Article = configMongoose.Article;
```

... above the only new thing is that you need to import the $error's sentinel from the falcor-json-graph.

Test it with the articles' route:
```
  {
    route: 'articles[{integers}]',
    get: (pathSet) => {
      let articlesIndex = pathSet[1];

      return {
        path: ['articles'],
        value: $error('auth error')
      }

      return Article.find({}, '_id', function(err, articlesDocs) {
        return articlesDocs;
      }).then ((articlesArrayFromDB) => {
        let results = [];
        articlesIndex.forEach((index) => {
          let currentMongoID = String(articlesArrayFromDB[index]['_id']);
          let articleRef = $ref(['articlesById', currentMongoID]);

          let falcorSingleArticleResult = {
            path: ['articles', index],
            value: articleRef
          };

          results.push(falcorSingleArticleResult);
        });
        return results;
      })
    }
  },
```

As you can find above, this is only a test. We will improve this code in a moment, but let's test if the text in the ***$error('auth error')*** will be shown to the user.

After you run mongoDB:
```
$ mongod 
```

and run the server in another terminal:
```
$ npm start
```

.. so after you run those both in the browser on the http://localhost:3000 then you shall see for 8 seconds the error:

![$error sentinel demo](http://test.przeorski.pl/book/403_snackbar_error.png)

... as you see there is a white text on black background in the bottom of the window:

![error text only](http://test.przeorski.pl/book/404_error_text_only.png)

If you run the app, and on the main page you see the error message as on the screenshot, then it tells you that you are good!

#### Wrapping up the routes' security


We already implemented some logic in the server/routes.js that checks if a user is authorized with:
```
// this already is in your codebase:
export default ( req, res ) => {
  let { token, role, username } = req.headers;
  let userDetailsToHash = username+role;
  let authSignToken = jwt.sign(userDetailsToHash, jwtSecret.secret);
  let isAuthorized = authSignToken === token;
  let sessionObject = {isAuthorized, role, username};

  console.info(`The ${username} is authorized === `, isAuthorized);
```

Above you can find that we can make a logic as following in the beginning of each roles that require authorization and an editor role:
```
// this is example of falcor-router $errors, don't write it:
if(isAuthorized === false) {
  return {
    path: ['HERE_GOES_THE_REAL_FALCOR_PATH'],
    value: $error('auth error')
  }
} elseif(role !== 'editor') {
  return {
    path: ['HERE_GOES_THE_REAL_FALCOR_PATH'],
    value: $error('you must be an editor in order to perform this action')
  }
}
```

As you see above, this is only an example (don't write it, yet we will implement it in a moment) with a path ***['HERE_GOES_THE_REAL_FALCOR_PATH']***.

1) first we check if a user is authorized at all with the ***isAuthorized === false***, if not he will see an error (universal error's mechanism that we have implemented a moment ago):
![error text only](http://test.przeorski.pl/book/404_error_text_only.png)

2) In future we may have more roles in our publishing app, so in case if someone isn't an editor then he will see in the error:
![second error text only](http://test.przeorski.pl/book/405_second_error_text_only.png)

#### What routes to secure

The routes (server/routes.js) which require authorization in our applications:

1) articles add:
```
route: 'articles.add',
```

The old code:
```
// this is already in your codebase, old code:
  {
    route: 'articles.add',
    call: (callPath, args) => {
      let newArticleObj = args[0];
      var article = new Article(newArticleObj);

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
        else {
          return data;
        }
      }).then ((data) => {
// code has been striped out from here for the sake of brevity, nothing changes below
```

The new code with the auth checks:
```
  {
    route: 'articles.add',
    call: (callPath, args) => {
      if(sessionObject.isAuthorized === false) {
        return {
          path: ['articles'],
          value: $error('auth error')
        }
      } else if(sessionObject.role !== 'editor') {
        return {
          path: ['articles'],
          value: $error('you must be an editor in order to perform this action')
        }
      }

      let newArticleObj = args[0];
      var article = new Article(newArticleObj);

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
        else {
          return data;
        }
      }).then ((data) => {
// code has been striped out from here for the sake of brevity, nothing changes below
```

As you can find above, we have added two checks with ***isAuthorized === false*** and ***role !== 'editor'***. Almost the same will be in the below's routes (just the path changes a little).

2) articles update:
```
route: 'articles.update',
```

The old code:
```
// this is already in your codebase, old code:
  {
  route: 'articles.update',
  call: async (callPath, args) => 
    {
      let updatedArticle = args[0];
      let articleID = String(updatedArticle._id);
      let article = new Article(updatedArticle);
      article.isNew = false;

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then ((res) => {
// code has been striped out from here for the sake of brevity, nothing changes below
```

The new code with the auth checks:
```
  {
  route: 'articles.update',
  call: async (callPath, args) => 
    {
      if(sessionObject.isAuthorized === false) {
        return {
          path: ['articles'],
          value: $error('auth error')
        }
      } else if(sessionObject.role !== 'editor') {
        return {
          path: ['articles'],
          value: $error('you must be an editor in order to perform this action')
        }
      }

      let updatedArticle = args[0];
      let articleID = String(updatedArticle._id);
      let article = new Article(updatedArticle);
      article.isNew = false;

      return article.save(function (err, data) {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then ((res) => {
// code has been striped out from here for the sake of brevity, nothing changes below
```

3) articles delete:
```
route: 'articles.delete',
```

The old code:
```
// this is already in your codebase, old code:

  {
  route: 'articles.delete',
  call: (callPath, args) => 
    {
      let toDeleteArticleId = args[0];
      return Article.find({ _id: toDeleteArticleId }).remove((err) => {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then((res) => {
// code has been striped out from here for the sake of brevity, nothing changes below
```

The new code with the auth checks:
```
  {
  route: 'articles.delete',
  call: (callPath, args) => 
    {

      if(sessionObject.isAuthorized === false) {
        return {
          path: ['articles'],
          value: $error('auth error')
        }
      } else if(sessionObject.role !== 'editor') {
        return {
          path: ['articles'],
          value: $error('you must be an editor in order to perform this action')
        }
      }

      let toDeleteArticleId = args[0];
      return Article.find({ _id: toDeleteArticleId }).remove((err) => {
        if (err) {
          console.info("ERROR", err);
          return err;
        }
      }).then((res) => {
// code has been striped out from here for the sake of brevity, nothing below changes
```

#### A summary of the $error returns on the backend

As you see the returns are almost the same, we can make a helper function for that so there will be less code, but you need to remember that you need to put the path similar to one that you request when returning an error. For example, if you are on the articles.update, then you need return an error in the articles' path (or if you are on XYZ.update, then the error goes to the XYZ's path).


