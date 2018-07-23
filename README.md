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
An image is a package of bits that are executable by a container runtime. An image is immutable -- it cannot be changed -- and is inactive until it is executed. When it is run, it runs in (or becomes, from the standpoint of conversation) a "container". An image is a rest; it becomes a container when it's running. An analogy would be a class that, once instantiated, becomes an object.  

### How an image is built
### Dockerfile
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
