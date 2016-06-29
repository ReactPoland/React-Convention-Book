#### Docker and EC2


We have done the all stuff related to the database-as-a-backend with mLab. It's time to prepare our Docker container.

What is Docker? It's a very useful piece of software which is open source and helps you to pack, ship and run any app as a light (in comparision to a virtual machine for example) container. 

A container's goals  are similar to the Virtual Machines - the big difference is that the Docker was created with software development on the mind in comparision to VMs. You need also be aware that a full virtualized system has it's own resources allocated to it which causes minimal resources sharing which is different for the Docker's containers. Of course in the VMs you get more isolation, but the cost is that the VMs are much heavier (requires more disk space, RAM and other resources). Docker's container are lightweight and are able to share more things between different containers in comparision to VMs.

The good part is that the Docker's containers are hardware and platform independent so all worries about what you are working will run everywhere are disappearing.

General Docker's benefits are that it increases developers' productivity, helps them to ship more software faster, help to move the software from local development machines to production deployments on AWS etc. Docker's allow also versioning (similar to GIT) of your software which can be helpful when you need a quick rollback on the production's server etc.


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


#### Creating Docker's image

Currently we are sure that our Docker setup is working correctly, let's start with setting the image.





1dcae25ab9f1

przeor@Kamils-MacBook-Pro docker $ docker-machine env
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/przeor/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell: 
# eval $(docker-machine env)
przeor@Kamils-MacBook-Pro docker $ 









