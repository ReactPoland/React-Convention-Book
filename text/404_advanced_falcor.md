### Publishing App - full-stack Falcor improvements 

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
const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;


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


Beside the token, username and role we have made a small cleanup as following: we have deleted the $ref and $atom because we don't need it on the front-end anymore (all that stuff has been moved to the falcor-router).



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
```

.. and instead of exporting array of routes, we need to export a function that will return routes based on a current request's headers details:
```
todo
```






***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:
***** TO-IMPROVE BELOW:

CH4 has some code for add/update/delete






