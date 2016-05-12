### Mastering React and Node with FalcorJS as a glue for effective data fetching

Let's discuss about React, Node and Falcor more in details.

It's important to understand why we have choosen Falcor in our technical stack. In general, we in our custom software development's company (you can find more at www.MobileWebPro.pl) use Falcor as it has many great advantages for our clients in terms of productivity of developing full-stack Mobile/Web applications. Some of them:

1. The simplicity of the concept

2. Speed-up by 30%+ the development in comparision to RESTful's approach

3. Low learning curve so a developer who learn Falcor's can get effective very quickly

4. Sexy way of data-fetching which is quite mind-blowing


I will keep these 3 points above short and sweet. Later in that chapter you will learn more about potential problems that you may be aware of when using Falcor & Node.

Currently, we have done kind of full-stack starter kit with React+Redux+Falcor+Node+Express+MongoDB. It's not perfect, yet. We will try to make it better in that chapter


#### The problem that Falcor wants to solve

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

1) we will implement hot reload in our project

2) we will implement better server-side rendering errors catching

3) securing the backend so we check the authorization before running add/edit/delete on backend

4) we need to give ability to catch errors on backend and give a notification to user on front-end that something didn't work correctly








------------------
------------------
------------------

PONIZEJ konczyc robic jak bedziemy miec hot reload i error catching server rendering with renderToStaticMarkup solved!!!
#### Securing the auth required's routes

Currently our app has ability to add/edit/delete a route, the problem with our current implementation is that currently, we don't check if a client who is making any CRUD operation has privilitages to do so... 

The solution of securing the falcor-routes requires some changes in our current implementation, so on each request before doing the opration we will check if we have got from the client a correct token, and if the user who is making the call has ability to edit (in our case it means that if anyone has a role as an editor and is authenticated correctly with his username and password, then he can add/edit/delete an article).

#### Improving the server.js & routes.js


In the server/server.js file, change this old code:
```
// this shall be already in your
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new FalcorRouter(routes);
}));
```

.. to this improved one:
```
todo
```

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


### Improving our falcor code on front-end








