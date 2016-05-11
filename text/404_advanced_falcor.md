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



#### Falcor vs. Relay/GraphQL (in which cases Falcor is much better than Relay/GraphQL)



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












