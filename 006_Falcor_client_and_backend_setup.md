## Falcor basics concepts

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


# Client side Falcor

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
var Falcor = require('falcor'),
    FalcorDataSource = require('falcor-http-datasource'),
    model = new Falcor.Model({
        source: new FalcorDataSource('/model.json')
    })

module.exports = Model
```



















