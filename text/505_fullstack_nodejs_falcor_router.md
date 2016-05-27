#### Wrapping up of our Publishing App and Refactoring


Currently we have an app that works, but is missing some key features as for example:

1) [in-progress] AWS S3 - ability to upload a photo for a new article

2) [in-progress] AWS S3 - ability to upload an editor's avatar (that is shown next to the article)

3) [in-progress] we are missing a way to set up a title, subtitle and "overlay subtitle" (add/edit's article):

![article example](http://test.przeorski.pl/book/501_article_example.png)

4) [in-progress] article's excerpts - as you can see above, we need to make a mechanism that cuts the articles' text when a user is on the main page

5) [in-progress] articles' on the dashboard currently have html in the content, we need to improve it (screenshot below):
![articles html strip on dashboard](http://test.przeorski.pl/book/502_articles_dashboard_strip_html.png)

6) [in-progress] articles' slug and sub-page - we need to create slugs mechanism, so a user can visit an article with a user's friendly links as for example:
```
http://localhost:3000/article-content-slug-is-always-unique
```

We need to finish these remaining stuff (from 1 to 6 points above). After we will be done with those improvements, then we will do some refactoring.


#### AWS S3 - an introduction

Amazon AWS S3 is a simple storage service for static assets like images on the Amazon's servers. It helps you to host safe, secure and highly scalable objects (as images) storage in the cloud.

This approach of keeping static assets is quite convenient and easy - this is why we will use it through our book.

We will use it in our application, as using this tool gives us a lot of scalibility features, that wouldn't be so easy to access when hosting images' assets on our own node.js server.

In general, node.js shouldn't be used for any bigger assets hosting as we use it now. Don't even think of implementing an upload images' mechanism (not recommended at all) to the node.js server - we will employ the Amazon's services for that.


#### Steps - setup and configure Amazon AWS S3

1) Go to the https://aws.amazon.com/

![aws main page](http://test.przeorski.pl/book/503_aws_main_page.png)

2) Create an account / sign-in to a new account

![aws signup signin page](http://test.przeorski.pl/book/504_aws_signup_signin.png)

3) Then after you have an account, go to the main dashboard https://console.aws.amazon.com/console/home ... you shall see something like "AWS ServicesSHOW ALL SERVICES"

![aws services list](http://test.przeorski.pl/book/505_aws_services_list.png)

4) Click on the "S3 - Scalable Storage in the Cloud" (as on the image above)

5) After that you shall see similar view (I have 6 buckets, you shall have 0 buckets when you have a new account)

![aws bucket view list](http://test.przeorski.pl/book/506_aws_bucket_view.png)





NodeJS/ExpressJS with falcor Express - moving the
Falcor's model from the client-sideto backend side, using
falcor-router




MISSING PARTS:
- article link sub page (5 pages)
- refactoring (5 pages)
- unit testing 