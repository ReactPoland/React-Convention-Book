#### Docker and EC2


We have done the all stuff related to the database-as-a-backend with mLab. It's time to prepare our Docker container.

What is Docker? It's a very useful piece of software which is open source and helps you to pack, ship and run any app as a light (in comparision to a virtual machine for example) container. 

A container's goals  are similar to the Virtual Machines - the big difference is that the Docker was created with software development on the mind in comparision to VMs. You need also be aware that a full virtualized system has it's own resources allocated to it which causes minimal resources sharing which is different for the Docker's containers. Of course in the VMs you get more isolation, but the cost is that the VMs are much heavier (requires more disk space, RAM and other resources). Docker's container are lightweight and are able to share more things between different containers in comparision to VMs.

The good part is that the Docker's containers are hardware and platform independent so all worries about what you are working will run everywhere are disappearing.

General Docker's benefits are that it increases developers' productivity, helps them to ship more software faster, help to move the software from local development machines to production deployments on AWS etc. Docker's allow also versioning (similar to GIT) of your software which can be helpful when you need a quick rollback on the production's server etc.


#### Docker's installation

Installation of the Docker is quite easy. Please visit the official installation page at https://docs.docker.com/engine/installation/ because it will guide you best depending on your operating system. There are easy to follow installers for iOS and Windows and a lot of instructions for different Linux's distributions.


After you have installed the Docker and your system, run the it (with use of Docker Quickstart Terminal for example) and then type in your terminal:

```
$ docker info
```

After you run that commend then you shall be able to see something similar to the below's screenshot:

![docker info in terminal](http://test.przeorski.pl/book/701_docker_info.png)


Your installation is successful - let's continue.

#### Creating Docker's image






