#### Wrapping up of our Publishing App and Refactoring


Currently we have an app that works, but is missing some key features as for example:

1) [in-progress] AWS S3 - ability to upload a photo for a new article

2) [in-progress] AWS S3 - ability to upload an editor's avatar (that is shown next to the article)

3) [in-progress] we are missing a way to set up a title, subtitle and "overlay subtitle" (add/edit's article):

![article example](http://test.przeorski.pl/book/501_article_example.png)

4) [in-progress] article's excerpts - as you can see above, we need to make a mechanism that cuts the articles' text when a user is on the main page

5) [in-progress] articles' on the dashboard currently have html in the content, we need to improve it (screenshot below):
![articles html strip on dashboard](http://test.przeorski.pl/book/502_articles_dashboard_html_to_strip.png)

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


#### First Steps - preparation of an Amazon AWS S3's account

1) Go to the https://aws.amazon.com/

![aws main page](http://test.przeorski.pl/book/503_aws_main_page.png)

2) Create an account / sign-in to a new account

![aws signup signin page](http://test.przeorski.pl/book/504_aws_signup_signin.png)

3) Then after you have an account, go to the main dashboard https://console.aws.amazon.com/console/home ... you shall see something like "AWS ServicesSHOW ALL SERVICES"

![aws services list](http://test.przeorski.pl/book/505_aws_services_list.png)

4) Click on the "S3 - Scalable Storage in the Cloud" (as on the image above)

5) After that you shall see similar view (I have 6 buckets, you shall have 0 buckets when you have a new account)

![aws bucket view list](http://test.przeorski.pl/book/506_aws_bucket_view.png)

#### Generating keys (access key id and secret key)

Before we will start adding a new S3 bucket, we need to generate keys.

An example set of details that we will need to keep in our node.js' app is as following:
```
const awsConfig = {
  accessKeyId: 'EXAMPLE_LB7XH_KEY_BGTCA',
  secretAccessKey: 'ExAMpLe+KEY+FYliI9J1nvky5g2bInN26TCU+FiY',
  region: 'us-west-2',
  bucketKey: 'your-bucket-name-'
};
```

What is a bucket in Amazon S3? Bucket is kind of name space for files that you how in Amazon S3. You can have several buckets associated with different projects etc. As you can see, our next steps will be:

1) Create the accessKeyId and secretAccessKey associated to your account

2) Define your bucketKey (kind of a name space for the pictures for our articles)

3) Define a region where you want to keep the files physically (if your project has a target specified for a location then it will speed up the images load and general it will limit the latency as an image will be hosted closer to a client/user of our publishing's application).









0) [in-progress] BO CO opisać jak wygenerować kody

1) [in-progress] BO CO stworzyć bucket na S3

2) [DONE] CO zainstalowac react pickera u nas

3) [DONE] CO zmienic konfiguracje

4) [DONE] CO .env

5) [DONE] czy dziala na glownej?

6) [DONE] commit kodu

7) [in-progres] CO dodać picker do article add view

8) [in-progres] CO dodać do bazy (dodawac url z amazone)

9) [in-progres] CO wyswietlac w artykule nowo stworzonym

10) zaczac opisywac to w ksiazce!

NodeJS/ExpressJS with falcor Express - moving the
Falcor's model from the client-sideto backend side, using
falcor-router




MISSING PARTS:
- article link sub page (5 pages)
- refactoring (5 pages)
- unit testing 