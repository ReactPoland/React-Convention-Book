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

#### Generating keys (access key id and secret key)

Before we will start adding a new S3 bucket, we need to generate keys of your AWS account (accessKeyId and secretAccessKey).

An example set of details that we will need to keep in our node.js' app is as following:
```
const awsConfig = {
  accessKeyId: 'EXAMPLE_LB7XH_KEY_BGTCA',
  secretAccessKey: 'ExAMpLe+KEY+FYliI9J1nvky5g2bInN26TCU+FiY',
  region: 'us-west-2',
  bucketKey: 'your-bucket-name-'
};
```

What is a bucket in the Amazon S3? Bucket is kind of name space for files that you how in Amazon S3. You can have several buckets associated with different projects etc. As you can see, our next steps will be:

1) Create the accessKeyId and secretAccessKey associated to your account

2) Define your bucketKey (kind of a name space for the pictures for our articles)

3) Define a region where you want to keep the files physically (if your project has a target specified for a location then it will speed up the images load and general it will limit the latency as an image will be hosted closer to a client/user of our publishing's application).

#### AWS Account creation

1) Go to the https://aws.amazon.com/

![aws main page](http://test.przeorski.pl/book/503_aws_main_page.png)

2) Create an account / sign-in to a new account

![aws signup signin page](http://test.przeorski.pl/book/504_aws_signup_signin.png)

Then the next step is to create the IAM that is described in details further.

#### Identity and Access Management (IAM)

Let's prepare our new accessKeyId and secretAccessKey. You need to visit the "Identity and Access Management" (IAM) page in your Amazon's console. You can find it from the services' list:

![aws services list](http://test.przeorski.pl/book/507_aws_services_list.png)

The IAM page looks as following (under the https://console.aws.amazon.com/iam/home?#home):

![IAM aws](http://test.przeorski.pl/book/508_aws_IAM.png)


Then click on the IAM Resources/users' link:
![IAM aws](http://test.przeorski.pl/book/509_click_on_users.png)

On the next page you will see a button (please click it):
![create new user button](http://test.przeorski.pl/book/510_click_create_new_users.png)

After the click you shall see a form, then fill it with at least one user as on the screenshot:
![new user form](http://test.przeorski.pl/book/511_new_user_form.png)

... then after clicking the "Create" button, copy the keys to a safe place (we will use them in a moment):
![aws copy keys](http://test.przeorski.pl/book/512_copy_keys.png)

IMPORTANT: please copy the keys (Access Key ID and Secret Access Key), you will learn later in the book where to put them in the code in order to use the S3's services. Of course, the one from the screenshot aren't active - they are only examples, you need to have your own.


#### Setup S3 permissions for the user 

The last thing is to add the AmazonS3FullAccess's permissions with the following steps:

1) Go to the Permissions tab:

![permissions tab aws](http://test.przeorski.pl/book/513b_permissions_tab.png.png)

2) Click on the "Attach Policy" and choose AmazonS3FullAccess

3) After attaching then it shall be listed the same way as on the example below:

![aws attach policy](http://test.przeorski.pl/book/514b_attach_policy.png)


publishingapp
Access Key ID:
AKIAI3Y54WVG5JM4VUHA
Secret Access Key:
k3JxxCbByqy+qTXojf7xRiJ0oRI6w3ZEmENE1I0l


#### Creating a new bucket for the image's files

You are done with the keys and you have granted the S3's policy for the keys, then we need to prepare our's bucket that will keep the images. 

1) First of all you need to to the AWS' console main page that looks like below (https://console.aws.amazon.com/console/home)


![dashboard aws](http://test.przeorski.pl/book/513_dashboard_home.png)



2) You shall see there something like "AWS Services SHOW ALL SERVICES" (or alternatively find it from the services' list the similar way as IAM)

![aws services list](http://test.przeorski.pl/book/514_aws_services_list.png)



2) Click on the "S3 - Scalable Storage in the Cloud" (as on the above's image)

3) After that you shall see similar view (I have 6 buckets, you shall have 0 buckets when you have a new account)

![aws bucket view list](http://test.przeorski.pl/book/515_aws_bucket_view.png)

In that buckets we will keep the static images of our articles (you will learn how exactly in next pages of the book).

4) Create a bucket by clicking the button:

![button create bucket](http://test.przeorski.pl/book/516_create_bucket_click.png)


5) Choose "publishing-app" name (or different that works for you):

![name bucket and create](http://test.przeorski.pl/book/517_name_and_create_bucket.png)

6) After the bucket has been created, then click on it from the buckets' list:

![choose bucket from list](http://test.przeorski.pl/book/518_choose_new_bucket_from_list.png)

7) The empty bucket with a name of "publishing-app" shall be looking as following:

![choose bucket from list](http://test.przeorski.pl/book/519_empty_bucket_list.png)

When you are on that view as from the screenshot above, then the url in the browser tell's you exactly the region and bucket (so you can use it later when doing the config on backend):
```
// just example link to the bucket
https://console.aws.amazon.com/s3/home?region=eu-central-1&bucket=publishing-app&prefix=
```


8) The last thing is to make sure that the CORS for the publishing-app's bucket are correct. Click on the properties tab on that view and you will get a detailed view of them as on the example below:

![properties aws bucket](http://test.przeorski.pl/book/520_properties_tab.png)

then click on the "Add CORS" button:

![properties aws bucket](http://test.przeorski.pl/book/521_add_cors_button.png)

and after that past this into the text area:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

.. so it will be looking as on the example:
![properties aws bucket](http://test.przeorski.pl/book/522_cors_example.png)


... and click the save button. After all that steps we are done, so we can start with coding the images upload's feature.


#### Start coding upload image feature

,,, programujemy tutaj :-)


0) [DONE] BO CO opisać jak wygenerować kody

1) [DONE] BO CO stworzyć bucket na S3

2) [DONE] CO zainstalowac react pickera u nas

3) [DONE] CO zmienic konfiguracje

4) [DONE] CO .env

5) [DONE] czy dziala na glownej?

6) [DONE] commit kodu

7) [DONE] CO dodać picker do article add view

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