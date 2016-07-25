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

#### React Convention 

There is a project which shows fully, how the full-stack development setup shall be looking like:

```
http://ReactConvention.com
```

Visit this website and learn how integrate your app with unit and behavioral tests and learn up to date best conventions about how to make react redux applications.

#### Karma for testing

We won't guide you to setting up the tests thorughout this chapter, because it's not in the scope of the book. Aim of this chapter is more likely to present you online resources which will help you to understand big picture. We will try to answer a question.

Karma is the one of most popular tool for unit and behavioral tests. The main goal is to bring a productive testing environment while working on any application.

There are many features that you are provided with by using this test runner. There is a nice video that is explaining big picture about Karma at their main website:
```
https://karma-runner.github.io
```

Some of the main features are:

a) Test on Real Devices - you can use real browsers and real devices such as phones, tablets or PhantomJS (PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG) to run the tests. Different enviroments, but one tool that run it all.

b) Remote Control - you can run the tests remotely, for example on each save from your IDE so you don't have to do it manually

c) Testing Framework Agnostic - you can write your tests  in Jasmine, Mocha, QUnit and other frameworks. It's totally up to you.

d) Continuous Integration - Karma works great with CI tools like Jenkins, Travis or CircleCI.


#### How to write unit and behavioral tests

Let's provide an example how to setup properly a project in order to have an ability to write tests.

Visit the Github repo of very popular redux starter kit:
```
https://github.com/davezuko/react-redux-starter-kit
```

Then visit the package.json file of this repository. We can find out there what are possible commands/scripts:
```
  "scripts": {
    "clean": "rimraf dist",
    "compile": "better-npm-run compile",
    "lint": "eslint src tests server",
    "lint:fix": "npm run lint -- --fix",
    "start": "better-npm-run start",
    "dev": "better-npm-run dev",
    "dev:no-debug": "npm run dev -- --no_debug",
    "test": "better-npm-run test",
    "test:dev": "npm run test -- --watch",
    "deploy": "better-npm-run deploy",
    "deploy:dev": "better-npm-run deploy:dev",
    "deploy:prod": "better-npm-run deploy:prod",
    "codecov": "cat coverage/*/lcov.info | codecov"
  },
```

As you can find there that after npm test you it runs the following command:
```
    "test": {
      "command": "babel-node ./node_modules/karma/bin/karma start build/karma.conf",
      "env": {
        "NODE_ENV": "test",
        "DEBUG": "app:*"
      }
    }
```

From there you can find the configuration file of karma, that is located at ***build/karma.conf*** so the link for that file:
```
https://github.com/davezuko/react-redux-starter-kit/blob/master/build/karma.conf.js
```





PLAN:
- reference for example karma setup with XYZ (check starter)
- code code snippets
- some output examples







