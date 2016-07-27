http://www.valvesoftware.com/company/Valve_Handbook_LowRes.pdf

#### ReactConvention - handbook for React Developers

**** 
"So many books, so little time." ― Frank Zappa
"So many projects, so little time." - Kamil Przeorski
**** 


## Preface

In 2013 React was almost "nothing", today it's "something". We developers, have so little time and so much work to do. The main problem with anyone who wants to learn how to make single-page-apps with React is that there are no really conventions that one can follow. We are running a React Webshop from mid 2014 and we faced so many frustrations. Mostly when a client who had already an MVP wanted us to expand based on his codebase (each codebase was different in terms of structure and almost each one had it's weak points). Another source of annoyance is also when you need to introduce a new developer to your "well known to you" codebase and you want to make sure that he doesn't make any "newbie" mistakes. In context of this preface a "newbie" means a someone who isn't familiarized to the project's structure. Because he is not familizarize with the project's configuration, then he is not really productive in his first month of work. You need to learn him about your configuration so it takes decent amount time to pass all your knowledge to your new teammate in the project. The React Convention handbook helps you to save time on transfering knowledge about your project's structure to any new member. 

The main ReactC's goal is to familiarize your new teammate to your React's project sturcture without investing time into that process. You will save 90% of your time on explaining why, how and what has been done with the project's codebase. 

The handbook is also a good for people who want to start a new project from scratch.



## How to use this handbook

The only requirement to get all that benefits mentioned in the preface is that you need to start your project with that react-redux-starter-kit:
```
https://github.com/davezuko/react-redux-starter-kit
```

We have found this starter, best (we know what we are talking about because we made over 15+ different React projects so far). Even Dan Abramov has noticed that this starter kit is really awesome one:

![Dan Abramov](http://test.przeorski.pl/book/901_dan_abramov.png)

After you are using this starter kit, then the handbook will provide you the value which will save your team a plenty of time at work.



------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
Welcome to React Convention was of doing apps
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------
------- SEPARATE PAGE WITH AN IMAGE -------



## Your First Step

In a default starter kit from the @davezuko, you can find a home page and a counter component which looks as following:

![starter counter](http://test.przeorski.pl/book/902_starter_counter2.png)

This is a simple application with a counter, and throught this handbook you will implement other views and components which will help you understand whole codebase.

To explain the whole code structure, we will start with developing a new route called Dashboard with some basic features. When you will be done with it, then you will implement a registration and login which will make you sure that you know how to do it 100% just on your own.


First step is to clone the starter kit and start working on this commit (the handbook was written on that commit, so for better experience you shall work on the same one):
```
3fabc5f49272aa93960461e2d1abd6800e02e341
```

... so you you will be truly working on that starting codebase:
```
https://github.com/davezuko/react-redux-starter-kit/tree/3fabc5f49272aa93960461e2d1abd6800e02e341
```
















