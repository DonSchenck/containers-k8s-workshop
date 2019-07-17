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
* minikube

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
*This is _not_ necessary if you are using Hyper-V*  
```powershell
choco install virtualbox
```

### W-6: Install minikube
```powershell
choco install minikube
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
Docker Hub is an online registry where you can fetch and store images. You can create an account at [hub.docker.com](hub.docker.com) and then use that account to *pull* and *push* images. *Pull* and *push* do what you might expect: Pull will download and image to your machine. Push will upload from your machine to a registry.

Note that the user id is case-sensitive.

Docker Hub is where you will most likely find official images. For example, the official image for MySQL is stored here.

This is also where documentation for an image *should* be found.

### Other registries  

You can also use any other compatible registry. Quay.io is an example. You can, for example, *pull* an image by using the following command:

`docker pull quay.io/donschenck/locationms:v2`  

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
### What Just Happened?  
An image was loaded into a container and started. It ran, then completed, and returned control back to the host. Note that, in many cases, you want the container to run nonstop. That is explained later.  

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Inspired by the above output, run a Fedora container on your machine. It's literally that simple to get a Linux container running.

```bash
docker run -it fedora bash
```

The `-it` flag makes this an interactive session, i.e. the bash shell opens in a terminal window. Unlike the previous exercise, where the program had a definite end point, this is a bash shell and while stay active until you run the `exit` command.

## I Get By With A Little Help...
Keep this in mind: the `docker` (`podman` if you're using Fedora or RHEL) command has a very helpful `--help` flag for commands. If you're unsure where to head next, running `docker --help` is a good way to get moving. You can get help for a specific command as well. For example, `docker images --help` or `docker run --help` and so on.

## Building Your First Image
### What is an image?
An image is a package of bits that are executable by a container runtime. An image is immutable -- it cannot be changed -- and is inactive until it is executed. When it is started, it runs in (or becomes, from the standpoint of conversation) a "container". An image is at rest; it becomes a container when it's running. An analogy would be a class that, once instantiated, becomes an object. An image can be saved, loaded, stored, shared, etc.

Important note: When you are using docker on your local machines, the images are stored on your hard drive. If you're not careful, you can quickly take up a lot of disk space with unused or older images. If you run `docker images` at any time, you can see a list of images on the host -- your PC in this case.

An image is a part of what is known as "Immutable Infrastructure", the idea that you replace parts of your system rather than change them. This is a key aspect of microservices.

Images are namespaced and versioned by use of a tagging system. For example, a "Hello World" application might be stored in your own registry, with a version tag such as this: `donschenck/helloworld:v2.0`. The namespace is "donschenck", the image name is "helloworld", and the tag is "v2.0". The tag can be any string you chose, and if excluded defaults to "latest".

Tagging is very important, is it allows you to have multiple versions of the same image. This is especially important when you are using Kubernetes and may have different versions running at the same time. In a production environment, you will want to put a lot of thought into tagging your images.  

### How an image is built
Building an image requires three parts:
1. The code that you wish to execute.
2. A build engine such as docker.
3. A file to direct the build process, such as the file "Dockerfile".

For this workshop, we'll be using `docker build` and the file "Dockerfile".

Images are built in layers. Further, it is the default behaviour to cache the layers. This is important to consider, as it is often wise to build in a sequence from most-stable to least-stable layers. That way, if you need to rebuild one part (e.g. you changed your code and want to build a new version), it won't be necessary to reload (or download, again) all of the layers.

The beginning layer itself is an image that typically contains multiple layers. For example, if you want to build an image that runs an Nginx web site, you may wish to start with the image `nginx:1.17.1`, which itself is built using the Debian Linux distribution. In this example, you don't have control over the operating system -- nginx chose Debian.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Find the image `nginx:latest` on docker hub and locate information that indicates that Debian is the Linux distro being used. Hint: The Dockerfile is where it is specified.


You could, however, start with `registry.access.redhat.com/rhel`, which would be the latest version of Red Hat Enterprise Linux (RHEL). In this case, you would then need to install nginx on top of RHEL, as well as any other necessary prerequisites.

[Note: In order to use a Red Hat image, you must build your image on a RHEL-based machine or VM and will need a Red Hat subscription.]

<hr>  

##### Sidenote: Get your zero-cost copy of Red Hat Enterprise Linux  
If you'd like a zero-cost developer copy of Red Hat Enterprise Linux, and access to a number of cheat sheets, books, developement tools, and more, simply create an account with the [Red Hat Developer Program](developer.redhat.com). It's free and takes only seconds to sign up with your email and a password.  

<hr>  


You can even build your own intermediate images. For example, instead building your end-to-end RHEL-nginx-your-website image, you could build an image with RHEL and nginx -- let's call it "myrhelnginx:v1", and then use *that* image as the starting point for all of your nginx website images.

### Dockerfile
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
Move into the directory `$WORKSHOP_HOME\src\nodejs\k8s_example`. Using the editor of your choice, create the appropriate Dockerfile in the directory of your application. Bonus: Add the MAINTAINER instruction. Hint: The Dockerfile shown above works quite well.

## Build Your Image
### docker build
The `docker build` command will use a Dockerfile to create an images. The following is an example of a `docker build` command. In the following example, the tag is "myimagename". Because any versioning is not specified, this will be built as "myimagename:latest".

```
docker build -t myimagename .
```
The final part of the command, the period (".") tells the command to use the Dockerfile found in the current directory. It is common, although not necessary, to have the Dockerfile in the home directory of your project. You may have very good reasons to have multiple Dockerfiles, in which case you would specify the Dockerfile by using the `-f` flag:
```
docker build -t myimagename -f Dockerfile2
```
The `docker build`, as you might imagine, is very powerful with many options. For this workshop, we'll keep it simple, but if you want to learn more, see [the docker build documentation](https://docs.docker.com/engine/reference/commandline/build/).  

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


Note that the name of the image does not need to match the name of the project or application. The following command will work just as well:

`docker build -t confusing_name:this .`

As you can figure out, naming and tagging becomes very important.  

## Is The Image There?
If the build was successful, you can prove it by running the following command to view all of the images in your local registry:

`docker image ls` or `docker images`

```
PS C:\Users\dschenck\src\github\donschenck\containers-k8s-workshop> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
k8s_example         v1                  c1f6c950d0ba        8 minutes ago       912MB
node                11                  5b97b72da029        4 days ago          904MB
```

## Run That Image

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

### What's In A Name?
In our command `docker run -d -p 3000:3000 --name k8s_example k8s_example:v1`, we specificied a value for the `--name` flag. This is not required. If you do not specify a name for a container, one will be automatically assigned to it. As before, this is a good opportunity to apply solid management regarding naming.

### The Other Stuff
The `-p` flag allows you to map a host port to the container's port. In this case, the same port is used. This is a very common usage when you are running a container for testing, especially on your local machine. Later, kubernetes will make this easier.

If you do not specify a host port, one will be automatically (and randomly) assigned. Remember this: it will be significant later in this workshop.

The `-d` flag is left to the reader to discover.

### Let's See It

Open `localhost:3000` in your browser.

### RECAP

At this point, you have:
1. Created a Dockerfile
2. Built and image with the proper tag
3. Started running that image in a Linux container
4. Viewed the resulting web site

**CONGRATULATIONS!** You know now enough to build and run an application in a Linux container. 

## Build and run another image
Now that a web site is running, let's launch a RESTful api. Move into the proper directory:

`cd WORKSHOP_HOME/src/nodejs/resthost`

There you will find a RESTful api application that uses port 3000, as we as a Dockerfile to build it. Build and run the application:

`docker build -t rest .`  
`docker run -d -p 3000:3000 --name rest rest`  

Did you get an error similar to the following?
```
Error response from daemon: driver failed programming external connectivity on endpoint wizardly_meitner (edb5effff25f5454e96c533b29b7927b20f27899cd54773f032a474b36d95551): Bind for 0.0.0.0:3000 failed: port is already allocated
Error: failed to start containers: rest
```
This is because your previously-started container (from your previous `docker run...`) is still running. Use the commmand ```docker ps``` to see all your running containers, locate your previous container, and use the ```docker stop``` command to stop execution.
```
docker stop rest
```
docker run -d -p 3000:3000 --name myweb web
docker run -d -p 3000:3000 --name myweb --rm web



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
Use your browser to visit `localhost:3000`.   

**Notice that it does not work.**  
Why? In the Dockerfile, we exposed port 3000 -- which is used by the program -- but the `docker run` command hasn't mapped the port 3000 of the container to a port on the host. This is done using the `-p` flag with the `docker run` command. Note that you do *not* need to use the "host part" of the `-p` flag, but in that case, docker will assign a port number. In fact, let's try it.

First, stop the running container by using one of the following:  
* Press Ctrl-C at the terminal session (you may need press it multiple times)  

or  

* Open a second terminal session, run `docker ps`, find the name of the container, and then run `docker stop {container_name}`

### Exposing the port

If you haven't already done so, open a second terminal session. We'll use this session to inspect any containers that are running interactively.

Now, run the image and allow the runtime to randomly assign a host port:

```
docker run -p 3000 web
```

In the second terminal session, run `docker ps` and you can see which port has been assigned to the container.

Let's stop that container and run the image in a container where *we* control the port assignment.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Based on what you've learned in the past few minutes, stop the running container.  

Hint: `docker ps` is involved.

Let's run the web image in a container and map the container port 3000 to the host port 3000. Keeping the port numbers the same is a very common practice when using containers.

(Hmmmm ... what happens when you try to run multiple containers on the same port?) <-- More on this later.

```
docker run -p 3000:3000 web
```
Now point your browser to `localhost:3000`.

**It still does not work!**

Let's stop the container and investigate.

```
docker ps 
docker stop {container_name}
```

### Localhost considerations
Quite simply, the problem is "localhost". The "localhost" in your container is the container itself, *not* your host PC. So when you run the container and then point your host browser to "localhost", you won't see it.

It's not working because the code is monitoring the port on "localhost", and localhost is the Linux container, NOT the host (i.e. your PC). You *could* change the source code to monitor address 0.0.0.0 (or *), build a new docker image, and run the new image.

Node: Alter the file bin/www
C#: Alter the file Program.cs

OR


## Using Environment Variables
Start docker with environment variable(s) set:
```
docker run -d -p 3000:3000 -e HOST='0.0.0.0' --name web webtest
```
```
docker run -d -p 5000:5000 -e ASPNETCORE_URLS='0.0.0.0:5000' --name web webtest
```

### More about docker run
You can read about all the run options on [the documentation page](https://docs.docker.com/engine/reference/commandline/run/).  

## Building A Web Service
<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Create a web service and run it on a container. An HTTP GET operation should return the HOSTNAME for the application. Name the image "rest" -- we'll be using this in the Kubernetes portion of this workshop.

Example:
```
curl localhost:3000
Application 'rest' (v1) hostname is d2fa43b00985
```

## Running MS SQL Server In A Container
As a developer, being able to quickly get a database server up and running can be important. With Linux containers, you can start a database server in seconds.  

Note that, because Linux containers are ephemeral, the container loses all local data when it is shut down. This is not a production environment, but is useful for a developer needing a database.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Run Microsoft SQL Server in a Linux container. Hint: Use a web search to find the instructions.
  
   


<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Run MySQL in a Linux container.

## Running Your Apps Using Kubernetes
Earlier, we mentioned port conflicts when running more than one container on a given port. Just one of the powers of Kubernetes is that it will solve this problem.

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Create two images of your 'rest' application. Label them 'rest:v1' and 'rest:v2'. Make sure the text output in each is different, e.g. v1 and v2.  

Let’s say we want to run three containers of rest:v1. Would could use the following commands:
```
docker run -d -p 3000:3000 —name rest1 rest
docker run -d -p 3001:3000 —name rest2 rest
docker run -d -p 3002:3000 —name rest3 rest
```

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Go ahead and do this (above). This will give you a feel for the hassle of this approach. Imagine if this was 100 instances of 'rest:v1'.

Run `kubectl version` to see which version of the Kubernetes command line tool you're running. If this does not work:
1. Make sure you've installed kubectl
2. Make sure it's in your PATH

Created a Kubernetes namespace:
```
kubectl create -f $WORKSHOP_HOME/kubedemo-namespace.yaml
```
In Kubernetes, your application containers run in "pods". You scale up and down by changing the number of pods.

Create a pod:
```
kubectl --namespace=kubedemo run rest --image=rest:v1 --port=3000
```

Once a pod is up and running, you need to expose your web service:
```
kubectl --namespace=kubedemo expose deployment --port=3000 rest --type=LoadBalancer
```
Take a look at what we have:
```
kubectl —namespace=kubedemo get pods
kubectl —namespace=kubedemo get services
```

You can see your pod using `curl`:
```
curl {ip_address_of_service}
```

## Scaling With Kubernetes
Now, finally, we can scale up. Let's make sure three copies of 
'rest:v1' are running at the same time, *on the same port*. Kubernetes takes care of discovery and load balancing and port conflicts.

```
kubectl --namespace=kubedemo scale deployment rest --replicas=3
```

If you run multiple curls, you'll see that you have three different hosts running on the same IP address and port.

Run the following multiple times:
```
curl {ip_address_of_service}
```
## Rolling Update With Kubernetes
Finally, let's update from v1 to v2 without any downtown. Kubernetes will perform an automatic Rolling Update.

```
kubectl --namespace=kubedemo set image deployment/rest rest=rest:v2
```
To see the change, run the following multiple times:
```
curl {ip_address_of_service}
```

<div style="background-color:black;color:white;font-weight:bold;">&nbsp;EXERCISE</div>
Create a looping script that runs the `curl` command against your service. After that is running in a separate terminal session, you can run the final step.

Delete a pod and watch Kubernetes auto-heal it.
```
kubectl --namespace=kubedemo get pods
kubectl delete pod {id_of_one_pod_from_previous_command}
```


## YOU'VE DONE IT!
You've completed the workshop. Congratulations. You're ready to start down the path to using containers and managing them with Kubernetes. As an aside: Red Hat OpenShift provides a higher-level experience with Kubernetes and provides a web dashboard.

## Suggested Reading
[The Docker Book](https://dockerbook.com/)
developers.redhat.com  
bit.ly/istio-tutorial  
bit.ly/faas-tutorial  
learn.openshift.com
