#### Mongoose, MongoDB and mLab - important aspects and preparation for the deployment

We came to the point where we need to start planning deployment of our application. We have choosen MongoDB as our database. There are different approaches of using it for scaling - you can do everything on your own with your own servers (more time consuming and demanding version) or you can use services which are doing replications/scaling for you as Database-as-a-Service providers.

We will use mLab in our case so we will spend less time configuring the low-level stuff on MongoDB and more building robust scalable application. 

If we go to the www.mLab.com - they have free (that we will use in that chapter) and paid DB plans:

![mLab homepage](http://test.przeorski.pl/book/601_mlab_homepage.png)

In general, mLab provides several interesting features as:

1) Tools for cloud automation - on-demand provisioning (preparing) on AWS, Azure, or Google. Replica Set (described in details later in that chapter), Sharded Cluster. It also provides seamless, zero-downtime scaling, high availability via auto-failover.

2) Tools for backup and recovery - automatic backups can help in the later's project stage in case of an emergency.

3) Tools for monitoring & alerts - for example, there is "slow queries" tool that help you to find slow queries, which for example can be optimized by adding an index.

4) Tools for online's data browsing - you can browse the MongoDB's collection via browser when you are logged into the mLab's administration panel.

#### Replica set connections and high availability

In MongoDB, there is a feature that ensures high availability using automatic failover. In short failover is a feature that in case if a primary server (that has the most important copy of your database) fails, then a secondary member's database becomes the primary one in case if the orginal primary's server is unavailable.

Secondary member's database is a server that keeps the so called "read only backup" of your database. 

The primary and the secondary's database are very often replicating itself in order to be in sync all the time. The secondary server is mostly for the read's operation. 

That whole "replica set"'s feature is quite time consuming to implement from scratch (without mLab), but the mLab provides that feature in order to "abstract" this part so our whole process will be more automated.

#### MongoDB fail-over

mLab also provides a great tool for testing the fail-over scenarion in our app that is available at http://flip-flop.mlab.com:

![mLab homepage](http://test.przeorski.pl/book/602_flip_flow_mlab.png)

We can test there the how the automatic failover with MongoDB replica sets does work. As we can see on the screenshot above, there are three nodes: replicas “flip” and “flop”, plus an arbiter. In that's flip-flow's demo you can connect to the arbiter server's and the primary server step down and the cluster will failover to the other node. You can experiment with it - please try on your own and have fun!

You can find more documentation about how to play with that flip-flop's demo at http://docs.mlab.com/connecting/#replica-set-connections

#### Free vs. paid plan in mLab

In our book we will guide you via process of using mLab with a free plan. In mLab, the replicas set is available in the paid plans (starting at $15/month) - and of course you can use that flip-flop's demo to play for free with that very important feature of the MongoDB.

#### The new mLab's account and node

1) Go to https://mlab.com/signup/

![mLab signup](http://test.przeorski.pl/book/603_mlab_signup.png)

2) Verify your email via clicking a confirm link in your inbox

3) Click on the "Create new" button as on the screenshot:

![mLab signup](http://test.przeorski.pl/book/604_create_new_on_dashboard.png)


4) You are on the "Create new deployment" choose Single-node > Sanbox (FREE):

![deployment page](http://test.przeorski.pl/book/605_deployment_mongodb_page.png)

5) While your are still at https://mlab.com/create (Create new deployment) - choose the database name to "publishingapp" and click the "Create new MongoDB deployment" button:

![create button mongodb](http://test.przeorski.pl/book/606_create_button.png)

After all that steps you shall be able to find the MongoDB's deployment on the dashboard (https://mlab.com/home) as on the example below:

![deployment success](http://test.przeorski.pl/book/607_deployment_on_dashboard.png)

#### Creating the database's user/password and other configurations

Right now, we have ready database for our publishing application, but it's still empty. 

There are steps that we need to take in order to use it:

1) Create a user/password combination: we need to click on the database that has been just created and there is a tab called "users". After you click on it, there is a button "Add database user" then fill in the details into the form:

![deployment success](http://test.przeorski.pl/book/608_db_user_password.png)

Let's assume for this book that our details are:
DB username: usermlab
DB password: pwdmlab

... so in places where we will use those details, I will user those two above.

2) After that, we need to create the collections that are identical as in our local MongoDB so: 

a) Collection -> Add collection -> articles

b) Collection -> Add collection -> pubUsers


After all those steps you shall be able to see something like this below:

![deployment success](http://test.przeorski.pl/book/609_users_articles_mlab_collections.png)

At this stage, the last thing is to write down the mongo details from this below:

![deployment success](http://test.przeorski.pl/book/610_mongo_mlab_details.png)

#### A summary about enviroment variables

All that information from mlab we need to keep alongside with the AWS S3 details - they will be useful in the next chapter when deploying our app on Amazon AWS EC2.

At this point of book that are the details that we need to keep separately:
```
AWS_ACCESS_KEY_ID=<<access-key-obtained-in-previous-chapter>>
AWS_SECRET_ACCESS_KEY=<<secret-key-obtained-in-previous-chapter>>
AWS_BUCKET_NAME=publishing-app
AWS_REGION_NAME=eu-central-1
MONGO_USER=usermlab
MONGO_PASS=pwdmlab
MONGO_PORT=25762
MONGO_ENV=publishingapp
MONGO_HOSTNAME=ds025762.mlab.com
```

All the MONGO env variables, can be obtained from the mLab where you can find a link similar to this:
```
mongo ds025762.mlab.com:25762/publishingapp -u <dbuser> -p <dbpassword>
```

In the next chapter we will start using those enviroment variables on our production server on the AWS EC2's platform. Please keep all those detailes noted in easy accessible place in a safe place - we will use it soon.




PLAN:

- create amazon linux ubuntu instance







