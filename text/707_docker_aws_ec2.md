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
PORT=80
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

EXPOSE 80
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

12) ***EXPOSE 80*** - we define the port that is using our Publishing Application

13) ***CMD ["npm", "start"]*** - then we specify how to run the application in our Docker's container


We shall also create in the main project's directory a .dockerignore file:
```
$ [[[in the main directory]]]
$ touch .dockerignore
```

... and the file content shall be as following:
```
.git
node_modules
.DS_Store
```

We don't want to copy over those above files (.DS_Store is specific for the OS X).


#### Building the Publishing App container

Currently you shall be able to build the Docker's container.

In the main directory of the project you need to run:
```
docker login
```

.. the login command will prompt you to insert your Docker's username and password. After you are authenticated correctly, you can run the build command:
```
docker build -t przeor/pub-app-docker .
```

<InformationBox>
Of course your username and the container name combination has to be yours. Replace it with your details.
</InformationBox>


That above command will build the container with use of Dockerfile commands. This is what you shall see (step1, step2 etc.):

![docker build container](http://test.przeorski.pl/book/706_build_docker_container2.png)

... and after a successfull build you shall see in your terminal/command line somethign similar to:
```
[[[striped from here for the sake of brevity]]]
Step 12 : EXPOSE 80
 ---> Running in 081e0359cbd5
 ---> ce0433b220a0
Removing intermediate container 081e0359cbd5
Step 13 : CMD npm start
 ---> Running in 581df04c8c81
 ---> 1970dde57fec
Removing intermediate container 581df04c8c81
Successfully built 1910dde57fec
```

As you can see above from the Docker's terminal about, we have built in a successful manner the container. Next step is to test it locally, then learn little bit more of Docker's basics and finally start working on our AWS deployment.

### Running the Publishing App container locally

In order to test if the cointainer has been built correctly, do the following steps - put in the bash/command line following:

```
$ docker-machine env
```
.. the above command shall give you the output similar to this:

```
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/przeor/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell: 
# eval $(docker-machine env)
```

We are looking for the DOCKER_HOST's ip - in our above case it's ***192.168.99.100***.

This Docker's host ip will be used to check if our application is running correctly in the container. Keep it noted.

Next step is to run our local container with the following command:

```
$ docker run -d -p 80:80  przeor/pub-app-docker npm start
```

Regarding flags:
a) -d flag equals detached so the process will run in the background. You can list all running docker's process with the following command:

```
docker ps
```

... and example output would be as below:

![docker build container](http://test.przeorski.pl/book/709_example_docker_ps2.png)

b) -p flag is telling that the container's port 80 bind to the port 80 on the docker ip host. So if we expose our node app on ports 80 in the container, then it will be able on a standard port 80 on the ip (in the examples it will be 192.168.99.100:80 which obviously the port 80 is for all http requests).

c) przeor/pub-app-docker - we tell the container's name that we want to run

d) "npm start" - we also need to tell what command we want to run by the Docker's container right after the start (otherwise container would run and stop immediately if we wouldn't specify the "npm start" command)

<InformationBox>
More references about the docker run are available at https://docs.docker.com/engine/reference/run/
</InformationBox>


The above command run shall run the app as on the screenshot below:

![docker build container](http://test.przeorski.pl/book/707_docker_works_locally2.png)

As you can see the ip address in the browser's url at is http://192.168.99.100 - it's our Docker host ip.


### Debugging a container

In case if the container doesn't work for you as on the screenshot above, then use the below commend to debug and find the reason:
```
docker run -i -t -p 80:80 przeor/pub-app-docker
```

This above command with -i -t -p flag will show you the all logs in the terminal/command line as on the screenshot below (just an example in order to show you potential ability to debug a Docker's container locally):

![docker build container](http://test.przeorski.pl/book/708_error_example_docker_debug_locally2.png)

### Pushing a Docker container to a remote repository

If a container works for you locally then it's almost ready for the AWS deployment.

Before pushing the container, let's add the .env file to the .dockerignore, because you have there all the sensitive data that you won't put into containers so into the .dockerignore file add:

```
.git
node_modules
.DS_Store
.env
```

... and after you will add the .env to the .gitignore, then we need to change the server/index.js file and add an additional if statement:
```
if(!process.env.PORT) {
  var env = require('node-env-file');
  // Load any undefined ENV variables form a specified file. 
  env(__dirname + '/.env');
}
```

This if statement checks if we run the app locally (with an .env file) or remotely on an AWS instance (then we pass the env variables in more secure manner).


... after you have added the ".env" file into the .dockerignore (and modified the server/index.js) then build the container that will be ready for the push:


```
docker build -t przeor/pub-app-docker .
```

Regarding the enviroment variables, we will add them via AWS advanced options - you will learn it later, but to explain you general idea how to add them when running it on the localhost then below you can find an example (fake data provided in the command's flag):

```
$ docker run -i -t -e PORT=80 -e AWS_ACCESS_KEY_ID='AKIMOCKED5JM4VUHA' -e AWS_SECRET_ACCESS_KEY='k3JxMOCKED0oRI6w3ZEmENE1I0l' -e AWS_BUCKET_NAME='publishing-app' -e AWS_REGION_NAME='eu-central-1' -e MONGO_USER='usermlab' -e MONGO_PASS='MOCKEDpassword' -e MONGO_PORT=25732 -e MONGO_ENV='publishingapp' -e MONGO_HOSTNAME='ds025761.mlab.com' -p 80:80 przeor/pub-app-docker npm start
```

<InformationBox>
Make sure that you have provided your correct AWS_REGION_NAME - mine is eu-central-1, but yours can be different.
<InformationBox>

As you can find everything from the server/.env file has been moved to the docker run's command in the bash temrinal:
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
PORT=80
```


As you can find out above, the -e flag is for an env variable. Then the last thing is to push the container to the remote repository hosted by the Docker Hub.

```
docker push przeor/pub-app-docker
```

.. and then you shall be able to find in your bash/command line something similar to:

![docker build container](http://test.przeorski.pl/book/710_push_docker_container2.png)

.. and the link to the pushed repo shall be similar to the one below:

![docker build container](http://test.przeorski.pl/book/711_push_docker_container_online2.png)

The above's screenshot has been made on the docker's pushed repository.


### A summary of usefull Docker commands

Usefull Docker's commands:

a) The following command will list all the images and docker rm can delete the repo from your local in case if you want to delete it:
```
docker images
docker rm CONTAINER-ID
```

<InformationBox>
You can use just first 3 letters/numbers from the CONTAINER-ID - you don't need to write down whole container's id. This is a convenience.
</InformationBox>

b) Next is used for stopping a running docker's container:
```
docker ps
docker stop CONTAINER-ID
```

c) You can use version's tag of your containers with the following approach:
```
docker tag przeor/pub-app-docker:latest przeor/pub-app-docker:0.1
docker images
```

After you will do the dockers images, then you can notice that you have two containers - one with a tag latest and second 0.1. This is a way to track changes because if you will push the container the tag will be also listed on the Docker Hub.


d) Check your container local ip:
```
$ docker-machine env
```

e) Build your container from the Dockerfile:
```
docker build -t przeor/pub-app-docker .
```

f) Run your container in the "detached" mode:
```
$ docker run -d -p 80:80 przeor/pub-app-docker npm start
```

g) Run your container in order to debug without detaching it so you can find what is going on in the container's bash terminal:
```
docker run -i -t -p 80:80 przeor/pub-app-docker
```



### Introduction to Docker on AWS EC2

Two chapters ago we have implemented Amazon AWS S3 for static images upload. You already shall have an AWS account so you are ready for next steps in order to make our deployment on AWS.

In general, you can use the steps with free AWS triers, but we will use paid in this tutorial. Please read the AWS EC2's pricing before starting this sub-chapter of how to deploy Docker's conainer on the AWS.

Amazon Web Services have also a great Docker's containers support with their services called EC2 Conainer Service (ECS). 

If you bought that book probably you haven't been using the AWS so far - because of that reason, we will first deploy Docker manually on the EC2 in order to show you how the EC2 instances are working so you can get more knowledge from the book.

Our main goal is to make the deployment of our Docker's containers automatically, but for now we will start with manual approach. If you already have used the EC2 you can skip next sub-chapter and go straightly to the EC2 Container Services.

### Manual approach: Docker on EC2 

We were running our Docker's container on local with the following command (few pages before):

```
$ docker run -d -p 80:80  przeor/pub-app-docker npm start
```

... we will do the same thing, but not locally but on the EC2 instance, 100% manually (for now, later we will do it 100% automatically with the AWS ECS). 


Before we will continue let's explain what is EC2? It's a scalable computing capacity located in the Amazon Web Services cloud. In EC2 you don't need to invest money upfront in buying any hardware. Everything you pay is for the time of using an EC2 instance/s. This allows you to deploy applications faster. Very quickly you can add new virtual servers (when there is bigger web-traffic demand). There are some mechanism to scale automatically the amount of EC2 instances with use of AWS CloudWatch. Amazon EC2 gives you ability to scale up or down to handle changed requirements (like spikes in popularity) - that feature reduces your need to forecast traffic (and saves you time and money).

For now, we will use only one EC2 instance (later in the book more EC2 instances with Load Balancer and EC2 Containers Services). 


#### Basics: launching an EC2 instance

We will launch an EC2 instance, then login to it via SSH (you can use Putty on Windows OS).

Log into the AWS Console:
```
https://eu-central-1.console.aws.amazon.com/console/home
```

 and click the EC2 link:

```
https://eu-central-1.console.aws.amazon.com/ec2/v2/home
```

Then click the blue button "Launch Instance" on:

![EC2 launch instance](http://test.przeorski.pl/book/712_launch_ec2_instance_button.png)

.. and the button look:

![EC2 launch instance button](http://test.przeorski.pl/book/713_button_launch.png)

After you click the button, then you will be redirected to the AMI page - that acronym stands for Amazon Machine Image.

![EC2 ami](http://test.przeorski.pl/book/714_ami.png)

The AMI is a list of images, that you can run an EC2 instance with. Each image has some pre-installed list of software. Like for example, the most standard image as: 

![EC2 ami](http://test.przeorski.pl/book/715_ami_example.png)

.. has pre-installed softwares as:
```
The Amazon Linux AMI is an EBS-backed, AWS-supported image. The default image includes AWS command line tools, Python, Ruby, Perl, and Java. The repositories include Docker, PHP, MySQL, PostgreSQL, and other packages.
```

On the same page you can also find other AMIs to buy on the marketplace or created and shared by the community for free. You can also filter the images so it will list only free tier:

![EC2 ami](http://test.przeorski.pl/book/716_other_options.png)


For the sake of making this step-by-step guide simple, let's choose the image that is on the screenshot above so it's name has to be similar to:
```
Amazon Linux AMI 2016.03.3 (HVM), SSD Volume Type
```

<InformationBox>
The name of the image may slighly vary, don't worry about it.
</InformationBox>

Click the blue "Select" button. Then you will be rediected to the ***"Step 2: Choose an Instance Type"*** page as on the screenshot below:

![EC2 choose_instance_type](http://test.przeorski.pl/book/717_choose_instance_type.png)

... and from that page select the following:

![EC2 718_choosen instance_type](http://test.przeorski.pl/book/718_choosen.png)

... and then click the next button:
![EC2 next_button](http://test.przeorski.pl/book/719_next_button.png)


Simplest, keep the default options on:
```
1. Choose AMI 
2. Choose Instance Type
3. Configure Instance (keep them default)
4. Add Storage (keep them default)
5. Tag Instance (keep them default)
6. Configure Security Group (we will make some changed on that tab)
7. Review
```

Generally, click the next button as this above until we will get to the:
```
6. Configure Security
```

... an indicator of navigation you can find at the top as this example below:

![EC2 indicator_next_page](http://test.przeorski.pl/book/720_indicator_next_page.png)


Our goal for now is to get to the security configuration page because we need to customize slightly allowed ports.

A security group consists of rules control network traffic for the EC2 instance (ala firewall options). 

For the security give a new name as "ssh-and-http-security-group":

![EC2 security group options](http://test.przeorski.pl/book/721_security_group_options.png)

As you can find above you need also click the "Add Rule" button and add new one called "http". This will allow our new EC2 instance to be available via port 80 for all the IPs.

After you added the name and the HTTP port 80 to as the new rule, then you can click "Review and Launch" button:

![EC2 review and launch button](http://test.przeorski.pl/book/722_review_and_launch.png)

... then after you are happy with reviewing the instance click the blue button called "launch" on that view:

![EC2 review instance](http://test.przeorski.pl/book/723_review.png)

After you will click the "launch" button, then you shall see a modal which will say "Select an exisitng key pair or create a new key pair":

![EC2 key pair](http://test.przeorski.pl/book/724_key_pair.png)

.. generally, you need to create a new key pair - give it a name "pubapp-ec2-key-pair" and then click the download button as on the screenshot below:
![EC2 create new key pair](http://test.przeorski.pl/book/725_create_new_key_pair.png)

After you have downloaded the "pubapp-ec2-key-pair" then you will be able to click the blue button "launch". Next you shall see the following:

![EC2 launched](http://test.przeorski.pl/book/726_click_view_launch_log.png)

From that screen you can go directly to the EC2 launch logs (click the "view launch log" link) so you will be able to find your instance listed as on the example below:

![EC2 launch_log](http://test.przeorski.pl/book/727_launch_log.png)

Great - your first EC2 has been launched successfully! We need to login to it and set up the Docker's container from there.

Save the public ip on of your EC2 instance, as in the above launch log you can find that the machine that we've just created has public ip:
```
52.29.107.244
```

Your ip will be different (of course, it's just example). Save it somewhere we will use it in a moment, you’ll need it to login via SSH to the server and install Docker app.

#### SSH access via PuTTy (windows users only)

If you don't work on Windows, then you can skip this sub-chapter.


Ureferably use PuTTy that is available to download at http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html (putty.exe, pageant.exe and puttygen.exe)


Downloaded key pairs for the EC2 instance, convert to the ppk with use of puttygen.exe:



![putty1](http://test.przeorski.pl/book/728_putty1.png)


Click the "load" button and choose the "pubapp-ec2-key-pair.pem" file, then covert it to ppk.

Then you need to click "save private key" button. You are done - you can close the puttygen.exe and open the pageant.exe - in that pageant do following:

a) choose Add Key

b) then check if you key has been added correctly to the Pageant Key List. 

If you private key is on the list, then you are ready to use the putty.exe

![putty2](http://test.przeorski.pl/book/729_putty2.png)

If you have opened the PuTTy program, then we need to login via ssh by typing our EC2 instance ip and by clicking the "open" button - as on the screenshot above.

PuTTy allows using SSH connections on Windows.

### Connecting to the EC2 instance via SSH

After we have launched the EC2 instance, we have found out our public ip in one of the previous sub-chapter:
```
52.29.107.244
```

We need to connect to the remote EC2 instance with this public ip.

I've saved the "pubapp-ec2-key-pair.pem" in my "Downloads" directory, so go to the directory where you have downloaded your .pem file:
```
$ cd ~/Downloads/
$ chmod 400 pubapp-ec2-key-pair.pem
$ ssh -i pubapp-ec2-key-pair.pem ec2-user@52.29.107.244
```

<InformationBox>
In your PuTTy on Windows, it will look similar after this step. You need to provide into the PuTTy box the ip and ports in order to correctly login into the machine. Whne you get a prompt to type a username then use "ec2-user" as on the ssh example above.
</InformationBox>


After a successful login you will be able to see:

![ec2 instance inside](http://test.przeorski.pl/book/730_inside_ec2_instance.png)


The instruction below is for all OS users (OSX, Linux and Windows) as we are logged into the EC2 instance via SSH. The following command are required next:
```
[ec2-user@ip-172-31-26-81 ~]$ sudo yum update -y
[ec2-user@ip-172-31-26-81 ~]$ sudo yum install -y docker
[ec2-user@ip-172-31-26-81 ~]$ sudo service docker start
```

Above terminal commands will update  the Yum package manager, install and start the docker's service in the background.

```
[ec2-user@ip-172-31-26-81 ~]$ sudo usermod -a -G docker ec2-user
[ec2-user@ip-172-31-26-81 ~]$ exit

> ssh -i pubapp-ec2-key-pair.pem ec2-user@52.29.107.244

[ec2-user@ip-172-31-26-81 ~]$ docker info
```

After you run the ***docker info*** command then it shall show something similar to the below's output:

![ec2 docker info instance inside](http://test.przeorski.pl/book/731_docker_info_ec2_instance.png)

If you see the above, then everything is alright and we can continue with running the publishing app docker's container with the following command:

```
[ec2-user@ip-172-31-26-81 ~]$ docker run -i -t -e PORT=80 -e AWS_ACCESS_KEY_ID='AKIMOCKED5JM4VUHA' -e AWS_SECRET_ACCESS_KEY='k3JxMOCKED0oRI6w3ZEmENE1I0l' -e AWS_BUCKET_NAME='publishing-app' -e AWS_REGION_NAME='eu-central-1' -e MONGO_USER='usermlab' -e MONGO_PASS='MOCKEDpassword' -e MONGO_PORT=25732 -e MONGO_ENV='publishingapp' -e MONGO_HOSTNAME='ds025761.mlab.com' -p 80:80 przeor/pub-app-docker npm start
```

<InformationBox>
Reminder: make sure that you have provided your correct AWS_REGION_NAME - mine is eu-central-1, but yours can be different.
<InformationBox>

As you can find everything from the server/.env file has been moved to the docker run's command in the bash temrinal:
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
PORT=80
```

Also make sure to rename the AWS_BUCKET_NAME, AWS_REGION_NAME or MONGO_ENV if you have your different one (if you set differently than was suggested in the previous chapters).


... then in order to check if everything went well you can also do the following:

```
[ec2-user@ip-172-31-26-81 ~]$ docker ps
```
That command will show you if the docker's process runs correctly in the background as a detached container.

And after 10-30 seconds after the npm start will run the whole project then you can test:

```
[ec2-user@ip-172-31-26-81 ~]$ curl http://localhost
```

.. and after the application has been bootstraped correctly you can see the similar output to:


![ec2 localhost curl test](http://test.przeorski.pl/book/732_localhost_curl_test.png)

... and of course after you visit the EC2 instance public ip (in our example it is 52.29.107.244) then you will be able to find our Publishing App available online as we have set up the Security Group of our EC2 instance with exposed port 80 to the world . A screenshot below:

![ec2 works in the browser](http://test.przeorski.pl/book/733_browser_test_via_http.png)

If you see our Publishing App under the public ip, then you have just deployed a Docker Container on Amazon AWS EC2 successfully! 

The process we have just went through is very unefficient and manual, but shows exactly what is going on under the hood when we will starting using the EC2 Conainer Service (in short ECS).

We are missing in our current approach:

a) Integration with other Amazon services as load balancing, monitoring, alerting, crash recovery, route 53 etc.

b) Automation as currently we are unable efficiently to deploy 10 Docker Containers quickly. This is also important if you want to deploy different Docker's containers for different services as for example you can have separate conainer for serving front-end, different container for serving backend and even separate one for your database (in our case we use mLab, so we don't need one here).

As you can find out, you've just learned basics of the Amazon Web Services.

#### Basics of EC2 Conainer Service (AWS EC2)

The EC2 Conainer Service helps you to create a cluster of Docker Container's instances (many copies of the same container on several EC2 instances). Each container is deployed automatically - that means that you don't need to login to any of the EC2 instances via SSH as we done it in the previous sub-chapter (manual approach). Whole job is done by the AWS and Docker software which you will learn to use in further (more automated approach). 

For example you set that you want to have 5 different EC2 instances: the group of EC2 instances expose port 80 so you are able to find the Publishing Application under the http://[[EC2_PUBLIC_IP]] address. Additionally, we are adding a load balancer between all the EC2 instances and the rest of the world so in case if there is any spike of traffic or any of the EC2 instance will break then the load balancer will replace a broken EC2 instance with a new one or scale down/up amount of EC2 instances based on the traffic.

Great feature of the AWS load balancer is that it pings each EC2 instance with port 80 and if the pinged instance doesn't respond with correct code (200) then it terminates the broken instance and turn on a fresh new instance with the Docker Container that has the image of our Publishing App. That helps us to maintain top availability of our application.

Additionally we will use Amazon Route 53 in order to have a highly available and scalable cloud Domain Name System (DNS) web service so we will be able to set up a top level domain - in our case, we will use a domain that we have bought specially for that book:
```
http://reactjs.space
```

That will be our http address, of course if you build other service you need to buy a yourown domain in order to follow the instructions and learning how the Amazon Route 53 does work.


#### Creating an ECS cluster

Visit the AWS Console and find there ECS, click on the link to go to the EC2 Container Service Console. Then you shall find a blue button "Get Started":

![ecs get started button](http://test.przeorski.pl/book/734_ECS_get_started_button.png)

After that you shall see an ECS wizard with the following steps:
```
Step 1: Create a task definition
Step 2: Configure service
Step 3: Configure cluster
Step 4: Review
```


#### Step 1: Create a task definition

On ECS a task definition is a recipe for a container. It's something that helps for an ECS to understand what Docker's container you want to run on the EC2 instances. 

It's a recipe or a blueprint of steps that the ECS has automatically done in order to successfully our Publishing App's container.

Use the following details for this step:
![ecs task definition](http://test.przeorski.pl/book/735_task_definition2.png)

On the above's screenshot you can find that our task definition name is "pubapp-task". Container name is "pubapp-container". 

For Image we use the same argument as when we were running a container locally with ***docker run*** - in the case przeor/pub-app-docker. The ECS will know that has to download the container from the above's url:
```
https://hub.docker.com/r/przeor/pub-app-docker/
```

For now let's keep the maximum memory as a default value (300). Port mappings 80:80.

<InformationBox>
At the time of writing that book, there are some problems if your container doesn't expose port 80 ... probably a bug with ECS' wizard - without wizard all ports can be used on the container.
</InformationBox>

Click the "advanced options" on the task definition view:

![advanced button ecs](http://test.przeorski.pl/book/736_advanced_options_button.png)

... and you will see a slide panel with additional options:

![ecs task definition advanced](http://test.przeorski.pl/book/737_advanced.png)

We need to specify following things:

a) Command - it has to be separated with commas, so we put "npm,start"

b) Working directory - we use /opt/publishing-app (identical path is set in the Dockerfile)

c) Env variables - here we specify all values from the server/.env file. This part is important to setup otherwise the app won't work correctly without correct details provided via enviroment variables.

d) Rest of the values/inputs there keep as a default without changes.

<InformationBox>
It's very important to add all enviroment variables - we need to be very careful as it's easy to make a mistake here which will break the app inside an EC2 instance.
</InformationBox>

After all those changes you can click next button.

#### Step 2: Configure service

Generally, service is a mechanism which keeps certain amount of EC2 instances running while checking their health at the same time (by the ELB) so if any server doesn't repsond on the port 80 (default but can be changed to more advanced health checks) then the service runs a new service while the unhealthy one is being shut down. This helps you to maintain very high availavility in your application.

![ecs configure_service](http://test.przeorski.pl/book/739_configure_service.png)

Service name is "pubapp-service". In the book we will set up 3 different EC2 instances (you can setup less or more, it's up to you) so this is the number for the "desired number of tasks" input.

On the same step, we have also to setup the ELB (elasting load balancer):


![ecs configure_service](http://test.przeorski.pl/book/740_elastic_load_balancing.png)

a) Container name:port - we choose from the dropdown list pubapp-container:80

b) ELB listener protocol - HTTP

c) ELB listener port - 80

d) ELB healt check - default, you can change it while you are out of the wizard (on the certain ELB's page)

e) The wizard will create for us Service IAM role.

After all that you can click the "next step" button to continue.

![ecs configure_service](http://test.przeorski.pl/book/741_next_step.png)

#### Step 3: Configure cluster

Here you setup the ECS container agent details - called cluster. Here you specify the name of your cluster, what kind of instances type would you like to use, number of instances (it has to be bigger than the amount of or required by the service) and the key pair.

![ecs configure_cluster](http://test.przeorski.pl/book/742_configure_cluster.png)

a) Our cluster name is pubapp-ecs-cluster

b) Instances types - t2.micro (on production I suppose to use bigger)

c) Number of instances - 5 and that means that in the service will keep 3 instances alive and another two instances are on the "bench" waiting for any fatal situation. By "bench" I mean that at the one time (with our setup) we use only three instances, where at the same time another two are ready for use, but not actively used (traffic is not redirected to them).

d) Key pair - we specified that key pair called "pubapp-ec2-key-pair" earlier in that chapter. Alway, you shall keep them in a safe place for later re-use

On the same page you shall find also security group and container instance IAM roles setup, but we keep it as default this time:

![ecs security group](http://test.przeorski.pl/book/743_security_group_iam.png)

#### Step 4: Review

The last thing is to review if everything looks good:

![ecs review wizard](http://test.przeorski.pl/book/744_review_ecs.png)

... and then choose "Launch instances and run service":

![ecs review wizard button](http://test.przeorski.pl/book/745_launch_instance_and_run_service.png)

#### Launch status

After you have clicked the launch button, then you will find a page with status - keep it open until you will get all the boxes red with success indicator:

![ecs progress1](http://test.przeorski.pl/book/746_running_in_progress1.png)

.. and:

![ecs progress2](http://test.przeorski.pl/book/747_running_in_progress2.png)

After all that boxes will have a success indicator (green color) then you will be able to click the "view service" button that is on the top:

![ecs view service](http://test.przeorski.pl/book/748_view_service.png)

Click that button above ("view service") after it becomes available.

#### Finding your load balancer address

After you click the "view service" you shall see the main dashboard where are listed all your clusters (currently there shall be only one):

![ecs main dashboard](http://test.przeorski.pl/book/749_clusters_main_dashboard.png)

Click on the pubapp-ecs-cluster and then you shall see:

![ecs pubapp_ecs_cluster](http://test.przeorski.pl/book/750_pubapp_ecs_cluster.png)

On the above screen click the pubapp-service from the list:
![ecs click_pubapp-service](http://test.przeorski.pl/book/751_click_pubapp-service.png)

...  and then you will see:

![ecs pubapp_service_mainpage](http://test.przeorski.pl/book/752_pubapp_service_mainpage.png)

On the above link choose the elastic balancer:
![ecs pubapp_service_mainpage](http://test.przeorski.pl/book/753_click_on_the_ELB_name.png)

And the final view of ELB is:
![ecs pubapp_ELB](http://test.przeorski.pl/book/754_pubapp_ELB.png)

On the above's view you shall find (under the "Description Name" tab) an elastic balancer address like this one:
```
DNS name:	
EC2Contai-EcsElast-1E4Y3WOGMV6S4-39378274.eu-central-1.elb.amazonaws.com (A Record)
```

<InformationBox>
If you will try to open the address and it won't work then give it more time. The EC2 instances may be in progress in terms of running our Docker's Publishing App container. We must be patient on the initial run of our ECS cluster.
</InformationBox>

This is address of your ELB which you can put into the browser and see the Publishing App:
![ecs elastic_pub_app_working](http://test.przeorski.pl/book/755_elastic_pub_app_working.png)


#### AWS Router 53




PLAN:
1) opisac zdjecia po kolei
2) zrobic zdjecie jak znalezc adres load balancera
3) screenshoty z dzialajacaej strony dodac (na pulpicie)
4) zaczac opisywac route 53



```
EC2 instance status - 0 of 15 complete 
Your EC2 instances and other cluster resources are being created. This may take a few minutes.

CloudFormation stack pending
Internet gateway pending
VPC pending
Route table pending
VPC attached gateway pending
ELB security group pending
Public routing pending
ECS security group pending
Auto Scaling group pending
Launch configuration pending
Elastic load balancer pending
```



-------------




6) start the AWS setup from the scratch with use of:
http://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/


Your Amazon ECS service can optionally be configured to use Service Auto Scaling to adjust its desired count up or down in response to CloudWatch alarms:






Use CloudWatch for scaling: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html


AUTOSCALING - accept terms of service!



$ docker run -i -t -e PORT=80 -e AWS_ACCESS_KEY_ID='AKIAI3Y54WVG5JM4VUHA' -e AWS_SECRET_ACCESS_KEY='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' -e AWS_BUCKET_NAME='publishing-app' -e AWS_REGION_NAME='eu-central-1' -e MONGO_USER='usermlab' -e MONGO_PASS='pwdmlab' -e MONGO_PORT=25762 -e MONGO_ENV='publishingapp' -e MONGO_HOSTNAME='ds025762.mlab.com' -p 80:80 przeor/pub-app-docker npm start





AWS_ACCESS_KEY_ID=AKIAI3Y54WVG5JM4VUHA
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=publishing-app
AWS_REGION_NAME=eu-central-1
MONGO_USER=usermlab
MONGO_PASS=pwdmlab
MONGO_PORT=25762
MONGO_ENV=publishingapp
MONGO_HOSTNAME=ds025762.mlab.com
PORT=80

