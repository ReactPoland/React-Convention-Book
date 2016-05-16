### Publishing App - Falcor's sentinels and other more advanced concepts

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
// ...... here is more code between
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
  let isAuthorized = authSign === token;
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


### Falcor's Sentinels implementation

What are the sentinels? They are "New Primitive Value Types". The same way as you have types in a regular JSON as String, Number, Object etc. , but more specific for Virtual-JSON in Falcor (examples are $ref, $atom, $error's sentines).

At this stage, it's important to understand how the Falcor's sentinels are working. There different types of sentinels in Falcor are:


#### $ref's sentinel

Regarding to the documentation: "A Reference is a JSON object with a “$type” key that has a value of “ref” and a “value” key that has a Path array as its value".

In Falcor "a Reference is like a symbolic link in the UNIX file system" - as the documentation states and this comparision is very good. 

... and an example of a $ref:
```
{ $type: "ref", value: ['articlesById', 'STRING_ARTCILE_ID_HERE'] }
```

***IMPORTANT:*** if you use $ref(['articlesById','STRING_ARTCILE_ID_HERE']) it's equals to the above's example. The $ref is a function which changes the array's detail into that $type and value's notation object.

You can find both approaches to use $refs, but in our project we will stick to the ***$ref(['articlesById','STRING_ARTCILE_ID_HERE'])***'s convention.

Just to make it clear this is how to import a $ref's sentinel in our codebase:
```
import jsonGraph from 'falcor-json-graph';
let $ref = jsonGraph.ref;
// now you can use $ref([x, y]) function
```

... so after you import that ***falcor-json-graph*** then you can use the $ref's sentinel. I shall have installed the falcor-json-graph already as the installation has been described in the previous chapter, if not then please use this (just in case):
```
npm i --save falcor-json-graph@1.1.7
```


BUT, what does the 'articlesById' mean? And what does mean the 'STRING_ARTCILE_ID_HERE' in the above example? Let's give me an example from our project.

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
[
  $ref([ articlesById,'987654' ]),
  $ref([ articlesById,'123456' ])
]
```

or even more detailed answer is:
```
[
  { $type: "ref", value: ["articlesById", '987654'] },
  { $type: "ref", value: ["articlesById", '987654'] }
]
```

IMPORTANT: the '***articlesById***' is a new route that is not created, YET (we will do it in a moment).

... but why do we need those $refs in our articles?


In general, you can keep a reference (as in UNIX a symbolic link) in many places to one object in the database - in our case it's an article with certain _id in the articles' collection.









==========
==========

and our current route on backend (falcor-router) looks as following:
```
// this is already in your codebase in the server/routes.js file
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



1) "atom"

2) 

3) "error"




Each of these types is a JSON Graph object with a “$type” key that differentiates it from regular JSON objects, and describes the type of its “value” key. These three JSON Graph primitive types are always retrieved and replaced in their entirety just like a primitive JSON value. None of the JSON Graph values can be mutated using any of the available abstract JSON Graph operations.



#### $ref's sentinel





NEXT STEPS:
NEXT STEPS:
NEXT STEPS:

2) securing the backend so we check the authorization before running add/edit/delete on backend ((((CH4 has some code for add/update/delete))))

3) we need to give ability to catch errors on backend and give a notification to user on front-end that something didn't work correctly




***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:

CH4 has some code for add/update/delete







