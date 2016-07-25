### Continuous integration with unit and behavioral tests. Pub App Wrap Up.

We made it - congratulations! We have created a full-stack app which runs under a certain domain name (in the book case reactjs.space) and it took good chunk of time. The missing part in the whole setup are the deployments processes. Deployments should be zero downtime. We need to have a redundant servers of our application. 

We also missing some steps in our app to make it professionally work as minification, unit and behavioral tests.

In that chapter we will roughly describe options how to make this stuff working. Rest of the missing pieces are left for you as a home work.

#### When to write unit and behavioral tests

Generally, there are some advices about when to write unit and/or behavioral tests. 

We in MobileWeb Pro very have often have clients who run startups. As a general governance for them we advice:

a) if your startup is looking for traction and you need your product in order to make it then don't worry about tests

b) after you created your MVP (Minimum Viable Product) then you MUST have those tests when expanding your application. 

c) if you are well estabilished company which is building an app for your clients and you know their needs very well then you must have tests

First two points (a-b) are related to startups and young companies. The third point (c) is related mostly for well estabilished companies.

It's really overkill when you are building a mobile/web app and you don't have those stuff in your setup.


#### How to write unit and behavioral tests




