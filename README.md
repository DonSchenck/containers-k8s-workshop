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

At this point you will need to log out and back in to your Window machine.

## Using Docker 
Docker Hub is an online registry where you can fetch and store images. You can create an account at [hub.docker.com](hub.docker.com) and then use that account to pull and store images.

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


## Building Your First Image
### What is an image?
An image is a package of bits that are executable by a container runtime. An image is immutable -- it cannot be changed -- and is inactive until it is executed. When it is run, it runs in (or becomes, from the standpoint of conversation) a "container". An image is a rest; it becomes a container when it's running. An analogy would be a class that, once instantiated, becomes an object. An image can be saved, loaded, stored, etc.

An image is a part of what is known as "Immutable Infrastructure", the idea that you replace parts of your system rather than change them.

Images are namespaced and versioned by use of a tagging system. For example, a "Hello World" application might be stored in your own registry, with a version tag such as this: donschenck/helloworld:v2.0. The namespace is "donschenck", the image name is "helloworld", and the tag is "v2.0". The tag can be any string you chose, and if excluded defaults to "latest".

Tagging is very important, is it allows you to have multiple versions of the same image. This is especially important when you are using Kubernetes and may have different versions running at the same time.  

### How an image is built
Building an image requires three parts:
1. The code that you wish to execute.
2. A build engine such as docker.
3. A file to direct the build process, such as a Dockerfile.

For this workshop, we'll be using `docker build` and a Dockerfile.

Images are built in layers. Further, it is the default behaviour to cache the layers. This is important to consider, as it is often wise to build in a sequence from most-stable to least-stable layers. That way, if you need to rebuild one part (e.g. you changed your code and want to build a new version), it won't be necessary to reload all of the layers.

The beginning layer may, itself, be an image that contains multiple layers. For example, if you want to build an images that runs an Nginx web site, you may wish to start with the image `nginx:1.15.1`, which itself is built using the Debian Linux distribution. In this example, you don't have control over the operating system -- nginx chose Debian.

You could, however, start with `registry.access.redhat.com/rhel`, which would be the latest version of Red Hat Enterprise Linux (RHEL). In this case, you would then need to install nginx on top of RHEL, as well as any other necessary prerequisites.

[Note: In order to use a Red Hat image, you need a Red Hat subscription]

You can even build your own intermediate images. For example, instead building your end-to-end RHEL-nginx-your-website image, you could build an image with RHEL and nginx -- let's call it "myrhelnginx:v1", and then use *that* image as the starting point for all of your nginx website images.

### Dockerfile
The Dockerfile is a list of settings and instructions that are used to direct the `docker build` process.
### docker build

## Building A Small Web Site
### Compiling the code
### Creating the image
### Running the image
### Exposing the port
### Localhost considerations

## Building A Web Service

## Using Environment Variables

## Running MS SQL Server In A Container

## Running Your Apps Using Kubernetes

## Scaling With Kubernetes
