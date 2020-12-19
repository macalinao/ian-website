---
title: Setting up Amazon ECR with Jenkins
---

Amazon ECR is Amazon's container registry service and is a convenient place to store Docker images. If you're already using AWS, it's pretty nice to use as it has free data transfer and it requires minimal setup.

However, using it with Jenkins is deceptively complicated. You may think the [Amazon ECR Jenkins Plugin][amazon-ecr-plugin] all you need, but if you're not using Jenkins Pipelines, you're on the wrong track-- it doesn't work! You will get an error that looks something like this:

```
[myservice] $ docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/myservice:latest
The push refers to a repository [123456789.dkr.ecr.us-east-1.amazonaws.com/myservice]
62807a93cfba: Preparing
35c20f26d188: Preparing
c3fe59dd9556: Preparing
6ed1a81ba5b6: Preparing
a3483ce177ce: Preparing
ce6c8756685b: Preparing
30339f20ced0: Preparing
0eb22bfb707d: Preparing
a2ae92ffcd29: Preparing
ce6c8756685b: Waiting
30339f20ced0: Waiting
0eb22bfb707d: Waiting
a2ae92ffcd29: Waiting
denied: Your Authorization Token has expired. Please run 'aws ecr get-login' to fetch a new one.
Build step 'Docker Build and Publish' marked build as failure
Finished: FAILURE
```

The easiest solution I've found is to set up the [Amazon ECR Credential Helper][amazon-ecr-credential-helper], of which the documentation is pretty straightforward to follow to set up.

When doing this, make sure your credential file is named `~/.aws/credentials`. If you use `config` it won't work.

Note that you don't need to use the Cloudbees Docker Build And Push plugin anymore if you use this. Just use plain ol' `docker build` and `docker push`!

This blog post didn't really go over any of the details, but if you run into this issue, this is how I solved it!

[amazon-ecr-plugin]: https://wiki.jenkins-ci.org/display/JENKINS/Amazon+ECR
[amazon-ecr-credential-helper]: https://github.com/awslabs/amazon-ecr-credential-helper
