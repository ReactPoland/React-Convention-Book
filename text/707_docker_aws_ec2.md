#### Docker and EC2


We have done the all stuff related to the database-as-a-backend with mLab. It's time to prepare our Docker container and deploy it on the EC2 altogether with use of load balancers.

What is Docker? It's a very useful piece of software which is open source and helps you to pack, ship and run any app as a light (in comparision to a virtual machine for example) container. 

A container's goals  are similar to the Virtual Machines - the big difference is that the Docker was created with software development on the mind in comparision to VMs. You need also be aware that a full virtualized system has it's own resources allocated to it which causes minimal resources sharing which is different for the Docker's containers. Of course in the VMs you get more isolation, but the cost is that the VMs are much heavier (requires more disk space, RAM and other resources). Docker's container are lightweight and are able to share more things between different containers in comparision to VMs.

The good part is that the Docker's containers are hardware and platform independent so all worries about what you are working will run everywhere are disappearing.

General Docker's benefits are that it increases developers' productivity, helps them to ship more software faster, help to move the software from local development machines to production deployments on AWS etc. Docker's allow also versioning (similar to GIT) of your software which can be helpful when you need a quick rollback on the production's server etc.


In that chapter you will learn how to do following things:
- install Docker app on your machine with Dockertoolbox on other than Linux machines
- test if your Docker setup is correct
- prepare the Publishing App in order to use a mLab's mongo for the database
- create a new Docker's container for the publishing app
- Basics things about Dockerfile
- EC2
- EC2 Container Services
- AWS Load Balancers
- IAM
- 


#### Docker's installation (with Docker Toolbox)

Installation of the Docker is quite easy. Please visit the official installation page at https://docs.docker.com/engine/installation/ because it will guide you best depending on your operating system. There are easy to follow installers for iOS and Windows and a lot of instructions for different Linux's distributions.

If you are using other than Linux machine, then you also need to install the Docker Toolbox's for Windows or OS X. This is quite simple with it's installers that are available at https://www.docker.com/products/docker-toolbox as on the example below:

![docker toolbox](http://test.przeorski.pl/book/700_docker_toolbox.png)


After you have installed the Docker (altogether with the toolbox on OS X and Windows) on your local machine, then run in terminal the following command:

```
$ docker info
```

After you run that commend then you shall be able to see something similar to the below's screenshot:

![docker info in terminal](http://test.przeorski.pl/book/701_docker_info.png)


If you can see something similar to the above, then your installation is successful - let's continue with the Docker.

#### Hub Docker (hello world example)

Before we will start creating the Publishing App's Docker container, let's start playing with an official Docker's hello world example that will make you aware how the Docker Hub is working.

The Docker Hub is the same for Docker's containers as the GitHub for the Git's repositories. You can have public and private containers on Docker. The main page of the Docker Hub is as on the screenshot below:

![docker hub](http://test.przeorski.pl/book/702_docker_hub.png)

... and just to give you a feel, if you will visit the https://hub.docker.com/explore/ then you can see different containers that are ready for use as for example:

![docker explore](http://test.przeorski.pl/book/703_docker_explore.png)


Just for for our demo's exercise, we will use a container called "hello world" which is publicly available at:
``` 
https://hub.docker.com/r/library/hello-world/
```

In order to run this hello world's example run in your terminal:
```
$ docker run hello-world
```

After you run this, then you shall see something similar in your console as on the below's screenshot:
![running hello world](http://test.przeorski.pl/book/704_running_hello_world.png)


Explanation about what've just happened: the ***docker run*** command we use in order to start the container based on an image (in our example we have used hello world's container image). In that case we have:

1) ran the command which said to Docker start the container named "hello-world" with no extra commands

2) then after you hit the "enter", the Docker has downloaded the Docker Hub

3) and then it's started the container in the VM's with use of the Docker Toolbox on other systems than Linux


The hello-world image comes from the public registry called Docker Hub as mentioned before (which you can visit at https://hub.docker.com/r/library/hello-world/). 


#### Dockerfile example

Every image is composed of a dockerfile. An example dockerfile as for the hello-world example looks as following:
```
// source: https://github.com/docker-library/hello-world/blob/master/Dockerfile
FROM scratch
COPY hello /
CMD ["/hello"]
```

The dockerfile is a set of instructions which says to the Docker how to build a container image - we will create our own in a moment. Analogy for a docker file, can be the bash language that you can use on any Linux/Unix machine - of course it's different but general idea of giving writing instructions in order to make the job is similar.


#### Modifications to our codebase in order to make it

Currently we are sure that our Docker application's setup is working correctly.

First of all we need to make some modification to our current codebase as there are small tweaks to make it work properly.

Make sure that the following files have the content as below:

- The server/.env content has to be as following:

```
AWS_ACCESS_KEY_ID=<<___AWS_ACCESS_KEY_ID__>>
AWS_SECRET_ACCESS_KEY=<<___AWS_SECRET_ACCESS_KEY__>>
AWS_BUCKET_NAME=publishing-app
AWS_REGION_NAME=eu-central-1
MONGO_USER=<<___your_mlab_mongo_user__>>
MONGO_PASS=<<___your_mlab_mongo_pass__>>
MONGO_PORT=<<___your_mlab_mongo_port__>>
MONGO_ENV=publishingapp
MONGO_HOSTNAME=<<___your_mlab_mongo_hostname__>>
```
<InformationBox>
For now we will load the enviroment variables from a file, but later we will load them from the AWS's panel. It's not really production secure to keep all that secret data on the server. We use it now for sake of brevity and later we delete it in favor of a more secure approach.
</InformationBox>

Regarding the mongo's enviroment variables, we had learn that in the previous chapter about setting the mlab (get to back to the chapter if you miss any of the details required at this point).

- The server/index.js content has to be as following:

```
var env = require('node-env-file');
// Load any undefined ENV variables form a specified file. 
env(__dirname + '/.env');

require("babel-core/register");
require("babel-polyfill");
require('./server');
```

Make sure that you are loading the env from file at the same beggining of the server/index.js - it will be required in order to load the mLab's mongo details from the enviroment variables (server/.env).


- The server/configMongoose.js content has to be replaced from the old code:
```
// this is old code from our codebase:
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local',
};

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);
```

... and new version of the same improved code has to be as below:
```
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local',
};

let dbUser
if(process.env.MONGO_USER && process.env.MONGO_PASS) {
  dbUser = {user: process.env.MONGO_USER, pass: process.env.MONGO_PASS}
} else {
  dbUser = undefined; // on local dev not required
}

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`, dbUser);
```

As you can find, we have added abilility to connect with a specific DB's user. We need it because the localhost on which we were working didn't required any user, but when we are starting to use the mLab's MongoDB then specific our database's user is a must. Otherwise we won't be able to authenticate correctly.


From this point, you don't need to run "mongod" process in the background of your system, because the app will connect with the mLab's MongoDB node which you created in the previous chapter. The mLab's MongoDB (free version) is running 24/7, but if you plan to use it for production's ready apps then you shall update it and start using the replica set feature as well (which was mentioned in the previous chapter).


You can try to run the project with the command:
```
npm start
```

... then you shall be able to load the app:

![mlab test works](http://test.przeorski.pl/book/705_mlab_loaded_data2.png)


the important difference now is that all the CRUD operations (read/write via our Publishing App) are done on our remote's MongoDB (not on the local one).


After the Publishing App uses the mLab's MongoDB - we are ready for preparing our Docker's image and then deploy it on several instances of AWS EC2 with use of AWS Load Balances and EC2 Container Service.

#### Working on the Publishing App Docker's image

Before continuing you shall be able to run your project locally with use remote's mLab's MongoDB. It's required because we will start running our Publishing App in the Docker's container. Our app then will connect with a mongo's remotely. We won't run any MongoDB's process in any Docker container - this is why it's so important to use the mLab in any below's steps.


Let's create the Dockerfile so do following in a terminal/command line:

```
[[your are in the project main directory]]
$ touch Dockerfile
```

... after that it's the content of your new Dockerfile:

```
FROM centos:centos7

RUN yum update -y
RUN yum install -y tar wget
RUN wget -q https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-x64.tar.gz -O - | tar xzf - -C /opt/

RUN mv /opt/node-v* /opt/node
RUN ln -s /opt/node/bin/node /usr/bin/node
RUN ln -s /opt/node/bin/npm /usr/bin/npm

COPY . /opt/publishing-app/

WORKDIR /opt/publishing-app

RUN npm install
RUN yum clean all

EXPOSE 3000
CMD ["npm", "start"]
```

Let's explain step by step the Dockerfile that we are going to use in our Publishing App altogether with the Docker:

1) ***FROM centos:centos7*** - it is saying that we will use as a starting point Linux Centos 7 distribution from the https://hub.docker.com/r/_/centos/ Docker's public repository.

You can use any other package as a starting point as for example Linux Ubuntu, but we are using Centos7 because it's more lightweight and generally very good for web apps deployment. You can find more at https://www.centos.org/

<InformationBox>
Documentation of all commands are available at https://docs.docker.com/engine/reference/builder/
</InformationBox>

2) ***RUN yum update -y*** - we are updating packages from the command line with yum. Standard thing for any Linux setup.


3) ***RUN yum install -y tar wget*** - installing two packages as tar (for unpacking files) and wget (for downloading files)

4) ***RUN wget -q https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-x64.tar.gz -O - | tar xzf - -C /opt/**** - this commend downloads the node4.0.0 to our Centos' container and then unpack it and put all the files into the /opt/ directory.

5) ***RUN mv /opt/node-v* /opt/node*** - renaming the folder we have just download and unpacked (with node) to a simple "node" wihtout version naming.

6) ***RUN ln -s /opt/node/bin/node /usr/bin/node*** - we are linking the /opt/node/bin/node location with a link /usr/bin/node so we are able to use simple "$ node" command in the terminal. Standard stuff for Linux's users.

7) ***RUN ln -s /opt/node/bin/npm /usr/bin/npm*** - the same as with node, but with the npm. We are linking it in order to make the usage easier and linked to "$ npm" on our Linux Centos7.

8) ***COPY . /opt/publishing-app/*** - this copy all the files in the "context" (the dot sign "." is location when you start the container build - we will do it in a moment) and it copies all the files into the /opt/publishing-app/ location in our container.

In our case, we have created the Dockerfile in our Publishing App's directory so it will copy all the project files into the container to the given location at /opt/publishing-app/.

9) ***WORKDIR /opt/publishing-app*** - after we have our Publishing App's files in our Docker's container then we need to choose to the working directory. It's similar as "$ cd /opt/publishing-app" on any unix/linux machine.

10) ***RUN npm install*** - when we are in our working dir which is /opt/publishing-app then we run the standard ***npm install*** command

11) ***RUN yum clean all*** - we clean the yum cache

12) ***EXPOSE 3000*** - we define the port that is using our Publishing Application

13) ***CMD ["npm", "start"]*** - then we specify how to run the application in our Docker's container


#### Building the Publishing App container













