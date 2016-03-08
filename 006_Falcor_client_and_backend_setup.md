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

### Tight-coupling and latency vs. one model everywhere

If you are familiar with front-end development, you know how to make requests to an API. This old way of doing things always force you to tight cople backend API with frontend API utilities. It's always like that:
```
// You make an API endpoint for example:
// https://applicationDomain.com/api/recordDetails?id=92
//  and on the front-end you consume the data
{
	articleId: "92",
	articleTitle: "example title",
	articleContent: "example content"
}
```



So you have coded the backend endpoint to provide for frontend information. Imagine now that for any reasons (probably client has changed his mind or see new way of better user-flow in the app) and he requests a major change.








