### Continuous integration and the book wrap up


In general, so far we have created a full-stack app which runs under a certain domain name (in the book case reactjs.space). The missing part in the whole setup are the deployments processes. Deployments should be zero downtime. We need to have a redundant servers of our application. 

What we are missing:

a) redundancy, currently when deploying our app the users will have problem accessing the app

b) staging/review servers - so we can deploy the app, test it and then when everything is ok we can push it onto productions' server. If something bad does get deployed we should be able to rollback to a working state as quick as possible.



