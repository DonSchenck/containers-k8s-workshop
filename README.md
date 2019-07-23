# Containers and Kubernetes Workshop
## Code On The Beach
### July 26, 2019

#### About this workshop  
This workshop will guide the participant to use Linux-based containers to build and run applications. In addition, managing a containerized system using Kubernetes will be introduced.

## Table of Contents
1. [Installing The Prerequisites](#installing-the-prerequisites)
1. [Linux Install Instructions](#linux-install-instructions)
1. [macOS Install Instructions](#macos-install-instructions)
1. [Windows Install Instructions](#windows-install-instructions)
1. [Workshop Directory](#workshop-directory)
1. [Using Docker Hub](#using-docker-hub)
1. [Running An Image In A Container](#running-an-image-in-a-container)
1. [Building Your First Image](#building-your-first-image)
1. [Running Your Image In A Container](#running-your-image-in-a-container)
1. [Build and run another image](#build-and-run-another-image)
1. [Running MS SQL Server and/or MySQL In A Container](#running-ms-sql-server-and/or-mysql-in-a-container)
1. [Running Your Apps Using Kubernetes](#running-your-apps-using-kubernetes)
1. [Scaling Without Kubernetes](#scaling-without-kubernetes)
1. [Scaling With Kubernetes](#scaling-with-kubernetes)
1. [Rolling Update With Kubernetes](#rolling-update-with-kubernetes)
1. [YOU'VE DONE IT!](#you've-done-it)
1. [Want More?](#want-more?)
1. [Suggested Reading](#suggested-reading)

## A note about podman

In the following workshop, the popular tool 'docker' is referenced. If you are using Linux as your development machine, you should (or must in some cases) use the tool (and command) 'podman' instead. Rest assured; podman is more secure as it does not require root access to your machine. Development efforts mean podman is coming soon to a Linux distro near you. If this applies to you, check [podman.io](https://podman.io) for information and installation instructions. In that case, where you see the command `docker` in the following workshop, use `podman` instead. Or, create an alias for `podman` named `docker`.

# Installing The Prerequisites
You will need to make sure the following prerequisites are available on your machine:
* docker host and command line utility
* docker host
* Kubernetes command line utility
* Language compiler of your choice -- Node.js and .NET are included in this tutorial.
* Program Editor of your choice
* minikube

In addition, a reliable internet connection is required. As always, the faster the better. Installation instructions are based on the operating system you will be using:

* [Linux](#linux-install-instructions)  
* [macOS](#macos-install-instructions)  
* [Windows Install Instructions](#windows-install-instructions)  

# Linux Install Instructions
## L-1: Install docker desktop for your Linux distro
Visit the [Docker installation instructions](https://docs.docker.com/install/linux/docker-ce/centos/) to select your distro and follow the instructions there.

## L-2: Install the Kubernetes command line interface
Follow the instructions on the web site entitled ["Install kubectl on Linux"](https://Kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux).

## L-3: Install Node.js
Visit [the Node.js binary installation page](https://github.com/nodejs/help/wiki/Installation) and follow the instructions there.

## L-4: Install .NET

Visit [the .NET Core download page](https://dotnet.microsoft.com/download) and follow the distro-specific instructions there.

## L-5: Install minikube

Visit [the Kubernetes "Install Minikube" page](https://Kubernetes.io/docs/tasks/tools/install-minikube/) for the instructions for installing Minikube on your Linux machine.

## L-6: Install Git

Visit [the "1.5 Getting Started - Installing Git" web page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the distro-specific instructions where.

## L-7: Clone the workshop repository
```bash
git clone https://github.com/donschenck/containers-k8s-workshop.git
```
Note the directory created; this is your workshop home directory. It will be referred to as $WORKSHOP_HOME in the following text.


# macOS Install Instructions  
## M-1: Install docker desktop for Mac
Visit the [Install Docker Desktop for Mac web site](https://docs.docker.com/docker-for-mac/install/) and follow the instructions there.

## M-2: Install the Kubernetes command line interface
Follow the instructions on the web site entitled ["Install kubectl on macOS"](https://Kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos).

## M-3: Install Node.js
Visit [the Node.js Downloads page](https://nodejs.org/en/download/) to download the macOS Installer. Then simply run it to install Node.js on your macOS machine.

## M-4: Install .NET

Visit [the .NET Core download page](https://dotnet.microsoft.com/download) and download the .NET Core SDK. Then simply run it to install .NET Core on your macOS machine.

## M-5: Install minikube

Visit [the Kubernetes "Install Minikube" page](https://Kubernetes.io/docs/tasks/tools/install-minikube/) for the instructions for installing Minikube on your macOS machine.

## M-6: Install Git

Visit [the Git web page](https://www.git-scm.com/) to download the macOS installer. Then simply run it to install Git on your macOS machine.

## M-7: Clone the workshop repository
```bash
git clone https://github.com/donschenck/containers-k8s-workshop.git
```
Note the directory created; this is your workshop home directory. It will be referred to as $WORKSHOP_HOME in the following text.

# Windows Install Instructions
## W-0: Open PowerShell and run as administrator

## W-1: Install [chocolatey](https://chocolatey.org)
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

## W-2: Install docker for Windows
```powershell
choco install docker-for-windows
```
Interesting side note: [Things are happening and changing regarding Windows](https://engineering.docker.com/2019/06/docker-hearts-wsl-2/).

## W-3: Install the Kubernetes command line interface
```powershell
choco install Kubernetes-cli
```

## W-4: Install language compiler  
### Node.js
```powershell
choco install nodejs
```

### .NET
```powershell
choco install dotnet
```

## W-5: Install virtualbox
*This is _not_ necessary if you are using Hyper-V*  
```powershell
choco install virtualbox
```

## W-6: Install minikube
```powershell
choco install minikube
```

## W-7: Install git
```powershell
choco install git
```
You may need to log out and back in for git to work.


## W-8: Clone the workshop repository
```powershell
git clone https://github.com/donschenck/containers-k8s-workshop.git
```
Note the directory created; this is your workshop home directory. It will be referred to as $WORKSHOP_HOME in the following text.



# Workshop directory
In order to execute the code mentioned in this workshop, you must be in the directory `$WORKSHOP_HOME\src\nodejs` under your home directory for the repository. 


# Using Docker Hub
Docker Hub is an online __registry__ where you can fetch and store images; your own as well as other public images supplied by others. You can create an account at [hub.docker.com](hub.docker.com) and then use that account to *pull* and *push* images. *Pull* and *push* do what you might expect: Pull will download and image to your machine. Push will upload from your machine to a registry.

Note that the user id is case-sensitive.

Docker Hub is where you will most likely find official images. For example, the official image for MySQL is stored here.

This is also where documentation for an image *should* be found.

## Other registries  

You can also use any other compatible registry. Quay.io is an example (disclaimer: quay.io is a Red Hat product). You can, for example, *pull* an image by using the following command:

```bash
docker pull quay.io/donschenck/locationms:v2`  
```
<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;height:40px;font-size:25px;">&nbsp;EXERCISE</div>  

### Find the MySQL image on Docker Hub.
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>  

# Running An Image In A Container  

## Running Hello World
You can run images in a container even if the image is not in your local registry. Note that "local" refers to your docker host, which does not necessarily need to be your PC. You might, for example, be using a host at a remote location such as a server, on Azure, etc.

If the image is not in your registry, docker will automagically attempt to pull the image from docker hub.

To see an example of this, run an image without first "pulling" it.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>  

## Run the official docker hello-world image:  

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
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

### What Just Happened?  
An __image__ was loaded into a __container__ and started. This happened inside a _Virtual Machine_ (VM) that is running on your machine. The "hello-world" image ran, and after the program completed, returned control back to the host. Note that, in many cases, you want the container to run nonstop, e.g. a web service. That is explained later in the workshop.  

You can run any image you choose; it does not need to be compatible with the host. For example, you can run a Linux program on your Windows PC.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div> 

## Run Fedora in an container  

Inspired by the above output, run a Fedora container on your machine. It's literally that simple to get a Linux container running.

```bash
docker run -it fedora bash
```  

Note: The `-it` flag makes this an interactive session, i.e. the bash shell opens in a terminal window. Unlike the previous exercise, where the program had a definite end point, this is a bash shell and will stay active until you run the `exit` command at the shell command line.

<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

## How does a container work?

A container runs on top of (almost) any Linux distro. It does this by making calls to the Linux kernel. Because it uses the kernel directly, the specific _distribution_ (distro) of Linux doesn't matter. A image that was built on a Windows machine, that was published for Ubuntu, can be run in a container running on a Red Hat Enterprise Linux (RHEL) machine.

In fact, because of this, some argue that "Kubernetes is the new operating system".

## Help Is Available
Keep this in mind: the `docker` (`podman` if you're using Fedora or RHEL) command has a very helpful `--help` flag for commands. If you're unsure where to head next, running `docker --help` is a good way to get moving. You can get help for a specific command as well. For example, `docker images --help` or `docker run --help` and so on.

# Building Your First Image
## What is an image?
An image is a package of bits that are executable by a container runtime. An image is immutable -- it cannot be changed -- and is inactive until it is executed. When it is started, it runs in (or becomes, from the standpoint of conversation) a "container". An image is at rest; it becomes a container when it's running. An analogy would be a class that, once instantiated, becomes an object. An image can be saved, loaded, stored, shared, etc.

Important note: When you are using docker on your local machines, the images are stored on your hard drive. If you're not careful, you can quickly take up a lot of disk space with unused or older images. If you run `docker images` at any time, you can see a list of images on the host -- your PC in this case.

An image is a part of what is known as "Immutable Infrastructure", the idea that you replace parts of your system rather than change them. This is a key aspect of microservices.

Images are namespaced and versioned by use of a tagging system. For example, a "Hello World" application might be stored in your own registry, with a version tag such as this: `donschenck/helloworld:v2.0`. The namespace is "donschenck", the image name is "helloworld", and the tag is "v2.0". The tag can be any string you chose, and if excluded defaults to "latest".

Tagging is very important, is it allows you to have multiple versions of the same image. This is especially important when you are using Kubernetes and may have different versions running at the same time. In a production environment, you will want to put a lot of thought into tagging your images.  

## How an image is built
Building an image requires three parts:
1. The code that you wish to execute.
2. A build engine such as docker.
3. A file to direct the build process, such as the file "Dockerfile".

For this workshop, we'll be using `docker build` and the file "Dockerfile".

Images are built in layers. Further, it is the default behaviour to cache the layers. This is important to consider, as it is often wise to build in a sequence from most-stable to least-stable layers. That way, if you need to rebuild one part (e.g. you changed your code and want to build a new version), it won't be necessary to reload (or download, again) all of the layers.

The beginning layer itself is an image that typically contains multiple layers. For example, if you want to build an image that runs an Nginx web site, you may wish to start with the image `nginx:1.17.1`, which itself is built using the Debian Linux distribution. In this example, you don't have control over the operating system -- nginx chose Debian.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Find the image `nginx:latest` on docker hub and locate information that indicates that Debian is the Linux distro being used. Hint: The Dockerfile is where it is specified.  

<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>


You could, however, start with `registry.access.redhat.com/rhel`, which would be the latest version of Red Hat Enterprise Linux (RHEL). In this case, you would then need to install nginx on top of RHEL, as well as any other necessary prerequisites.

[Note: In order to use a Red Hat image, you must build your image on a RHEL-based machine or VM and will need a Red Hat subscription.]

<hr>  

##### Sidenote: Get your zero-cost copy of Red Hat Enterprise Linux  
If you'd like a zero-cost developer copy of Red Hat Enterprise Linux, and access to a number of cheat sheets, books, developement tools, and more, simply create an account with the [Red Hat Developer Program](developer.redhat.com). It's free and takes only seconds to sign up with your email and a password.  

<hr>  


You can even build your own intermediate images. For example, instead building your end-to-end RHEL-nginx-your-website image, you could build an image with RHEL and nginx -- let's call it "myrhelnginx:v1", and then use *that* image as the starting point for all of your nginx website images.

## Dockerfile
The Dockerfile is a list of settings and instructions that are used to direct the `docker build` process.

Here's a Dockerfile to build a web site image. This example uses Node.js. Note that this is *not* representative of a production-ready image; this is purposely kept simple, using a developer-based command (`npm start`). You will find that some production-ready Dockerfiles can get quite complex:

```
FROM node:11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
```
The commands are run when the image is being built, *with the exception of* the `CMD` command. The `CMD` command is what is executed when you start the image in a container (i.e. `docker run...`).

### Dockerfile Contents Explained  

`FROM` is the base or starting image for the image to be built. In this case, we're starting with a Linux machine with Node version 11 already installed. For the purposes of this example, we aren't particularlly concerned with which distribution of Linux is being used. If we check the information for this image on Docker Hub, we can find that it's using Debian Linux.  

If we wanted to enforce the version of Linux -- say, to use RHEL -- we'd need to start with that (RHEL) as our base image and then install node (and all necessary prerequisites) to get to a level of Red Hat Enterprise Linux running Node version 11.  

As you can see, there are options and tradeoffs when choosing your starting (FROM) image.

`WORKDIR` is simply the directory in which you'll be working during this build. In our example, the next command (`COPY`) will consider that value of the previous `WORKDIR` command.

`COPY` will, as you probably can guess, copy files from your host to the image.

`RUN` will run the specified command inside the image *at build time*. That is, it is only executed during `docker build`, and *not* during `docker run`.

`EXPOSE` exposes the port number specified so it can be accessed from outside the container during runtime. For example, if your nginx web site monitors port 8080 for traffic, then it must be exposed. Note -- as noted later in this tutorial -- the exposed port does not need to be the port used at runtime; you have the option of mapping an image's runtime port to a container's runtime port.

`CMD` is what is carried out when you run the image in a container, i.e. `docker run`.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Move into the directory `$WORKSHOP_HOME\src\nodejs\k8s_example`. Using the editor of your choice, create the appropriate Dockerfile in the directory of your application. Bonus: Add the MAINTAINER instruction. Hint: The Dockerfile shown above works quite well.
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

## docker build
The `docker build` command will use a Dockerfile to create an images. The following is an example of a `docker build` command. In the following example, the tag is "myimagename". Because any versioning is not specified, this will be built as "myimagename:latest".

```
docker build -t myimagename .
```
The final part of the command, the period (".") tells the command to use the Dockerfile found in the current directory. It is common, although not necessary, to have the Dockerfile in the home directory of your project. You may have very good reasons to have multiple Dockerfiles, in which case you would specify the Dockerfile by using the `-f` flag:
```
docker build -t myimagename -f Dockerfile.original .
```
The `docker build`, as you might imagine, is very powerful with many options. For this workshop, we'll keep it simple, but if you want to learn more, see [the docker build documentation](https://docs.docker.com/engine/reference/commandline/build/).  

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>  

With your Dockerfile in place, it's time to build your first image. Make sure you are in the root directory of your project, i.e. the same directory as your Dockerfile. In our case, it's `$WORKSHOP_HOME\src\nodejs\k8s_example`. You can build an image named "k8s_example:v1" by using the following command:  

`docker build -t k8s_example:v1 .`

You should see something very similar to the following (This is PowerShell; Linux or Mac may be slightly different):
```  
PS C:\Users\dschenck\src\github\donschenck\containers-k8s-workshop\src\nodejs\k8s_example> docker build -t k8s_example:v1 .
Sending build context to Docker daemon  45.57kB
Step 1/7 : FROM node:11
11: Pulling from library/node
a4d8138d0f6b: Pull complete
dbdc36973392: Pull complete
f59d6d019dd5: Pull complete
aaef3e026258: Pull complete
6e454d3b6c28: Pull complete
c717a7c205aa: Pull complete
69b68470ed80: Pull complete
05a0d45743c9: Pull complete
d0523573a78c: Pull complete
Digest: sha256:7dad47a0de4aa1294f8ba73599379777b1acd0afe563ad8e1a633b5fdc6dcd84
Status: Downloaded newer image for node:11
 ---> 5b97b72da029
Step 2/7 : WORKDIR /usr/src/app
 ---> Running in ed7eaa3f789e
Removing intermediate container ed7eaa3f789e
 ---> 0fcbeafe0b38
Step 3/7 : COPY package*.json ./
 ---> 2385d498cbfa
Step 4/7 : RUN npm install
 ---> Running in e03835722aa5
added 99 packages from 139 contributors and audited 194 packages in 2.711s
found 4 vulnerabilities (3 low, 1 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
Removing intermediate container e03835722aa5
 ---> e3568362655a
Step 5/7 : COPY . .
 ---> d0ded60be74d
Step 6/7 : EXPOSE 3000
 ---> Running in f3500d8d9ae9
Removing intermediate container f3500d8d9ae9
 ---> 22fa7f894ce3
Step 7/7 : CMD [ "npm", "start" ]
 ---> Running in da2f265f5cdd
Removing intermediate container da2f265f5cdd
 ---> c1f6c950d0ba
Successfully built c1f6c950d0ba
Successfully tagged k8s_example:v1
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
```  
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>


Note that the name of the image does not need to match the name of the project or application. The following command will work just as well:

`docker build -t confusing_name:this .`

As you can figure out, naming and tagging becomes very important.  

### Is The Image There?
If the build was successful, you can prove it by running the following command to view all of the images in your local registry:

`docker image ls` or `docker images`

```
PS C:\Users\dschenck\src\github\donschenck\containers-k8s-workshop> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
k8s_example         v1                  c1f6c950d0ba        8 minutes ago       912MB
node                11                  5b97b72da029        4 days ago          904MB
```

# Running Your Image In A Container
<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>  


In the previous "hello-world" example, we ran the image interactively. In this case, we're going to launch the image in a container and return control to our command line. The application will continue to run "in the background", monitoring localhost, port 3000.  

`docker run -d -p 3000:3000 --name k8s_example k8s_example`  

### THAT DID NOT WORK!

Why? Because if you do not specify a tag, docker will use ":latest" as the default value. Our image is "k8s_example:v1", so it was not found. Let's try this again with the correct tag:

`docker run -d -p 3000:3000 --name k8s_example k8s_example:v1`

The result will be a container running the image. The command will return the *container id*, much like the following:

```
PS C:\Users\dschenck\src\github\donschenck\containers-k8s-workshop> docker run -d -p 3000:3000 --name k8s_example k8s_example:v1
cd6d76723741c98f68151003feeb845036abb7ebe17430a14708f9c054d04d85
```

## What's In A Name?
In our command `docker run -d -p 3000:3000 --name k8s_example k8s_example:v1`, we specificied a value for the `--name` flag. This is not required. If you do not specify a name for a container, one will be automatically assigned to it. As before, this is a good opportunity to apply solid management regarding naming.

### The Other Stuff
The `-p` flag allows you to map a host port to the container's port. In this case, the same port is used. This is a very common usage when you are running a container for testing, especially on your local machine. Later, Kubernetes will make this easier.

If you do not specify a host port, one will be automatically (and randomly) assigned. Remember this: it will be significant later in this workshop.

The `-d` flag is left to the reader to discover.

## Let's See It

Open `localhost:3000` in your browser.

<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>  

## RECAP

At this point, you have:
1. Created a Dockerfile
2. Built and image with the proper tag
3. Started running that image in a Linux container
4. Viewed the resulting web site

**CONGRATULATIONS!** You know now enough to build and run an application in a Linux container. 

# Build and run another image
Now that a web site is running, let's launch a RESTful api. The code we're using will return the host name of where it is running, which is particularly interesting in a docker and Kubernetes environment. Move into the proper directory:

`cd WORKSHOP_HOME/src/nodejs/resthost`

There you will find a RESTful api application that uses port 3000, as well as a Dockerfile to build it.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Go ahead and build your image. Give it the name "resthost" -- do *not* use a tag. Check to see that it is built (using the `docker images` command), and note the size of the image. If you want to cheat, the solution follows.

`docker build -t resthost .`  
`docker images`  

 Run the image you just created:

`docker run -d -p 3000:3000 --name resthost resthost`  

Did you get an error similar to the following?
```
docker run -d -p 3000:3000 --name resthost resthost
81803bbdef4eb78161b39f21d513bb575dc796f7d8aba4f91c693c7669456438
C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity on endpoint resthost (1afb028d43840cf703ea7a27261b4618f03010b12d1bacd1c2ae2afc1e90009b): Bind for 0.0.0.0:3000 failed: port is already allocated.
```
### Why the error?
This is because your previously-started container ("k8s_example", from your previous `docker run...`) is still running. Use the commmand ```docker ps``` to see all your running containers, locate the offending container, and use the ```docker stop``` command to stop execution. See the following:
```
docker stop k8s_example
```
Now, try again to run the image "resthost":
`docker run -d -p 3000:3000 --name resthost resthost`  

### Another Error!

That's right; the previous container, while *not running*, exists in your docker system. How can you see that? Run the command  

`docker ps -a`

You need to either:
* Delete it and run again
* Start it (since it's not actually running)

Let's keep it simple and start it:  

`docker start resthost`

Make note of the container ID that is returned. It *isn't*. You get the name of the container that you assigned to it earlier.

Now our "resthost" image is running in a container. We can see it in action by using the following command:

`curl http://localhost:3000/host`  


Note that the returned content, the host name, matches the first 12 characters of the container ID for the container running the image "resthost".  
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>

## Building A Small Web Site Using C#

Move into the directory $WORKSHOP_HOME/src/csharp/web.


### Compiling the code

`dotnet build --runtime centos.7-x64`  
`dotnet publish`  

### Creating the image

`docker build -t web:v1 .`  

### Running the image
```
docker run -p 5000:5000 --name csharpweb web:v1
``` 

Use your browser to visit `localhost:5000`.   


**Notice that it does not work.**  
Why? In the Dockerfile, even though we exposed port 5000 -- which is used by the program -- the aspnet web server defaults to port 80. You may have noticed that in the message returned after starting the container.

First, stop the running container by using one of the following:  
* Press Ctrl-C at the terminal session (you may need press it multiple times)  

or  

* Open a second terminal session and run `docker stop csharpweb` followed by `docker rm csharpweb`.

`docker rm` removes an existing container. Poof ... it's gone forever. The image is not deleted; only the container that was running it.

## Specifying runtime environment variables

Because asp.net defaults to port 80, we need a way to override this. When you run a dotnet web site from the command line, you can first set the environment variable "ASPNETCORE_URLS" to any value, and the runtime will use that.

Fortunately, we can do the same with containers. Let's run the image in a container, but this time we'll specify an environment variable to be used at runtime:

`docker run -p 5000:5000 -e ASPNETCORE_URLS='http://0.0.0.0:5000' web:v1`  

*YOU WILL PROBABLY GET AN ERROR MESSAGE*

Hints: `docker ps -a` and `docker stop` and `docker rm` 

Again, point your browser to `localhost:5000`. You will see the ASP.NET web site running.  
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>




# Running MS SQL Server and/or MySQL In A Container
As a developer, being able to quickly get a database server up and running can be important. With Linux containers, you can start a database server in seconds.  

Note that, because Linux containers are ephemeral, the container loses all local data when it is shut down. This is not a production environment, but is useful for a developer needing a database.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;OPTIONAL EXERCISE</div>
Run Microsoft SQL Server in a Linux container. Hint: Use a web search to find the instructions.  
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

&nbsp;
<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;OPTIONAL EXERCISE</div>
Run MySQL in a Linux container.
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

# Running Your Apps Using Kubernetes

Now is the time to dive into Kubernetes and see what the excitement is all about. How can Kubernetes make life easier? This workshop will address three aspects of the Kubernetes story:
1. Scaling an application
2. Self-healing applications
3. Rolling updates to applications

## Start Minikube

First: Stop all your docker containers. Hint: Use `docker ps` and `docker stop`.

Minikube allows you to run a Kubernetes cluster on your local machine. This -- where the cluster is running -- is part of what's known as the "context" of your environment. Within the context is also the namespace in which you are working.

The first thing to do is to start minikube on your local machine. Minikube will start a virtual machine, inside which it will run a cluster. The type of virtualization used is dependent on your machine and situation. That is, you may be using Hyper-V (Windows), or Xhyve (MacOS), or VirtualBox.

Use the following command to start minikube:  

`minikube start`

If you receive an error related to the virtualization, you can specify your specific VM environment, such as:  

`minikube start --vm-driver hyperv`  
or  
`minikube start --vm-driver xhyve`  
or  
`minikube start --vm-driver virtualbox`  

In short: Use the one that works on your machine.

Wait for it to start before continuing.

### About those Linux images

Previously, we built Linux images -- we've been calling them docker images up until now, but they are more accurately Linux images. If you run the command `docker images`, you can see a list. Go ahead and do that now.

Those images are on your local machine. Because minikube is running in a VM, the local images **are not** available to your minikube cluster. We need to set our docker environment so that it "points to" the VM that is running minikube.

Use the following command, and follow the instructions it supplies, to do this:

`minikube docker-env` 

If you followed the instructions that were displayed, you now have your docker environment looking inside your minikube VM. To see the difference, run the command `docker images` again. 

Notice how the output is very different from the previous output.

# Scaling Without Kubernetes

Earlier, we mentioned port conflicts when running more than one container on a given port. Just one of the powers of Kubernetes is that it will solve this problem.

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Create two images of your 'hostrest' application. Label them 'hostrest:v1' and 'hostrest:v2'. Make sure the text output in each is different, e.g. v1 and v2. Some hints: The code is at $WORKSHOP_HOME/src/nodejs/resthost/api/controllers/hostController.js. Open the file in your editor of choice to make any changes to the output. When you build it, make sure you specify the correct tag. You're going to create the version 1 image, edit the source code, then build the version 2 image.
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

Let’s say we want to run three containers of resthost:v1. Would could use the following commands:
```
docker run -d -p 3000:3000 —name resthost1 resthost:v1
docker run -d -p 3001:3000 —name resthost2 resthost:v1
docker run -d -p 3002:3000 —name resthost3 resthost:v1
```

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Go ahead and do this (above -- laucnhing three containers). This will give you a feel for the hassle of this approach. Imagine if this was 100 instances of 'resthost:v1'. 
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

After you've viewed them (using `docker ps`), stop them and remove them. Hint: `docker stop...` and `docker rm...`.

## Creating a Kubernetes namespace:  

Run `kubectl version` to see which version of the Kubernetes command line tool you're running. If this does not work:
1. Make sure you've installed kubectl
2. Make sure it's in your PATH

Run the following command to create the "kubedemo" namespace:  

`kubectl create -f $WORKSHOP_HOME/kubedemo-namespace.yaml`  

In Kubernetes, your application containers run in "pods". You scale up and down by changing the number of pods.

Create a deployment:
```
kubectl apply -f resthost-application.yaml
```
You can see what's running by using the following commands:

`kubectl --namespace=kubedemo get deployments`  
`kubectl get pods --namespace=kubedemo`  
`kubectl --namespace=kubedemo get services`  

You will notice that there are no services found. That's next in the workshop.

## Quick Glossary
* Deployment: This is an object that defines the application to be created and run in your Kubernetes cluster.  
* Pod: Holds one or more containers.  
* Service: An expression of a network service consisting of one or more pods. This is, in the end, what you are building and using in Kubernetes: Services.

## Creating a Service

At this point we have pods running in Kubernetes. However, they are not logically grouped together into a Service yet. Let's do that.

`kubectl expose --namespace=kubedemo deployment resthost --type=LoadBalancer --name=resthost`  

`kubectl --namespace=kubedemo get services`

Now you can see that you have a Service running, named "resthost". This is what we use in our applications.

## Why Is This Powerful (and cool)?

In our applications inside Kubernetes, we can address this service by name, "resthost". No matter how many pods are running, they all sit behind the "resthost" service. That's where scaling benefits us.

If we're running this on a public-facing server (on prem, AWS, Azure, etc.) we can assign a DNS entry to the IP address and port for this service. This won't change, no matter what we do behind the scenes. For example, we can run multiple versions at the same time, or we can upgrade to a new version with zero downtime -- something called a "Rolling Update". We can use Canary Deployments and Blue/Green Deployments. All while any code that uses our service does not need to change.

## IP Address and Port

When you ran `kubectl --namespace=kubedemo get services` the system reported the port number used by the service. For example, it may read "3000:30620/TCP". The first port is what the application uses; the second port is what was randomly assigned to it. Kubernetes keeps track of that for us.

That means we can run two different services that **both** use, say, port 3000, in the same cluster. The external (host) port will be randomly assigned and managed by Kubernetes.

Remember the challenge of running three containers of the same application when using docker? Kubernetes just solved that.

So we have the port number as a result of the `kubectl get services...` command. Now we need the host address of the cluster.

In minikube, we can use the following command to get that information:

`kubectl cluster info`

The output will look much like the following:
```
Kubernetes master is running at https://10.0.0.34:8443
KubeDNS is running at https://10.0.0.34:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```



You can see your pod using `curl`:
```
curl http://{ip_address_of_service}/host
```
For this particular example, it would be `curl https://10.0.0.34:30620/host`.  

If you run this multiple times, you will see that the host name changes. You're using the same URI but being served by two different pods.

If it is *not* switching between the two pods, it's because of caching. On my Windows PC, I overcame this by opening a Linux command line in a terminal and running curl there.


# Scaling With Kubernetes
Now, finally, we can scale up. As you noticed, two pods were created for our "resthost" service. You can see that when you run the `kubectl get pods...` command. You can also see it defined in the file that created the Deployment: "resthost-application.yaml".  

Let's make sure three copies of 'resthost:v1' are running at the same time, *on the same port*. Kubernetes takes care of discovery and load balancing and port conflicts.

```
kubectl --namespace=kubedemo scale deployment resthost --replicas=3
```
Now if you run the command `kubectl --namespace=kubedemo get pods`, you will see three pods running.

If you run multiple curls, you'll see that you have three different hosts running on the same IP address and port.

# Rolling Update With Kubernetes
Finally, let's update from v1 to v2 without any downtown. Kubernetes will perform an automatic Rolling Update.

```
kubectl --namespace=kubedemo set image deployment/resthost resthost=resthost:v2
```
To see the change, run the following multiple times:
```
curl {ip_address_of_service}:{assigned_port}/host
```

<div style="background-color:#0B3861;color:white;font-weight:bold;height:40px;font-size:25px;">&nbsp;EXERCISE</div>
Create a looping script that runs the `curl` command against your service. After that is running in a separate terminal session, you can run the final step.

Delete a pod and watch Kubernetes auto-heal it.
```
kubectl --namespace=kubedemo get pods
kubectl delete pod {id_of_one_pod_from_previous_command}
```
<div style="font-size: smaller;color:gray">(End of Exercise)</div><hr>

Notice that we've upgraded our application without any downtime. We also are using the same address (IP and port) as before; that doesn't change.

The ability of Kubernetes to group pods together into a service and make them available at a immutable and pre-determined URI is known as "Service Discovery". This means, in a development environment, you can write your code to use a service without fear that it's location will change. That will be consistent across all environments: Developerment, testing, staging and production.

## Self-Healing

This is an easy one. Delete an existing pod; Kubernetes will automatically replace it. On the fly, while nothing is interrupted.

# YOU'VE DONE IT!
You've completed the workshop. Congratulations. You're ready to start down the path to using containers and managing them with Kubernetes.

## DevOps for Everyone!

Notice something? You've blurred the lines here between developer and operations. In a Kubernetes-based environment, you'll find developer creating scripts and yaml files as they developer their software. Scripts and files that are stored in a version control system (e.g. git).

This "Infrastructure as Code" can then be used by the people in Operations.

Welcome to DevOps.

## OpenShift

OpenShift is an open source Platform as a Service (PaaS) built on top of Kubernetes that makes life even easier. For example, you can build an image straight from the source code in a git repo (e.g. Github) and have it automatically update (in OpenShift) every time you push a new update to Github.

You can also easily set up a CI/CD pipeline in OpenShift.

OpenShift also includes templates for common activities. For example, you can create a MySQL database in one line. There [a great blog post about it](https://developers.redhat.com/blog/2019/07/18/mysql-for-developers-in-red-hat-openshift/).

It also provides a very niuce web dashboard.

# Want More?

Join the Red Hat Developer Program -- **it's free!** -- today to get access to a zero-cost Developer's copy of Red Hat Enterprise Linux (RHEL), a container development kit, free books, and much more. Visit [developers.redhat.com](https://developers.redhat.com) right now.

# Suggested Reading
[The Docker Book](https://dockerbook.com/)
developers.redhat.com  
bit.ly/istio-tutorial  
bit.ly/faas-tutorial  
learn.openshift.com
