#### Wrapping up of our Publishing App and Refactoring


Currently we have an app that works, but is missing some key features as for example:

1) AWS S3 - ability to upload a photo for a new article

2) AWS S3 - ability to upload an editor's avatar (that is shown next to the article)

3) we are missing a way to set up a title, subtitle and "overlay subtitle" (add/edit's article):

![article example](http://test.przeorski.pl/book/501_article_example.png)

4) article's excerpts - as you can see above, we need to make a mechanism that cuts the articles' text when a user is on the main page

5) articles' on the dashboard currently have html in the content, we need to improve it (screenshot below):
![articles html strip on dashboard](http://test.przeorski.pl/book/502_articles_dashboard_strip_html.png)

6) articles' slug and sub-page - we need to create slugs mechanism, so a user can visit an article with a user's friendly links as for example:
```
http://localhost:3000/article-content-slug-is-always-unique
```

We need to finish these remaining stuff (from 1 to 6 points above). After we will be done with those improvements, then we will do some refactoring.


#### AWS S3 - an introduction

Amazon AWS S3 is a simple storage service for static assets like images on the Amazon's servers. We will use it in our application, as using this tool gives us a lot of scalibility features, that wouldn't be so easy to access when hosting images' assets on our own node.js server.

In general, node.js shouldn't be user for any bigger assets hosting as we use it now - we will improve it so the images won't be loaded from the static's directory anymore.


NodeJS/ExpressJS with falcor Express - moving the
Falcor's model from the client-sideto backend side, using
falcor-router




MISSING PARTS:
- article link sub page (5 pages)
- refactoring (5 pages)
- unit testing 