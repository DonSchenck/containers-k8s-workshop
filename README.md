# Containers and Kubernetes Workshop
## for Code On The Beach 2018

### About this workshop  
This workshop will guide the participant to use Linux-based containers to build and run applications. In addition, managing a containerized system using Kubernetes will be introduced.

## Table of Contents
1. [Installing The Prerequisites](#installing-the-prerequisites)
2. [Using Docker Hub](#using-docker-hub)
3. [Running Hello World](#running-hello-world)
4. [Building Your First Image](#building-your-first-image)
5. [Building A Small Web Site](building-a-small-website)
6. [Building A Web Service](building-a-web-service)
7. [Using Environment Variables](using-environment-variables)
8. [Running MS SQL Server In A Container](#running-ms-sql-server-in-a-container)
9. [Running Your Apps Using Kubernetes](#running-your-apps-using-kubernetes)
10. [Scaling With Kubernetes](#scaling-with-kubernetes)

## Installing The Prerequisites
You will need to make sure the following prerequisites are available on your machine:
* docker host and command line utility
* docker host
* Kubernetes command line utility
* Language compiler of your choice -- Node.js and .NET are included in this tutorial.
* Program Editor of your choice
* minishift  

In addition, a reliable internet connection is required. As always, the faster the better. Installation instructions are based on the operating system you will be using:

[Red Hat Enterprise Linux](#red-hat-enterprise-linux)  
[MacOS](#macos)  
[Windows Install Instructions](#windows-install-instructions)  

## Windows Install Instructions
W-0: Open PowerShell and run as administrator

### W-1: Install [chocolatey](https://chocolatey.org)
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

### W-2: Install docker for Windows
```powershell
choco install docker-for-windows
```

### W-3: Install the Kubernetes command line interface
```powershell
choco install kubernetes-cli
```

### W-4: Install language compiler  
#### Node.js
```powershell
choco install nodejs
```

#### .NET
```powershell
choco install dotnet
```

### W-5: Install virtualbox
```powershell
choco install virtualbox
```

### W-6: Install minishift
```powershell
choco install minishift
```

### W-7: Install git
```powershell
choco install git
```
You may need to log out and back in for git to work.


### W-8: Clone the workshop repository
```powershell
git clone https://github.com/donschenck/containers-k8s-workshop.git
```
Note the directory created; this is your workshop home directory. It will be referred to as $WORKSHOP_HOME in the following text.

## Workshop directory
In order to execute the code mentioned in this workshop, you must be in the directory `$WORKSHOP_HOME\src\nodejs` under your home directory for the repository. 


## Using Docker Hub
Docker Hub is an online registry where you can fetch and store images. You can create an account at [hub.docker.com](hub.docker.com) and then use that account to *pull* and *push* images.

Note that the user id is case-sensitive.

Docker Hub is where you will most likely find official images. For example, the official image for MySQL is stored here.

This is also where documentation for an image *should* be found.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>  
Find the MySQL image on Docker Hub.

## Running Hello World
You can run images in a container even if the image is not in your local registry. Note that "local" refers to your docker host, which does not necessarily need to be your PC. You might, for example, be using a host at a remote location such as a server, on Azure, etc.

If the image is not in your registry, docker will automagically attempt to pull the image from docker hub.

To see an example of this, run an image without first "pulling" it.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Run the official docker hello-world image:  

```bash
docker run hello-world
```
Example output:  

```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
9db2ca6ccae0: Pull complete 
Digest: sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/
```
<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
As suggested in the above output, run an Ubuntu container on your machine. It's literally that simple to get a Linux container running.

```bash
docker run -it ubuntu bash
```

## Building Your First Image
### What is an image?
An image is a package of bits that are executable by a container runtime. An image is immutable -- it cannot be changed -- and is inactive until it is executed. When it is run, it runs in (or becomes, from the standpoint of conversation) a "container". An image is at rest; it becomes a container when it's running. An analogy would be a class that, once instantiated, becomes an object. An image can be saved, loaded, stored, etc.

An image is a part of what is known as "Immutable Infrastructure", the idea that you replace parts of your system rather than change them. This is a key aspect of microservices.

Images are namespaced and versioned by use of a tagging system. For example, a "Hello World" application might be stored in your own registry, with a version tag such as this: `donschenck/helloworld:v2.0`. The namespace is "donschenck", the image name is "helloworld", and the tag is "v2.0". The tag can be any string you chose, and if excluded defaults to "latest".

Tagging is very important, is it allows you to have multiple versions of the same image. This is especially important when you are using Kubernetes and may have different versions running at the same time.  

### How an image is built
Building an image requires three parts:
1. The code that you wish to execute.
2. A build engine such as docker.
3. A file to direct the build process, such as a Dockerfile.

For this workshop, we'll be using `docker build` and a Dockerfile.

Images are built in layers. Further, it is the default behaviour to cache the layers. This is important to consider, as it is often wise to build in a sequence from most-stable to least-stable layers. That way, if you need to rebuild one part (e.g. you changed your code and want to build a new version), it won't be necessary to reload all of the layers.

The beginning layer itself is an image that typically contains multiple layers. For example, if you want to build an image that runs an Nginx web site, you may wish to start with the image `nginx:1.15.1`, which itself is built using the Debian Linux distribution. In this example, you don't have control over the operating system -- nginx chose Debian.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Find the image `nginx:1.15.1` on docker hub and locate the documentation that indicates that Debian is the Linux distro being used. Hint: The Dockerfile is where it is specified.


You could, however, start with `registry.access.redhat.com/rhel`, which would be the latest version of Red Hat Enterprise Linux (RHEL). In this case, you would then need to install nginx on top of RHEL, as well as any other necessary prerequisites.

[Note: In order to use a Red Hat image, you must build your image on a RHEL-based machine or VM and will need a Red Hat subscription.]

<hr>  

##### Sidenote: Get your zero-cost copy of Red Hat Enterprise Linux  
If you'd like a zero-cost developer copy of Red Hat Enterprise Linux, and access to a number of cheat sheets, books, developement tools, and more, simply create an account at developer.redhat.com. It's free and takes only seconds to sign up with your email and a password.  

<hr>  


You can even build your own intermediate images. For example, instead building your end-to-end RHEL-nginx-your-website image, you could build an image with RHEL and nginx -- let's call it "myrhelnginx:v1", and then use *that* image as the starting point for all of your nginx website images.

### Dockerfile
The Dockerfile is a list of settings and instructions that are used to direct the `docker build` process.

Here's a Dockerfile to build a web site image. This example uses Node.js. Note that this is *not* representative of a production-ready image; this is purposely kept simple, using a developer-based command (`npm start`). You will find that some production-ready Dockerfiles can get quite complex:

```
FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
```
The commands are run when the image is being built, *with the exception of* the `CMD` command. The `CMD` command is what is executed when you start the image in a container (i.e. `docker run...`).

#### Dockerfile Contents Explained  

`FROM` is the base or starting image for the image to be built. In this case, we're starting with a Linux machine with Node version 8 already installed. For the purposes of this example, we aren't particularlly concerned with which distribution of Linux is being used. If we check the information for this image on Docker Hub, we can find that it's using Debian Linux.  

If we wanted to enforce the version of Linux -- say, to use RHEL -- we'd need to start with that (RHEL) as our base image and then install node (and all necessary prerequisites) to get to a level of Red Hat Enterprise Linux running Node version 8.  

As you can see, there are options and tradeoffs when choosing your starting (FROM) image.

`WORKDIR` is simply the directory in which you'll be working during this build. In our example, the next command (`COPY`) will consider that value of the previous `WORKDIR` command.

`COPY` will, as you probably can guess, copy files from your host to the image.

`RUN` will run the specified command inside the image *at build time*. That is, it is only executed during `docker build`, and *not* during `docker run`.

`EXPOSE` exposes the port number specified so it can be accessed from outside the container during runtime. For example, if your nginx web site monitors port 8080 for traffic, then it must be exposed. Note -- as noted later in this tutorial -- the exposed port does not need to be the port used at runtime; you have the option of mapping an image's runtime port to a container's runtime port.

`CMD` is what is carried out when you run the image in a container, i.e. `docker run`.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Move into the directory `$WORKSHOP_HOME\src\nodejs\web`. Using the editor of your choice, create the appropriate Dockerfile in the directory of your application. Bonus: Add the MAINTAINER instruction.

```
docker ps
```
``` 
docker ps -a
```
```
docker run -d -p 3000:3000 web
```
Open `localhost:3000` in your browser. Why isn't it working?
Get the container name:
```
docker ps
```
```
docker logs {container_name}
```
It's not working because the code is monitoring the port on "localhost", and localhost is the Linux container, NOT the host (i.e. your PC). You *could* change the source code to monitor address 0.0.0.0 (or *), build a new docker image, and run the new image.

Node: Alter the file bin/www
C#: Alter the file Program.cs

OR

Start docker with environment variable(s) set:
```
docker run -d -p 3000:3000 -e HOST='0.0.0.0' --name web webtest
```


Did you get an error similar to the following?
```
Error response from daemon: driver failed programming external connectivity on endpoint wizardly_meitner (edb5effff25f5454e96c533b29b7927b20f27899cd54773f032a474b36d95551): Bind for 0.0.0.0:3000 failed: port is already allocated
Error: failed to start containers: wizardly_meitner
```
This is because your previously-started container (from your previous `docker run...`) is still running. Use the commmand ```docker ps``` to see all your running containers, locate your previous container, and use the ```docker stop``` command to stop execution.
```
docker stop {container_name}
```
docker run -d -p 3000:3000 --name myweb web
docker run -d -p 3000:3000 --name myweb --rm web

### docker build
The `docker build` command will use a Dockerfile to create an images. The following is an example of a `docker build` command.

In this example, the tag is "myimagename". Because any versioning is not specified, this will be built as "myimagename:latest".

```
docker build -t myimagename .
```
The final part of the command, the period (".") tells the command to use the Dockerfile found in the current directory. It is common, although not necessary, to have the Dockerfile in the home directory of your project. You may have very good reasons to have multiple Dockerfiles, in which case you would specify the Dockerfile by using the `-f` flag:
```
docker build -t myimagename -f Dockerfile2
```
The `docker build`, as you might imagine, is very powerful with many options. For this workshop, we'll keep it simple, but if you want to learn more, see [the docker build documentation](https://docs.docker.com/engine/reference/commandline/build/).

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Go ahead and build your image. Give it any name you wish. Check to see that it is built (using the `docker images` command), and note the size of the image.

```
docker build -t myimagename .
docker images
```


## Building A Small Web Site
### Compiling the code
### Creating the image
### Running the image
```
docker run web
```
Use your browser to visit `localhost:3000`. Notice that it does not work. In the Dockerfile, we exposed port 3000 -- which is used by the program -- but the `docker run` command hasn't mapped the port 3000 of the container to a port on the host. This is done using the `-p` flag with the `docker run` command. Note that you do *not* need to use the "host part" of the `-p` flag, but in that case, docker will assign a port number. In fact, let's try it.

First, stop the running container by using one of the following:  
* Press Ctrl-C at the terminal session (you may need press it multiple times)
* Open a second terminal session, run `docker ps`, find the name of the container, and then run `docker stop {container_name}`

If you haven't already done so, open a second terminal session. We'll use this session to inspect any containers that are running interactively.

Now, run the image and allow the runtime to randomly assign a host port:

```
docker run -p 3000 web
```

In the second terminal session, run `docker ps` and you can see which port has been assigned to the container.

Let's stop that container and run the image in a container where *we* control the port assignment.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Based on what you've learned in the past few minutes, stop the running container. Hint: `docker ps` is involved.


```
docker run -p 3000:3000 web
```


```
Ctlr-C
```

### Exposing the port
### Localhost considerations

## Building A Web Service

## Using Environment Variables

## Running MS SQL Server In A Container
As a developer, being able to quickly get a database server up and running can be important. With Linux containers, you can start a database server in seconds.  

Note that, because Linux containers are ephemeral -- the conta

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Run Microsoft SQL Server in a Linux container. Hint: Use a web search to find the instructions.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Run MySQL in a Linux container.

## Running Your Apps Using Kubernetes

## Scaling With Kubernetes

## Suggested Reading
[The Docker Book](https://dockerbook.com/)

